exports.init = (struct) => init(struct);

/**
 * struct : {
 *   reply_to : notification.reply_to
 *   repository: {
 *     stream
 *   }
 * }
 *
 * returns {
 *   message : (messages) => post message
 *   reaction : (name) => add reaction
 * }
 */
const init = ({reply_to, repository: {stream}}) => {
  /**
   * name : reaction name
   */
  const reaction = (name) => {
    return stream.add({
      reply_to,
      name,
    });
  };

  return {
    reaction,
  };
};
