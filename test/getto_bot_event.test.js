const getto_bot_event = require("../lib/getto_bot_event");

const slack_secret = require("../lib/secrets/slack");

test("is_gitlab_success", () => {
  const raw_slack_secret = {
    bot_token: "SLACK_BOT_TOKEN",
  };
  const event_info = {
    source: "gitlab",
    result: "success",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
  };
  const secret = {
    slack: slack_secret.prepare(raw_slack_secret),
  };

  const bot_event = getto_bot_event.init({
    event_info,
    secret,
  });

  expect(bot_event.is_gitlab_success()).toBe(true);
});

test("is_gitlab_failure", () => {
  const raw_slack_secret = {
    bot_token: "SLACK_BOT_TOKEN",
  };
  const event_info = {
    source: "gitlab",
    result: "failure",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
  };
  const secret = {
    slack: slack_secret.prepare(raw_slack_secret),
  };

  const bot_event = getto_bot_event.init({
    event_info,
    secret,
  });

  expect(bot_event.is_gitlab_failure()).toBe(true);
});

test("secrets", () => {
  const raw_slack_secret = {
    bot_token: "SLACK_BOT_TOKEN",
  };
  const event_info = {
    source: "gitlab",
    result: "failure",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
  };
  const secret = {
    slack: slack_secret.prepare(raw_slack_secret),
  };

  const bot_event = getto_bot_event.init({
    event_info,
    secret,
  });

  const slack_secret_value = bot_event.slack_secret();

  expect(slack_secret_value.channel).toBe("CHANNEL");
  expect(slack_secret_value.timestamp).toBe("TIMESTAMP");
  expect(slack_secret_value.bot_token).toBe("SLACK_BOT_TOKEN");
});
