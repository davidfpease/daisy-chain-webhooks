const initialWebhook = async (req, res) => {
  res.json({
    "sendMessages": [],
    "setContactAttributes": {
      "response": "null"      //this first webhook does nothing except 'reset' the contact attribute
    },                        //this step is necessary to allow the process to loop indefinitely
    "setConversationTags": []
  })
 console.log("Initial webhook response sent.")
}

module.exports = {
  initialWebhook
}