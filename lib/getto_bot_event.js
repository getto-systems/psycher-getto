exports.init = (struct) => init(struct);

/**
 * struct : {
 *   source: getto event source
 *   result: getto event result
 *   channel: slack channel
 *   timestamp: slack event timestamp
 * }
 */
const init = (struct) => {
  const source = struct.source;
  const result = struct.result;
  const channel = struct.channel;
  const timestamp = struct.timestamp;

  const is_gitlab = (source === "gitlab");

  const is_gitlab_result = (word) => {
    return is_gitlab && result.includes(word);
  };

  return {
    channel: channel,
    timestamp: timestamp,
    is_gitlab_result: is_gitlab_result,
  };
};
