"use strict";

const getto_bot_event = require("./lib/ui/getto_bot_event");
const notification_factory = require("./lib/notification");
const handler = require("./lib/handler");

const repository = {
  stream: require("./lib/stream"),
};

const infra = {
  secret_store: require("./lib/infra/secret_store"),
  message_store: require("./lib/infra/message_store"),
};

const vendor = {
  aws_secrets: require("getto-aws_secrets"),
  slack_api: require("getto-slack_api"),
};

const i18n_factory = require("./lib/i18n");

exports.handler = async (aws_lambda_event) => {
  // logging event object for debug real-world event
  console.log(aws_lambda_event);

  const body = parse_json(aws_lambda_event.body);
  const event_info = getto_bot_event.parse(body);
  if (event_info) {
    // handle event only when event_info detected
    await handle(event_info);
  };

  // always response { message: "OK" } : HTTP 200
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "OK",
    }),
  };
};

const handle = (event_info) => {
  const repository = init_repository();
  const notification = notification_factory.init({
    event_info.detail,
    repository,
  });
  const i18n = i18n_factory.init("ja");

  const actions = handler.detect_actions({
    type: event_info.type,
    i18n,
    notification,
  });

  return handler.perform(actions);
};

const init_repository = () => {
  const secret_store = infra.secret_store.init({
    aws_secrets: vendor.aws_secrets.init({
      region: process.env.REGION,
      secret_id: process.env.SECRET_ID,
    }),
  });

  const message_store = infra.message_store.init({
    slack_api: vendor.slack_api.init(),
  });

  const stream = repository.stream.init({
    secret_store,
    message_store,
  });

  return {
    stream,
  };
};

const parse_json = (raw) => {
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      // ignore parse error
    }
  }
  return null;
};
