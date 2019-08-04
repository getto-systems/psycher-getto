const slack_messenger = require("../lib/outgoing_messengers/slack");
const slack_request = require("./outgoing_messengers/requests/slack");
const slack_secret = require("../lib/secrets/slack");

const getto_bot_event = require("../lib/getto_bot_event");
const handler = require("../lib/handler");

test("handle gitlab success", async () => {
  const mock = init_mock();

  await init_handler(mock, {
    source: "gitlab",
    result: "success",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
  }).handle_event();

  expect(mock.slack.data.reaction.length).toBe(1);
  expect(mock.slack.data.reaction[0]).toBe("gitlab-success");
});

test("handle gitlab failure", async () => {
  const mock = init_mock();

  await init_handler(mock, {
    source: "gitlab",
    result: "failure",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
  }).handle_event();

  expect(mock.slack.data.reaction.length).toBe(1);
  expect(mock.slack.data.reaction[0]).toBe("gitlab-failure");
});

test("unknown source", async () => {
  const mock = init_mock();

  await init_handler(mock, {
    source: "unknown",
    result: "failure",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
  }).handle_event();

  expect(mock.slack.data.reaction.length).toBe(0);
});

const init_handler = (mock, event_info) => {
  const raw_slack_secret = {
    bot_token: "SLACK_BOT_TOKEN",
  };
  const secret = {
    slack: slack_secret.prepare(raw_slack_secret),
  };

  const bot_event = getto_bot_event.init({
    event_info,
    secret,
  });

  const messenger = {
    slack: slack_messenger.prepare(mock.slack),
  };

  return handler.init({bot_event, messenger});
};

const init_mock = () => {
  const slack = slack_request.init();

  return {
    slack,
  };
};
