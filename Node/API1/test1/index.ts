import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
    const keyvaultname = 'assignment-4'
    const credential = new ManagedIdentityCredential();
    const secretname = 'secret2'
    const secretclient = new secretclient(keyvaultname, credential)
    const secret = await secretClient.getSecret(secretname)
    const vault = 'https://assignment-4.vault.azure.net/'
        if (secret) {
            context.log(`Retrieved secret value: ${secret.value}`);
        } else {
            context.log(`Unable to retrieve secret.`);
        }
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;
