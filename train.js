var Slack = require('slack-client');
var fs = require('fs');
var lame = require('lame');
var config = require('./config/config.js');
var Speaker = require('speaker');

var slack = new Slack(config.token, true, true);
console.log('Slack train starts to listen.');

slack.on('message', function(message) {

    if(message.type === 'message') {
        //get message text
        var messageText = message.text;
        
        if(messageText) {
            
            var hasTrigger = message.text.indexOf("train"); //search for play trigger
            if(hasTrigger > -1) {
                fs.createReadStream('train.mp3') .pipe(new lame.Decoder()) .on('format', function (format) {
                        this.pipe(new Speaker(format));
                    });
                }
        }

    }
});

slack.login();