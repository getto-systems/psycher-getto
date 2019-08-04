const handler = require("./lib/handler");
const getto_bot_event = require("./lib/getto_bot_event");

const slack_secret = require("./lib/secrets/slack");
const slack_messenger = require("./lib/outgoing_messengers/slack");
const slack_request = require("./lib/outgoing_messengers/requests/slack");

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
  const event_info = init_event_info(q);
  const secret = init_secret(aws_secret);

  const bot_event = getto_bot_event.init({
    event_info,
    secret,
  });

  const messenger = init_messenger();

  return handler.init({
    bot_event,
    messenger,
  });
};

const init_event_info = (q) => {
  return {
    source: q.source,
    result: q.result,
    channel: q.channel,
    timestamp: q.timestamp,
  };
};

const init_secret = (aws_secret) => {
  const slack = slack_secret.prepare({
    bot_token: aws_secret["slack-bot-token"],
  });

  return {
    slack,
  };
};

const init_messenger = () => {
  const slack = slack_messenger.prepare(slack_request);

  return {
    slack,
  };
};
