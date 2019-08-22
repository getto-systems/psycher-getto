const getto_bot_event = require("../../lib/ui/getto_bot_event");

test("init deploy event_info", async () => {
  const event_info = getto_bot_event.parse({
    type: "deploy",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
    result: "success",
  });

  expect(event_info).toEqual({
    type: "deploy",
    detail: {
      reply_to: {
        channel: "CHANNEL",
        timestamp: "TIMESTAMP",
      },
      info: {},
      result: "success",
    },
  });
});

test("init push_latest event_info", async () => {
  const event_info = getto_bot_event.parse({
    type: "push_latest",
    channel: "CHANNEL",
    image: "IMAGE",
    result: "success",
  });

  expect(event_info).toEqual({
    type: "push_latest",
    detail: {
      reply_to: {
        channel: "CHANNEL",
      },
      info: {
        image: "IMAGE",
      },
      result: "success",
    },
  });
});

test("empty body", async () => {
  const event_info = getto_bot_event.parse(null);

  expect(event_info).toBe(null);
});

test("empty type", async () => {
  const event_info = getto_bot_event.parse({
  });

  expect(event_info).toBe(null);
});

test("unknown type", async () => {
  const event_info = getto_bot_event.parse({
    type: "unknown",
  });

  expect(event_info).toBe(null);
});
