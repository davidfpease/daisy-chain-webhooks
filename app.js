require('dotenv').config()
const express = require('express')
const app = express()
const { initialWebhook } = require('./services/initialWebhook')
const { getResponse } = require('./services/getResponse')
const { wait } = require('./services/wait')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/initial_webhook', initialWebhook)
app.post('/get_response', getResponse)
app.post('/wait', wait)

if (!process.env.LAMBDA_TASK_ROOT) {
  app.listen(3000, () => console.log(`App initialized on port: 3000`));
}

// Export your express server so you can import it in the lambda function.
module.exports = app