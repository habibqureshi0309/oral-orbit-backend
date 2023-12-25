const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://health.usnews.com/doctors/internists/california';
async function scrapeDoctorsNames(url, maxRetries = 100) {

  let retries = 0;
  while (retries < maxRetries) {
  try {
    // Fetch HTML content of the website
    const response = await axios.get(url, { timeout: 5000 });
    
    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Select the elements containing doctor names (modify this selector based on the website structure)
    const doctorNameElements = $('.doctor-name');

    // Extract and print the names
    const doctorNames = doctorNameElements.map((index, element) => $(element).text().trim()).get();
    
    return doctorNames;
  } catch (error) {
    console.error('Error making HTTP request:', error.message);
      retries++;
      // Add a delay before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
console.error('Max retries reached. Unable to fetch data.');
  return null;
}

// Replace the URL with the actual URL you want to scrape

// Call the function and log the results
scrapeDoctorsNames(url).then(doctorNames => {
  console.log('Doctor Names:', doctorNames);
});
