# cognicity-reports-twitter-lambda
This module deploys serverless lambda that sends a confirmation message and report link to the user on Twitter.

Currently deployed for PetaBencana.id in Indonesia.

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

* `AWS_REGION`: AWS region to deploy Lambda to
* `AWS_STAGE`: AWS stage to deploy Lambda to
* `TWITTER_CONSUMER_KEY`: From twitter application
* `TWITTER_CONSUMER_SECRET`: From twitter application
* `TWITTER_ACCESS_TOKEN_KEY`: From twitter application
* `TWITTER_ACCESS_TOKEN_SECRET`: From twitter application credentials
* `DEFAULT_LANG`: Default language to contact user
* `FRONT_END_CARD_PATH`: Location of card content
* `FRONT_END_MAP_PATH`: Location of map
* `SERVER_PATH`: Location of data server
* `SERVER_PORT`: Data server port
* `AREA=`: Area tag (metadata for processes)

#### Misc Notes
- AWS credentials are stored in bash_profile
- Errors are logged to console, but not returned to user currently
- If you want to test with your local Cognicity server instance, set up secure tunnels to localhost using ngrok and use that URL in the .env file. Install 'npm install -g ngrok'. After initializing the server, run 'ngrok http <PORT_NUMBER'. Use the https URL generated and set it in the 'SERVER' section of the env file. This allows the Lambda to interact with the server to fetch card OTL.
