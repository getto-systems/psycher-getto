const outgoing_messenger = require("./outgoing_messenger");

const getto_bot_event = require("../lib/getto_bot_event");
const handler = require("../lib/handler");

test("handle gitlab result", async () => {
  const messenger = outgoing_messenger.init();
  const bot_event = getto_bot_event.init({
    source: "gitlab",
    result: "success",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
  });

  await handler.init(bot_event, messenger).handle_event();

  expect(messenger.data.slack.message.length).toBe(0);
  expect(messenger.data.slack.reaction[0]).toBe("gitlab-success");
});
