const notification_factory = require("../lib/notification");

const stream_factory = require("../lib/notification/message/stream");

const secret_store_factory = require("./infra/secret_store");
const message_store_factory = require("./infra/message_store");

test("post message", async () => {
  const {repository, message_store} = init_repository();

  const notification = notification_factory.init({
    event_info: {
      type: "deploy",
      reply_to: {
        channel: "CHANNEL",
        timestamp: "TIMESTAMP",
      },
      info: {},
      result: "success",
    },
    repository,
  });

  await notification.reply({ messages: () => ["message"], user: "getto" });

  expect(message_store.data).toEqual({
    post: [
      {
        token: "GETTO-MESSAGE-TOKEN",
        reply_to: {
          channel: "CHANNEL",
          timestamp: "TIMESTAMP",
        },
        text: "message",
      },
    ],
    add: [],
  });
});

test("add reaction", async () => {
  const {repository, message_store} = init_repository();

  const notification = notification_factory.init({
    event_info: {
      type: "deploy",
      reply_to: {
        channel: "CHANNEL",
        timestamp: "TIMESTAMP",
      },
      result: "success",
    },
    repository,
  });

  await notification.reaction({ name: "success", user: "getto" });

  expect(message_store.data).toEqual({
    post: [],
    add: [
      {
        token: "GETTO-MESSAGE-TOKEN",
        reply_to: {
          channel: "CHANNEL",
          timestamp: "TIMESTAMP",
        },
        name: "success",
      },
    ],
  });
});

const init_repository = () => {
  const secret_store = secret_store_factory.init({
    message_tokens: {
      "getto": "GETTO-MESSAGE-TOKEN",
    },
  });
  const message_store = message_store_factory.init();

  const stream = stream_factory.init({
    secret_store,
    message_store,
  });

  const repository = {
    stream,
  };

  return {
    repository,
    message_store,
  };
};
