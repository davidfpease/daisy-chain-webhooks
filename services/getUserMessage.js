const axios = require('axios');
const baseUrl = 'https://driftapi.com/contacts/'
const auth_token = process.env.DRIFT_AUTH_TOKEN;


const getUserMessage = async (contactId) => {
  
  console.log("Retreiving user message.");
  
  const config = {
    method: 'get',
    url: baseUrl + contactId,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    }
  };
  
  return axios(config)
  .then((response) => {
    console.log("Search Term: ", response.data.data.attributes.search_phrase)
      return response.data.data.attributes.search_phrase;
  }).catch(err => {
      console.log(err);
    })
    
  
  
}

module.exports = {
  getUserMessage
}

