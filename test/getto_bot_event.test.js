const getto_bot_event = require("../lib/getto_bot_event");

test("gitlab succeed", () => {
  const bot_event = getto_bot_event.init({
    source: "gitlab",
    result: "succeed",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
  });

  expect(bot_event.channel).toBe("CHANNEL");
  expect(bot_event.timestamp).toBe("TIMESTAMP");
  expect(bot_event.is_gitlab_result("succeed")).toBe(true);
});

test("gitlab failure", () => {
  const bot_event = getto_bot_event.init({
    source: "gitlab",
    result: "failure",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
  });

  expect(bot_event.is_gitlab_result("failure")).toBe(true);
});
