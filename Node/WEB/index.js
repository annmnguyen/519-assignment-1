const express = require('express');
const app = express();
const axios = require('axios');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const port = process.env.PORT || 3000

app.use('/', express.static('frontend/build'));

app.get('/api', (req, res) => {
  const secretValue = process.env.myAppSetting;  
  const responseText = `Hello, world! ${secretValue || 'No secret found'}`;
  res.send(responseText);
});

app.listen(port, () => {
  console.log('Server listening on port '+ port);
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Process file here
  res.json({ message: 'File uploaded successfully', url: `/${req.file.path}` });
});