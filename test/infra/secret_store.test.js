const secret_store = require("../../lib/infra/secret_store");

test("message_tokens", async () => {
  const {store, aws_secrets} = init_secret_store({
    "slack-bot-tokens": JSON.stringify({"getto": "SLACK_BOT_TOKEN"}),
  });

  const tokens = await store.message_tokens();

  expect(tokens).toEqual({"getto": "SLACK_BOT_TOKEN"});
});

const init_secret_store = (struct) => {
  const aws_secrets = init_aws_secrets(struct);

  const store = secret_store.init({
    aws_secrets,
  });

  return {
    store,
    aws_secrets,
  };
};

const init_aws_secrets = (struct) => {
  const getJSON = async () => {
    return struct;
  };

  return {
    getJSON,
  };
};
