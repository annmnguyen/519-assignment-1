const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const { AzureKeyCredential } = require('@azure/identity');
const { createClient } = require('@azure-rest/ai-computer-vision');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Multer setup for file uploads
const storage = multer.memoryStorage(); // This will hold files in memory
const upload = multer({ storage: storage });

const endpoint = process.env['VISION_ENDPOINT'];
const key = process.env['VISION_KEY'];
const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

app.post('/analyze', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const features = [
    'Caption', 'DenseCaptions', 'Objects', 'People', 'Read', 'SmartCrops', 'Tags'
  ];

  const result = await client.path('/imageanalysis:analyze').post({
    body: req.file.buffer, // Here we use the buffer from multer
    queryParameters: {
      features: features,
      'language': 'en',
      'gender-neutral-captions': 'true',
      'smartCrops-aspect-ratios': [0.9, 1.33]
    },
    headers: {
      'Content-Type': 'application/octet-stream' // Important for direct binary uploads
    }
  });

  const iaResult = result.body;

  res.json({
    message: 'Analysis complete',
    data: iaResult
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
