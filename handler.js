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
  chn: 'chennai',
  jbd: 'jakarta',
  sby: 'surabaya',
  bdg: 'bandung'
};

// Confirmation message to user
const confirmations = {
  'en': "Hi! Thanks for your report. I've put it on the map.",
  'id': 'Hi! Terima kasih atas laporan Anda. Aku sudah menaruhnya di peta.'
};

/*
 * Makes POST call to post a Twitter status update @ the user's handle
 */
function sendTweet(messageText, userName) {
  var message = '@' + userName + ' ' + messageText;
  twitterClient.post('statuses/update', {status: message})
    .then(function (tweet) {
      console.log('Tweet sent: ' + tweet + 'to the user: ' + userName);
    })
    .catch(function (error) {
      console.error('Sending report link tweet failed', error);
    });
}

module.exports.reply = (event, context, callback) => {
  //This module listens in to SNS Twitter topic and reads the message published
  var message = JSON.parse(event.Records[0].Sns.Message);
  console.log('Message received from SNS topic: ' + message);

  //Construct the confirmation message to be sent to the user
  var messageText = confirmations[message.language];
  messageText += '\n' + process.env.MAPSERVER + instance_regions[message.implementation_area] + '/' + message.report_id;

  sendTweet(messageText, message.username);
};
