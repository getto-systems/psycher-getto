exports.init = (struct) => init(struct);

/**
 * struct : {
 *   secret_store : infra/secret_store
 *   message_store : infra/message_store
 * }
 *
 * returns {
 *   post: async ({reply_to, text}) => post message
 *   add: async ({reply_to, name}) => add reaction
 * }
 */
const init = ({secret_store, message_store}) => {
  /**
   * struct : {
   *   reply_to: notification.reply_to()
   *   text: message text
   * }
   */
  const post = async ({user, reply_to, text}) => {
    const token = await find_message_token(user);

    return message_store.post({
      token,
      reply_to,
      text,
    });
  };

  /**
   * struct : {
   *   reply_to: notification.reply_to()
   *   name: reaction name
   * }
   */
  const add = async ({user, reply_to, name}) => {
    const token = await find_message_token(user);

    return message_store.add({
      token,
      reply_to,
      name,
    });
  };


  const find_message_token = async (user) => {
    const tokens = await secret_store.message_tokens();
    if (tokens && tokens[user]) {
      return tokens[user];
    }

    throw "no message token: " + user;
  };

  return {
    post,
    add,
  };
};
