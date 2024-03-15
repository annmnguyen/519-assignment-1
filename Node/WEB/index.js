const express = require('express');
const app = express();
const port = process.env.PORT || 3000

app.use('/', express.static('frontend/build'));

app.get('/api', (req, res) => {
  const secretname = process.env.secret3;  
  res.json({ message: 'Hello, world! This is secret ', secret: secretname || 'No secret found' });
});

app.listen(port, () => {
  console.log('Server listening on port '+ port);
});
