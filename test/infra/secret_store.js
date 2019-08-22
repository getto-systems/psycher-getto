exports.init = (data) => init(data);

/**
 * data : {
 *   message_token: message token
 * }
 *
 * returns infra/secret_store
 */
const init = ({message_token}) => {
  return {
    message_token: async () => message_token,
  };
};
