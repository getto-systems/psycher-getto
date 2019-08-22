const notification_factory = require("../lib/notification");

const stream_factory = require("../lib/stream");

const secret_store_factory = require("./infra/secret_store");
const message_store_factory = require("./infra/message_store");

test("add reaction", async () => {
  const {repository, message_store} = init_repository();

  const notification = notification_factory.init({
    event_info: {
      type: "gitlab",
      channel: "CHANNEL",
      timestamp: "TIMESTAMP",
      result: "success",
    },
    repository,
  });

  await notification.reaction("success");

  expect(message_store.data).toEqual({
    add: [
      {
        token: "MESSAGE-TOKEN",
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
    message_token: "MESSAGE-TOKEN",
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
