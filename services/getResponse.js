const axios = require('axios');
const baseUrl = 'https://driftapi.com/contacts/'
const auth_token = process.env.DRIFT_AUTH_TOKEN;
const { getUserMessage } = require('./getUserMessage')


const getResponse = async (req, res) => {
  const { contactId } = req.body;
  //retrieve the last message sent by the site visitor
  let userMessage = await getUserMessage(contactId);
  console.log("User message was: ", userMessage);

  const minTime = 9000; // 9 seconds in milliseconds
  const maxTime = 30000; // 30 seconds in milliseconds

  const randomTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  console.log("Random process time is: ", randomTime)
  
  res.json({
    "sendMessages": [{
      "type": "CHAT",
      "body": `Simulated external process will take ${randomTime/1000} seconds.`
    }],
    "setContactAttributes": {},
    "setConversationTags": []
  });

  
  console.log("GetResponse triggered, beginning wait for contact update.");
  
  //simulate a long running server request/response
  await waitRandomTime(randomTime);
  
  let answer = new Date() + " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  
  
  //set a contact attribute with the response value, once returned from other server request
  const body = JSON.stringify({"attributes": {"response": answer}})
  
  const config = {
    method: 'patch',
    url: baseUrl + contactId,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    },
    data: body
  };
  
  axios(config)
  .then((response) => {
      console.log("GetResponse updated the contact attribute.");
  }).catch(err => {
      console.log(err);
    })
    
  
  
}

module.exports = {
  getResponse
}


const waitRandomTime = (randomTime) => {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, randomTime);
  });
}