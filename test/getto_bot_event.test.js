const getto_bot_event = require("../lib/getto_bot_event");

test("gitlab success", () => {
  const bot_event = getto_bot_event.init({
    source: "gitlab",
    result: "success",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
  });

  expect(bot_event.channel).toBe("CHANNEL");
  expect(bot_event.timestamp).toBe("TIMESTAMP");
  expect(bot_event.is_gitlab_success()).toBe(true);
});

test("gitlab failure", () => {
  const bot_event = getto_bot_event.init({
    source: "gitlab",
    result: "failure",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
  });

  expect(bot_event.is_gitlab_failure()).toBe(true);
});
