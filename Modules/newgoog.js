// Import the Google Cloud Translation library
const { TranslationServiceClient } = require('@google-cloud/translate');
const cache = require('./cache');

// Instantiate a client
const client = new TranslationServiceClient();

function translateText(req, res, next) {
  // Define the text and target language

  const tranquery =  req.query.tranquery;
  const key = `Tqueries ${tranquery}`;
  const targetLanguage = 'zh-CN'; // Mandarin Chinese

  // Define the project ID and location
  const projectId = process.env.GOOGLE_PROJECT_ID;  // Replace with your Google Cloud project ID
  const location = 'global';  // Global location

  // Define the request
  const request = {
    parent: client.locationPath(projectId, location),
    contents: [tranquery],
    mimeType: 'text/plain',  // Mime types: 'text/plain', 'text/html'
    sourceLanguageCode: 'en',  // Source language code
    targetLanguageCode: targetLanguage,  // Target language code
  };
  if (cache[key] && (Date.now() - cache[key].timestamp < 604800000)){
    console.log('Cache hit - pulling in cache data');
    res.status(200).send(cache[key].data);
  }
  else {
    console.log('Cache miss - submitting new request');
    // Perform the translation request
    const [response] = client.translateText(request
    )
    .then(response => response.data.data.translations.map(tdquery => new Chquery(tdquery)))
    .then(formattedData => {
    cache[key] = {};
    cache[key].data = formattedData;
    cache[key].timestamp = Date.now();
    res.status(200).send(formattedData);
    })
    .catch(err => next(err));
  }
}

class Chquery{
  constructor(translation){
    // //REMOVE - beginning
    // this.query = translation;
    // //REMOVE - end
    this.query = translation.translatedText;
  }
}

module.exports = translateText;
