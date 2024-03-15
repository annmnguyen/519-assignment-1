const express = require('express');
const app = express();
const port = process.env.PORT || 3000

app.use('/', express.static('frontend/build'));

app.get('/api', (req, res) => {
  const secretValue = process.env.CocoSecret;  
  res.json({ message: 'Hello, world!', secret: secretValue || 'No secret found' });
});

app.listen(port, () => {
  console.log('Server listening on port '+ port);
});
