exports.init = (struct) => init(struct);

/**
 * struct : {
 *   event_info: {
 *     source: getto event source
 *     result: getto event result
 *     channel: slack channel
 *     timestamp: slack event timestamp
 *   },
 *   secret : {
 *     slack: secrets/slack
 *   },
 * }
 *
 * returns {
 *   is_gitlab_success() => check gitlab success
 *   is_gitlab_failure() => check gitlab failure
 *
 *   slack_secret() => init slack secret
 * }
 */
const init = ({event_info, secret}) => {
  const source = event_info.source;
  const result = event_info.result;
  const channel = event_info.channel;
  const timestamp = event_info.timestamp;

  const is_gitlab = (source === "gitlab");

  const is_gitlab_result = (word) => {
    return is_gitlab && result.includes(word);
  };

  const is_gitlab_success = () => is_gitlab_result("success");
  const is_gitlab_failure = () => is_gitlab_result("failure");

  const slack_secret = () => {
    return secret.slack.init({
      channel,
      timestamp,
    });
  };

  return {
    is_gitlab_success,
    is_gitlab_failure,

    slack_secret,
  };
};
