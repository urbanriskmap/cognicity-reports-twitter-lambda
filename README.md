# cognicity-reports-twitter-lambda
This module deploys serverless lambda that sends a confirmation message and report link to the user on Twitter

### Install
`npm install`

### Getting started
* Create Twitter app as described [here] (http://docs.inboundnow.com/guide/create-twitter-application/) and collect the keys & secret tokens.
* Set up the config files as explained in the Configuration section.
* Read Misc Notes section to assist in configuration

### Run
`serverless deploy`

### Configuration
Save a copy of sample.env as .env in local directory with appropriate credentials

* `VALIDATIONTOKEN`: Give the same token on Facebook dev portal to validate webhooks
* `APPSECRET`: AppSecret key got on creating facebook app
* `PAGEACCESSTOKEN`: Access token for the page to which the app has subscribed
* `DEFAULT_LANG`: Current default language is English. You can add more languages here and parameterize replies for each language.
* `CARD_PATH`: Front end's cards URL
* `MAPSERVER`: Front end's map URL
* `X_API_KEY`: API Key needed to make calls to the deployed server (Set it to "" during local testing)
* `PG_CON`: Connection string for the Postgres database
* `SERVER`: Cognicity server URL to fetch unique cardIds
* `BOTNAME`: Bot/Platform name to be sent in the Greeting text.

#### Misc Notes
- AWS credentials are stored in bash_profile
- Grasp "username" is userID/senderID from source networks to allow replies in conversation
- Errors are logged to console, but not returned to user currently
- If you want to test with your local Cognicity server instance, set up secure tunnels to localhost using ngrok and use that URL in the .env file. Install 'npm install -g ngrok'. After initializing the server, run 'ngrok http <PORT_NUMBER'. Use the https URL generated and set it in the 'SERVER' section of the env file. This allows the Lambda to interact with the server to fetch card OTL.
