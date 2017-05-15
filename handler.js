'use strict';

require('dotenv').config({silent:true});

var Twitter = require('twitter');
var twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// GRASP operating regions
const instance_regions = {
  chn: 'chennai'
}

// Confirmation message to user
const confirmations = {
  'en': 'Hi! Thanks for your report. I\'ve put it on the map.'
}

module.exports.reply = (event, context, callback) => {
  //This module listens in to SNS Twitter topic and reads the message published
  var message = JSON.parse(event.Records[0].Sns.Message);
  console.log('Message received from SNS topic: ' + message);

  //Construct the confirmation message to be sent to the user
  var messageText = '@' + message.username + ' ' + confirmations[message.language];
  messageText += '\n' + process.env.MAPSERVER + instance_regions[message.implementation_area] + '/' + message.report_id;

  //Make a POST call to send a tweet to the user
  twitterClient.post('statuses/update', {status: messageText})
    .then(function (tweet) {
      console.log('Tweet sent: ' + tweet + 'to the user: ' + message.username);
    })
    .catch(function (error) {
      console.error('Sending report link tweet failed', error);
    })
};
