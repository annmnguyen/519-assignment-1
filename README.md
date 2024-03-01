[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13626964&assignment_repo_type=AssignmentRepo)

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

