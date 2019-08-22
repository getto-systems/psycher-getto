const getto_bot_event = require("../../lib/ui/getto_bot_event");

test("init event_info", async () => {
  const event_info = getto_bot_event.parse({
    type: "gitlab",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
    result: "success",
  });

  expect(event_info).toEqual({
    type: "gitlab",
    detail: {
      channel: "CHANNEL",
      timestamp: "TIMESTAMP",
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

test("gitlab : empty channel", async () => {
  const event_info = getto_bot_event.parse({
    type: "gitlab",
    timestamp: "TIMESTAMP",
    result: "success",
  });

  expect(event_info).toBe(null);
});

test("gitlab : empty timestamp", async () => {
  const event_info = getto_bot_event.parse({
    type: "gitlab",
    channel: "CHANNEL",
    result: "success",
  });

  expect(event_info).toBe(null);
});

test("gitlab : empty result", async () => {
  const event_info = getto_bot_event.parse({
    type: "gitlab",
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
  });

  expect(event_info).toBe(null);
});
