const getto_bot_event = require("../lib/getto_bot_event");
const psycher_secret = require("../lib/psycher_secret");

test("properties", () => {
  const secret = psycher_secret.init({
    slack: {
      bot_token: "SLACK_BOT_TOKEN",
    },
  });

  expect(secret.slack.bot_token).toBe("SLACK_BOT_TOKEN");
});
