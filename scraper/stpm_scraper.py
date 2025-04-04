import requests
from bs4 import BeautifulSoup
import csv
import time
import urllib3

# Disable SSL verification warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Define the base URL and headers
BASE_URL = "https://sst6.moe.gov.my/form6/pakejt6.cfm"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded"
}

def extract_options(html, select_id):
    """Extract options from a select dropdown."""
    soup = BeautifulSoup(html, 'html.parser')
    select = soup.find('select', {'name': select_id})  # Changed from 'id' to 'name'
    if not select:
        print(f"Warning: Could not find select element with name '{select_id}'")
        return {}
    options = {opt['value']: opt.text.strip() for opt in select.find_all('option') if opt.get('value') and opt['value'] != ''}
    return options

def submit_form(negeri, ppd, pusat):
    """Submit the form with given parameters."""
    payload = {
        "negeri": negeri,
        "PPD": ppd,
        "pusat": pusat,
        "Submit": "CARI"  # Added submit button value
    }
    try:
        response = requests.post(BASE_URL, headers=HEADERS, data=payload, verify=False)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"Error submitting form: {e}")
        return None

def parse_table(html):
    """Parse the table data from the response."""
    soup = BeautifulSoup(html, 'html.parser')
    # Find the table with width 856 and border 1 (the subject table)
    table = soup.find('table', {'width': '856', 'border': '1'})
    if not table:
        return []
    
    rows = table.find_all('tr')[1:]  # Skip header row
    data = []
    
    for row in rows:
        cols = row.find_all('td')
        if len(cols) >= 3:  # Make sure we have at least semester, bidang, and one subject
            semester = cols[0].text.strip()
            bidang = cols[1].text.strip()
            
            # Get all subjects (excluding empty cells)
            subjects = []
            for col in cols[2:]:
                subject = col.text.strip()
                if subject and subject != '&nbsp;':
                    subjects.append(subject)
            
            # Only add rows that have actual subjects
            if subjects:
                subjects_str = ", ".join(subjects)
                data.append((semester, bidang, subjects_str))
    
    return data

def scrape_and_save():
    """Main function to scrape and save data."""
    # Fetch the initial page to extract dropdown options
    try:
        response = requests.get(BASE_URL, headers=HEADERS, verify=False)
        response.raise_for_status()
        html = response.text
        print("Successfully fetched initial page")
    except requests.RequestException as e:
        print(f"Error fetching initial page: {e}")
        return

    # Extract options for Negeri, PPD, and Pusat
    negeri_options = extract_options(html, 'negeri')
    print(f"Found {len(negeri_options)} negeri options")
    
    # Open a CSV file for writing
    with open('stpm_subjects.csv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["NEGERI", "PPD", "PUSAT", "SEMESTER", "BIDANG", "PAKEJ MATA PELAJARAN"])

        # Iterate through each negeri
        for negeri_code, negeri_name in negeri_options.items():
            print(f"\nProcessing Negeri: {negeri_name}")
            
            # Get PPD options for this negeri
            response_html = submit_form(negeri_code, "", "")
            if response_html:
                ppd_options = extract_options(response_html, 'PPD')
                print(f"Found {len(ppd_options)} PPD options for {negeri_name}")
                
                # Iterate through each PPD
                for ppd_code, ppd_name in ppd_options.items():
                    print(f"Processing PPD: {ppd_name}")
                    
                    # Get Pusat options for this PPD
                    response_html = submit_form(negeri_code, ppd_code, "")
                    if response_html:
                        pusat_options = extract_options(response_html, 'pusat')
                        print(f"Found {len(pusat_options)} Pusat options for {ppd_name}")
                        
                        # Iterate through each Pusat
                        for pusat_code, pusat_name in pusat_options.items():
                            print(f"Processing: {negeri_name} - {ppd_name} - {pusat_name}")
                            
                            # Get the subject data
                            response_html = submit_form(negeri_code, ppd_code, pusat_code)
                            if response_html:
                                table_data = parse_table(response_html)
                                
                                # Write the data to the CSV file
                                for semester, bidang, pakej in table_data:
                                    writer.writerow([negeri_name, ppd_name, pusat_name, semester, bidang, pakej])
                                
                                # Add a small delay to avoid overwhelming the server
                                time.sleep(0.5)

if __name__ == "__main__":
    print("Starting STPM subject package scraper...")
    scrape_and_save()
    print("Scraping completed. Data saved to stpm_subjects.csv") 