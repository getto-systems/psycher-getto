const memoize = require("getto-memoize");

exports.init = (struct) => init(struct);

/**
 * struct : {
 *   aws_secrets: vendor/aws_secrets
 * }
 *
 * returns {
 *   message_tokens : async () => message_store token
 * }
 */
const init = ({aws_secrets}) => {
  const secret = init_secret(aws_secrets);

  const message_tokens = () => secret.json("slack-bot-tokens");

  return {
    message_tokens,
  };
};

/**
 * returns {
 *   string : async (key) => get secret string value
 *   json : async (key) => get secret json value
 * }
 */
const init_secret = (aws_secrets) => {
  const memo = memoize.init({
    load: () => aws_secrets.getJSON(),
  });

  const json = (key) => memo.get(key, (data) => JSON.parse(data[key]));

  return {
    json,
  };
};
