exports.init = (data) => init(data);

/**
 * data : {
 *   message_tokens: message tokens
 * }
 *
 * returns infra/secret_store
 */
const init = ({message_tokens}) => {
  return {
    message_tokens: async () => message_tokens,
  };
};
