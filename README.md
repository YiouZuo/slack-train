# slack-train
Message "train" in Slack channel and triggers Raspberry Pi to ring a train horn. It is written with Node.js.

## Background
We have a nice kitchen at work and people try to eat lunch together to bond. The idea is to message a Slack channel with a key word `train`, for example `@here, lunch train`, and it triggers our Raspberry Pi to ring a train horn -- we also set up a giphy app so within the Slack channel, a train giphy pops up in response.

## How To
1. Clone the repo to your Raspberry Pi and run npm install. This will install all of the dependencies slack-train requires.
2. Add a bot integration in Slack [here](https://slack.com/signin?redir=%2Fservices%2Fnew%2Fbot).
3. Add your bot's API key to config.js.
4. Run node train.js from the command line.
5. Invite your new bot into the lunch channel.

## Caveat
You'll need the script to be running for it to actively listen to the Slack channel. There are a few of ways to do it depending on how much availability you desire.
1. create a screen session 

   This is by no means optimal for us, but if you'd like to have a short time span for Slack-RaspberryPi sound notification, it's quite and easy.

2. cron job with timeout

   This is the current option I chose to use. Since we need a lunch time train horn, I set up a cronjob to run train.js from 11 to 12:30.
   ```
   0 11 * * * /usr/bin/timeout -s 2 5400 /usr/local/bin/node /home/pi/slack-audiobot/train.js > /dev/null 2>&1
   ```
 
3.  Set up with [Heroku](https://dashboard.heroku.com/)

   This allows your script to run all the time on a Heroku server and actively listening all the time.
