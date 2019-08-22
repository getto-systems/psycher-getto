const message_store = require("../../lib/infra/message_store");

test("add", async () => {
  const {store, slack_api} = init_message_store();

  await store.add({
    token: "TOKEN",
    reply_to: {
      channel: "CHANNEL",
      timestamp: "TIMESTAMP",
    },
    name: "NAME",
  });

  expect(slack_api.data).toEqual({
    reactions: {
      add: [
        {
          token: "TOKEN",
          channel: "CHANNEL",
          timestamp: "TIMESTAMP",
          name: "NAME",
        },
      ],
    },
  });
});

const init_message_store = () => {
  const slack_api = init_slack_api();

  const store = message_store.init({
    slack_api,
  });

  return {
    store,
    slack_api,
  };
};

const init_slack_api = () => {
  let data = {
    reactions: {
      add: [],
    },
  };

  const reactions = {
    add: async (struct) => {
      data.reactions.add.push(struct);
      return {
        status: 200,
      };
    },
  };

  return {
    reactions,
    data,
  };
};
