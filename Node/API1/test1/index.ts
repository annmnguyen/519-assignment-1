import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { DefaultAzureCredential, ManagedIdentityCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    // Get the name from query parameters or request body
    const name = (req.query.name || (req.body && req.body.name));

    try {
        // Initialize the SecretClient using Managed Identity
        const keyVaultName = "assignment-4";
        const vaultUri = `https://${'assignment-4'}.vault.azure.net`;
        const credential = new ManagedIdentityCredential();

        // Access your secret from Key Vault
        const secretName = "secret2";
        const secretClient = new SecretClient(vaultUri, credential);

        // Retrieve the secret value
        const secret = await secretClient.getSecret(secretName);

        // Log the secret value
        if (secret) {
            context.log(`Retrieved secret value: ${secret.value}`);
        } else {
            context.log(`Unable to retrieve secret.`);
        }

        // Prepare the response message
        const responseMessage = name
            ? `Hello, ${name}. This HTTP triggered function executed successfully.`
            : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

        // Set the response
        context.res = {
            body: responseMessage
        };
    } catch (error) {
        context.log.error("Error accessing secret from Key Vault:", error);
        context.res = {
            status: 500,
            body: "Internal Server Error"
        };
    }
};

export default httpTrigger;
