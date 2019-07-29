exports.init = (struct) => init(struct);

/**
 * struct : {
 *   slack: {
 *     bot_token: slack bot token
 *   },
 * }
 */
const init = (struct) => {
  return {
    slack: {
      bot_token: struct.slack.bot_token,
    },
  };
};
