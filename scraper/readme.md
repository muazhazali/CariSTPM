1. Understand the Structure of the HTML
The page contains:

Dropdown menus for Negeri , PPD , and Pusat .
A table displaying SEMESTER , BIDANG , and PAKEJ MATA PELAJARAN .
Each combination of Negeri , PPD , and Pusat will generate a unique set of rows in the table. Therefore, you need to:

Iterate through all possible combinations of Negeri , PPD , and Pusat .
For each combination, extract the table data and save it to a CSV file.
2. Tools Required
You can use Python with libraries like BeautifulSoup (for parsing HTML) and requests (for making HTTP requests). Additionally, use csv to write the output to a CSV file.

3. Steps to Scrape the Data
Step 1: Extract Dropdown Options
Parse the HTML to extract all options for Negeri , PPD , and Pusat .
Store these options in lists for iteration.
Step 2: Simulate Form Submission
Use the requests library to simulate form submissions for each combination of Negeri , PPD , and Pusat .
The form submission URL is pakejt6.cfm, and the method is POST.
Step 3: Parse the Response
After submitting the form, parse the response HTML to extract the table data for SEMESTER , BIDANG , and PAKEJ MATA PELAJARAN .
Step 4: Save to CSV
Write the extracted data to a CSV file with columns: NEGERI , PPD , PUSAT , SEMESTER , BIDANG , PAKEJ MATA PELAJARAN .