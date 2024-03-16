const express = require('express');
const app = express();
const port = process.env.PORT || 3000

app.use('/', express.static('frontend/build'));

app.get('/api', (req, res) => {
  const secretValue = process.env.myAppSetting;  
  res.json({ message: 'Hello, world! This is ', secret: secretValue || 'No secret found' });
});

app.listen(port, () => {
  console.log('Server listening on port '+ port);
});
