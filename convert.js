const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
require("dotenv").config();

//Importing the speechToTextV1 and IamAuthenticator from Watson SDK
const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({ apikey: process.env.IBM_API }),
  serviceUrl: "https://api.us-south.speech-to-text.watson.cloud.ibm.com",
});

//function for tranlating text with IBM API
function getText(audio) {
  const params = {
    audio: audio,
    contentType: "audio/ogg",
  };

  return new Promise((resolve, reject) => {
    speechToText
      .recognize(params)
      .then((response) => {
        const message = response.result.results;
        if (message.length === 0) {
          {
            resolve("Please speak louder, unable to translate");
          }
          resolve(message[0].alternatives[0].transcript);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = getText;
