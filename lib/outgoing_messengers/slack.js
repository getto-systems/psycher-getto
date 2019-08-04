exports.prepare = (request) => prepare(request);

/**
 * request : outgoing_messengers/requests/slack
 * secret : secrets/slack
 *
 * returns {
 *   reaction: (info, emoji) => add reaction
 * }
 */
const prepare = (request) => {
  const init = (secret) => {
    /**
     * info : request type (string)
     * emoji : reaction name
     */
    const reaction = (info, emoji) => {
      return request.reaction(info, secret, emoji);
    };

    return {
      reaction,
    };
  }

  return {
    init,
  };
};
