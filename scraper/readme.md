# STPM Subject Package Scraper

A Python-based web scraper to extract STPM (Sijil Tinggi Persekolahan Malaysia) subject package information from the MOE Form 6 website.

## Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/muazhazali/CariSTPM.git
   ```

2. Navigate to the scraper directory:
   ```bash
   cd CariSTPM/scraper
   ```
   ⚠️ Important: All following commands must be run from the `scraper` directory

3. Create a virtual environment (recommended):
   ```bash
   # Create virtual environment
   python -m venv venv
   
   # On Windows
   .\venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

4. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

Ensure you're in the scraper directory and your virtual environment is activated before running the scraper:

```bash
# If you're not already in the scraper directory
cd path/to/CariSTPM/scraper

# Activate virtual environment if not already activated
# On Windows
.\venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

# Run the scraper
python stpm_scraper.py
```

The scraper will:
1. Fetch data from all states (Negeri)
2. Process each district (PPD)
3. Extract information from each center (Pusat)
4. Save the results in `stpm_subjects.csv`

## Output Format

The scraper generates a CSV file (`stpm_subjects.csv`) with the following columns:
- NEGERI (State)
- PPD (District)
- PUSAT (Center)
- SEMESTER
- BIDANG (Field)
- PAKEJ MATA PELAJARAN (Subject Package)

## Technical Details

The scraper works by:
1. Accessing the MOE Form 6 website
2. Iterating through all combinations of states, districts, and centers
3. Extracting subject package information from the resulting tables
4. Saving the structured data to a CSV file

## Troubleshooting

If you encounter SSL verification errors, the script automatically handles them by disabling SSL verification warnings.

## Notes

- The scraper includes built-in delays to avoid overwhelming the server
- Progress information is displayed in the console during execution
- A test function is available (commented out by default) for testing single combinations

## Contributing

Feel free to open issues or submit pull requests for any improvements.

## License

[Add your license information here]