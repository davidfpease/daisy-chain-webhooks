const wait = async (req, res) => {


  console.log("Wait step started.")
  await waitTime(4000);
  console.log("Wait step ended.")


  res.json({
    "sendMessages": [],
    "setContactAttributes": {},
    "setConversationTags": []
  })
}

module.exports = {
  wait
}



const waitTime = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}