exports.init = (struct) => init(struct);

/**
 * struct : {
 *   slack_api: vendor/slack_api
 * }
 *
 * returns {
 *   add : async (struct) => add reaction
 * }
 */
const init = ({slack_api}) => {
  /**
   * struct : {
   *   token: slack bot token
   *   reply_to: notification.reply_to()
   *   name : reaction name
   * }
   */
  const add = async ({token, reply_to: {channel, timestamp}, name}) => {
    const response = await slack_api.reactions.add({
      token,
      channel,
      timestamp,
      name,
    });
    console.log(response.status);
  };

  return {
    add,
  };
};
