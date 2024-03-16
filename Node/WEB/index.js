const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const keyVaultUrl = process.env.['https://assignment-4.vault.azure.net/']; // The URL of your Key Vault
const credential = new DefaultAzureCredential();
const client = new SecretClient(keyVaultUrl, credential);

app.use('/', express.static('frontend/build'));

app.get('/api', async (req, res) => {
  try {
    const secretName = process.env.myAppSettings; // Name of the secret from configuration
    const secret = await client.getSecret(secretName);
    res.json({ message: 'Hello, world!', secretValue: secret.value });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving secret from Key Vault');
  }
});

app.listen(port, () => {
  console.log('Server listening on port '+ port);
});
