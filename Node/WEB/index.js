const express = require('express');
const app = express();
const port = process.env.PORT || 3001

app.use(express.json());

app.use('/', express.static('frontend/build'));

const fs = require('fs');
const { ImageAnalysisClient } = require('@azure-rest/ai-vision-image-analysis');
const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');

app.get('/api', (req, res) => {
  const secretValue = process.env.myAppSetting;  
  const responseText = `Hello, world! ${secretValue || 'No secret found'}`;
  res.send(responseText);
});

app.listen(port, () => {
  console.log('Server listening on port '+ port);
});




const endpoint = 'https://519-web.cognitiveservices.azure.com/'
const key = '6f5eff14860c4d96b270295eb020094b'

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const features = [
  'Caption',
  'DenseCaptions',
  'Objects',
  'People',
  'Read',
  'SmartCrops',
  'Tags'
];
const imageUrl = 'https://aka.ms/azsdk/image-analysis/sample.jpg';

async function analyzeImageFromUrl(imageUrl) {

  const result = await client.path('/imageanalysis:analyze').post({
    body: {
        url: imageUrl
    },
    queryParameters: {
        features: features,
        'smartCrops-aspect-ratios': [0.9, 1.33]
    },
    'Content-Type': 'application/json'
    //contentType: 'application/json'
  });
  app.post('/api/analyze', async (req, res) => {
    const imageUrl = req.body.imageUrl;
    // Your existing logic to call Azure API
    try {
      const result = await analyzeImageFromUrl(imageUrl);
      console.log(result); // Ensure this is what you expect
      res.json(result);
    } catch (error) {
      console.error('Failed to process image:', error);
      res.status(500).send('Error processing image');
    }
  });
  
  const iaResult = result.body;

  console.log(`Model Version: ${iaResult.modelVersion}`);
  console.log(`Image Metadata: ${JSON.stringify(iaResult.metadata)}`);
  if (iaResult.captionResult) {
    console.log(`Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`);
  }
  if (iaResult.denseCaptionsResult) {
    iaResult.denseCaptionsResult.values.forEach(denseCaption => console.log(`Dense Caption: ${JSON.stringify(denseCaption)}`));
  }
  if (iaResult.objectsResult) {
    iaResult.objectsResult.values.forEach(object => console.log(`Object: ${JSON.stringify(object)}`));
  }
  if (iaResult.peopleResult) {
    iaResult.peopleResult.values.forEach(person => console.log(`Person: ${JSON.stringify(person)}`));
  }
  if (iaResult.readResult) {
    iaResult.readResult.blocks.forEach(block => console.log(`Text Block: ${JSON.stringify(block)}`));
  }
  if (iaResult.smartCropsResult) {
    iaResult.smartCropsResult.values.forEach(smartCrop => console.log(`Smart Crop: ${JSON.stringify(smartCrop)}`));
  }
  if (iaResult.tagsResult) {
    iaResult.tagsResult.values.forEach(tag => console.log(`Tag: ${JSON.stringify(tag)}`));
  }
}

export default analyzeImageFromUrl();