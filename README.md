# Using GitHub Actions for deploying to Azure Platform #

The repositatory contains GitHub Action workflows to deploy Azure Web App, Azure Functions App, and Azure Container App. 

## Azure Credientials ##

Authenticate using Azure credientials through Publish Profile and Azure Service Principals using Azure CLI commands. This allows the workflow to have access to the Azure Subscriptions and directories required. 

## Workflows ##

There are three workflows for each Azure App. This is where Azure credientals and environment variables are needed, and checking out Git repo, setting up and installing dependencies, and building and deploying into Azure. 

## Creating Azure apps ##

Azure Apps are created in the Azure Portal which are needed for the GitHub Action deployment process.

## Solutions Diagram ##

![image](https://github.com/annmnguyen/519-assignment-1/assets/101607810/b8bf04f5-b5ad-4d03-becc-2c08b61b5e95)
