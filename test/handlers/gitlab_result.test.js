const outgoing_messenger = require("../outgoing_messenger");

const getto_bot_event = require("../../lib/getto_bot_event");
const gitlab_result = require("../../lib/handlers/gitlab_result");

test("gitlab succeed", async () => {
  const messenger = outgoing_messenger.init();
  const bot_event = getto_bot_event.init({
    source: "gitlab",
    result: "succeed",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
  });

  const promise = gitlab_result.handle_event(bot_event, messenger);
  await promise;

  expect(messenger.data.slack).toBe(1);
  expect(!!promise).toBe(true);
});

test("gitlab failure", async () => {
  const messenger = outgoing_messenger.init();
  const bot_event = getto_bot_event.init({
    source: "gitlab",
    result: "failure",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
  });

  const promise = gitlab_result.handle_event(bot_event, messenger);
  await promise;

  expect(messenger.data.slack).toBe(1);
  expect(!!promise).toBe(true);
});

test("other succeed", async () => {
  const messenger = outgoing_messenger.init();
  const bot_event = getto_bot_event.init({
    source: "unknown",
    result: "succeed",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
  });

  const promise = gitlab_result.handle_event(bot_event, messenger);
  await promise;

  expect(messenger.data.slack).toBe(0);
  expect(!!promise).toBe(false);
});
