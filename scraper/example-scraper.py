import requests
from bs4 import BeautifulSoup
import csv

# Define the base URL and headers
BASE_URL = "http://example.com/pakejt6.cfm"  # Replace with the actual URL
HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Content-Type": "application/x-www-form-urlencoded"
}

# Function to extract dropdown options
def extract_options(html, select_id):
    soup = BeautifulSoup(html, 'html.parser')
    select = soup.find('select', {'id': select_id})
    options = {opt['value']: opt.text.strip() for opt in select.find_all('option') if opt['value']}
    return options

# Function to submit the form and parse the table
def submit_form(negeri, ppd, pusat):
    payload = {
        "negeri": negeri,
        "PPD": ppd,
        "pusat": pusat
    }
    response = requests.post(BASE_URL, headers=HEADERS, data=payload)
    return response.text

# Function to parse the table data
def parse_table(html):
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find('table')
    rows = table.find_all('tr')[1:]  # Skip header row
    data = []
    for row in rows:
        cols = row.find_all('td')
        semester = cols[0].text.strip()
        bidang = cols[1].text.strip()
        pakej_mata_pelajaran = [col.text.strip() for col in cols[2:] if col.text.strip()]
        data.append((semester, bidang, ", ".join(pakej_mata_pelajaran)))
    return data

# Main function to scrape and save data
def scrape_and_save():
    # Fetch the initial page to extract dropdown options
    response = requests.get(BASE_URL)
    html = response.text

    # Extract options for Negeri, PPD, and Pusat
    negeri_options = extract_options(html, 'negeri')
    ppd_options = extract_options(html, 'ppd')
    pusat_options = extract_options(html, 'pusat')

    # Open a CSV file for writing
    with open('output.csv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["NEGERI", "PPD", "PUSAT", "SEMESTER", "BIDANG", "PAKEJ MATA PELAJARAN"])

        # Iterate through all combinations of Negeri, PPD, and Pusat
        for negeri_code, negeri_name in negeri_options.items():
            for ppd_code, ppd_name in ppd_options.items():
                for pusat_code, pusat_name in pusat_options.items():
                    print(f"Processing: {negeri_name} - {ppd_name} - {pusat_name}")
                    # Submit the form and get the response
                    response_html = submit_form(negeri_code, ppd_code, pusat_code)
                    # Parse the table data
                    table_data = parse_table(response_html)
                    # Write the data to the CSV file
                    for semester, bidang, pakej in table_data:
                        writer.writerow([negeri_name, ppd_name, pusat_name, semester, bidang, pakej])

# Run the scraper
scrape_and_save()