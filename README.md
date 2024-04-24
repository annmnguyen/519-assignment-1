# Using GitHub Actions for deploying to Azure Platform #

The repositatory contains GitHub Action workflows to deploy Azure Web App, Azure Functions App, and Azure Container App. 

## Azure Credientials ##

Authenticate using Azure credientials through Publish Profile and Azure Service Principals using Azure CLI commands. This allows the workflow to have access to the Azure Subscriptions and directories required. 

## Workflows ##

There are three workflows for each Azure App. This is where Azure credientals and environment variables are needed, and checking out Git repo, setting up and installing dependencies, and building and deploying into Azure. 

## Creating Azure apps ##

Azure Apps are created in the Azure Portal which are needed for the GitHub Action deployment process. The web app and functions app can be deployed through the github actions. 

# Container Deployment #

Container instance can be deployed to Axure Functions app using GitHub actions. You can use Logs and Console under Monitoring in the Functions App to validate the deployment. 

# Key Vault References # 

When running workflows, the function trigger will result in printing out the secrets referenced from the key vault in the web app, functions app log, and in the container apps log.

# Deploying Photo App #


## Solutions Diagram ##

The updated solutions diagram is in the draaw.io file.

![image](https://github.com/annmnguyen/519-assignment-1/assets/101607810/b8bf04f5-b5ad-4d03-becc-2c08b61b5e95)
