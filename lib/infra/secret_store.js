const memoize = require("getto-memoize");

exports.init = (struct) => init(struct);

/**
 * struct : {
 *   aws_secrets: vendor/aws_secrets
 * }
 *
 * returns {
 *   message_token : async () => message_store token
 * }
 */
const init = ({aws_secrets}) => {
  const secret = init_secret(aws_secrets);

  const message_token = () => secret.string("slack-bot-token");

  return {
    message_token,
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

  const string = (key) => memo.get(key, (data) => data[key]);

  return {
    string,
  };
};
