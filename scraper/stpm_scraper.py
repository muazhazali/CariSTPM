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
    select = soup.find('select', {'name': select_id})
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
        "Submit": "CARI"
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
    table = soup.find('table', {'width': '856', 'border': '1'})
    if not table:
        print("No table found!")
        return []
    
    data = []
    
    # Find all rows except the header
    rows = table.find_all('tr')[1:]  # Skip header row
    print(f"Found {len(rows)} rows in table")
    
    for row_idx, row in enumerate(rows):
        cols = row.find_all('td')
        if len(cols) < 3:  # Skip rows without enough columns
            continue
        
        # Get semester and bidang
        semester = cols[0].text.strip()
        bidang = cols[1].text.strip()
        
        # Get subjects starting from column 3 (index 2)
        # We know the first two columns are always semester and bidang
        subjects = []
        
        # Process each subject column
        for col in cols[2:]:
            subject = col.text.strip()
            # Only add non-empty subjects and stop at the first empty cell
            if subject and subject != '&nbsp;' and subject != '':
                # Check if this is a new semester marker (indicating we've gone too far)
                if 'SEMESTER' in subject:
                    break
                subjects.append(subject)
            else:
                # Stop at first empty cell since subjects are contiguous
                break
        
        # Only add rows that have semester, bidang and at least 4 subjects
        if semester and bidang and len(subjects) >= 4:
            print(f"Row {row_idx + 1}: Semester={semester}, Bidang={bidang}, Subjects={subjects}")
            data.append((semester, bidang, subjects))
    
    print(f"Total valid rows found: {len(data)}")
    return data

def test_single_combination():
    """Test function to scrape just one combination."""
    print("Testing scraper with a single combination...")
    
    try:
        # Get initial page
        response = requests.get(BASE_URL, headers=HEADERS, verify=False)
        response.raise_for_status()
        html = response.text
        print("Successfully fetched initial page")
        
        # Test with specific values for Johor - Batu Pahat - SMK Dato Bentara Luar
        test_negeri = ("01", "JOHOR")  # Johor
        test_ppd = ("J010", "BATU PAHAT")  # Batu Pahat
        test_pusat = ("JEA0010", "SMK DATO BENTARA LUAR")  # SMK Dato Bentara Luar
        
        print(f"Testing with: {test_negeri[1]} - {test_ppd[1]} - {test_pusat[1]}")
        
        # Get the subject data
        response_html = submit_form(test_negeri[0], test_ppd[0], test_pusat[0])
        if response_html:
            # Save the HTML response for debugging
            with open('debug_response.html', 'w', encoding='utf-8') as f:
                f.write(response_html)
            print("Saved response HTML to debug_response.html")
            
            print("Successfully got response HTML")
            table_data = parse_table(response_html)
            
            if not table_data:
                print("No data was parsed from the table!")
                return False
            
            # Write to test CSV file
            with open('test_subjects.csv', 'w', newline='', encoding='utf-8') as csvfile:
                writer = csv.writer(csvfile)
                # Write header
                writer.writerow(["NEGERI", "PPD", "PUSAT", "SEMESTER", "BIDANG", "PAKEJ MATA PELAJARAN"])
                
                # Write data
                for semester, bidang, subjects in table_data:
                    writer.writerow([
                        test_negeri[1],
                        test_ppd[1],
                        test_pusat[1],
                        semester,
                        bidang,
                        ", ".join(subjects)
                    ])
            
            print("Test completed. Data saved to test_subjects.csv")
            return True
            
    except Exception as e:
        print(f"Error during test: {e}")
        return False

def scrape_and_save():
    """Main function to scrape and save data."""
    try:
        # Get initial page
        print("Fetching initial page...")
        response = requests.get(BASE_URL, headers=HEADERS, verify=False)
        response.raise_for_status()
        html = response.text
        print("Successfully fetched initial page")
    except requests.RequestException as e:
        print(f"Error fetching initial page: {e}")
        return

    # Extract options for Negeri
    negeri_options = extract_options(html, 'negeri')
    total_negeri = len(negeri_options)
    print(f"Found {total_negeri} negeri options")
    
    # Open a CSV file for writing
    with open('stpm_subjects.csv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["NEGERI", "PPD", "PUSAT", "SEMESTER", "BIDANG", "PAKEJ MATA PELAJARAN"])

        # Iterate through each negeri
        for negeri_idx, (negeri_code, negeri_name) in enumerate(negeri_options.items(), 1):
            print(f"\nProcessing Negeri {negeri_idx}/{total_negeri}: {negeri_name}")
            
            try:
                # Get PPD options for this negeri
                response_html = submit_form(negeri_code, "", "")
                if not response_html:
                    print(f"Failed to get PPD options for {negeri_name}")
                    continue
                
                ppd_options = extract_options(response_html, 'PPD')
                total_ppd = len(ppd_options)
                print(f"Found {total_ppd} PPD options for {negeri_name}")
                
                # Iterate through each PPD
                for ppd_idx, (ppd_code, ppd_name) in enumerate(ppd_options.items(), 1):
                    print(f"Processing PPD {ppd_idx}/{total_ppd}: {ppd_name}")
                    
                    try:
                        # Get Pusat options for this PPD
                        response_html = submit_form(negeri_code, ppd_code, "")
                        if not response_html:
                            print(f"Failed to get Pusat options for {ppd_name}")
                            continue
                        
                        pusat_options = extract_options(response_html, 'pusat')
                        total_pusat = len(pusat_options)
                        print(f"Found {total_pusat} Pusat options for {ppd_name}")
                        
                        # Iterate through each Pusat
                        for pusat_idx, (pusat_code, pusat_name) in enumerate(pusat_options.items(), 1):
                            print(f"Processing {pusat_idx}/{total_pusat}: {pusat_name}")
                            
                            try:
                                # Get the subject data
                                response_html = submit_form(negeri_code, ppd_code, pusat_code)
                                if not response_html:
                                    print(f"Failed to get subject data for {pusat_name}")
                                    continue
                                
                                table_data = parse_table(response_html)
                                
                                # Write the data to the CSV file
                                for semester, bidang, subjects in table_data:
                                    writer.writerow([
                                        negeri_name,
                                        ppd_name,
                                        pusat_name,
                                        semester,
                                        bidang,
                                        ", ".join(subjects)
                                    ])
                                
                                # Add a small delay to avoid overwhelming the server
                                time.sleep(0.5)
                                
                            except Exception as e:
                                print(f"Error processing pusat {pusat_name}: {e}")
                                continue
                            
                    except Exception as e:
                        print(f"Error processing PPD {ppd_name}: {e}")
                        continue
                    
            except Exception as e:
                print(f"Error processing negeri {negeri_name}: {e}")
                continue

    print("\nScraping completed. Data saved to stpm_subjects.csv")

if __name__ == "__main__":
    print("Starting STPM subject package scraper...")
    
    # Comment out the test function
    # test_single_combination()
    
    # Run the full scraper
    scrape_and_save()
    
    print("Scraping completed.") 