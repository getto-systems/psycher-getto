const handler = require("../../lib/handler");

const notification_factory = require("../../lib/notification");

const stream_factory = require("../../lib/notification/message/stream");

const secret_store_factory = require("../infra/secret_store");
const message_store_factory = require("../infra/message_store");

const i18n_factory = require("../i18n");

test("success", async () => {
  const {notification, i18n, message_store} = init_notification({
    result: "success",
  });

  await handler.perform(handler.detect_actions({
    type: "deploy",
    i18n,
    notification,
  }));

  expect(message_store.data).toEqual({
    post: [],
    add: [
      {
        token: "GETTO-MESSAGE-TOKEN",
        reply_to: {
          as: "getto",
          channel: "CHANNEL",
          timestamp: "TIMESTAMP",
        },
        name: "ok",
      },
    ],
  });
});

test("failure", async () => {
  const {notification, i18n, message_store} = init_notification({
    result: "failure",
  });

  await handler.perform(handler.detect_actions({
    type: "deploy",
    i18n,
    notification,
  }));

  expect(message_store.data).toEqual({
    post: [],
    add: [
      {
        token: "GETTO-MESSAGE-TOKEN",
        reply_to: {
          as: "getto",
          channel: "CHANNEL",
          timestamp: "TIMESTAMP",
        },
        name: "ng",
      },
    ],
  });
});

const init_notification = ({result}) => {
  const {repository, message_store} = init_repository();

  const notification = notification_factory.init({
    event_info: {
      reply_to: {
        as: "getto",
        channel: "CHANNEL",
        timestamp: "TIMESTAMP",
      },
      info: {},
      result,
    },
    repository,
  });

  const i18n = i18n_factory.init();

  return {
    notification,
    i18n,
    message_store,
  };
};

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
