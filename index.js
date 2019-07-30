const getto_bot_event = require("./lib/getto_bot_event");
const psycher_secret = require("./lib/psycher_secret");
const outgoing_messenger = require("./lib/outgoing_messenger");
const handler = require("./lib/handler");

const aws_secret_provider = require("./lib/providers/aws_secret");

exports.handler = async (aws_lambda_event) => {
  // logging event object for debug real-world event
  console.log(aws_lambda_event);

  const q = aws_lambda_event.queryStringParameters;
  if (q) {
    // handle get request
    const aws_secret = await aws_secret_provider.get({
      region: process.env.REGION,
      secret_id: process.env.SECRET_ID,
    });
    await init_handler(q, aws_secret).handle_event();
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "OK",
    }),
  };
};

const init_handler = (q, aws_secret) => {
  const bot_event = getto_bot_event.init({
    source: q.source,
    result: q.result,
    channel: q.channel,
    timestamp: q.timestamp,
  });

  const secret = psycher_secret.init({
    slack: {
      bot_token: aws_secret["slack-bot-token"],
    },
  });

  const messenger = outgoing_messenger.init(bot_event, secret);

  return handler.init(bot_event, messenger);
};
