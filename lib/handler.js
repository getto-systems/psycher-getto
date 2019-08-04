const actions = {
  notify_gitlab_success: require("./actions/notify_gitlab_success"),
  notify_gitlab_failure: require("./actions/notify_gitlab_failure"),
};

exports.init = (struct) => init(struct);

/**
 * struct : {
 *   bot_event : getto_bot_event
 *   messenger : {
 *     slack: prepared outgoing_messengers/slack
 *   }
 * }
 */
const init = ({bot_event, messenger}) => {
  const handle_event = () => {
    if (bot_event.is_gitlab_success()) {
      return notify_gitlab_success();
    }
    if (bot_event.is_gitlab_failure()) {
      return notify_gitlab_failure();
    }

    return null;
  };

  const notify_gitlab_success = () => {
    return actions.notify_gitlab_success.perform(slack_messenger());
  };
  const notify_gitlab_failure = () => {
    return actions.notify_gitlab_failure.perform(slack_messenger());
  };


  const slack_messenger = () => {
    return messenger.slack.init(bot_event.slack_secret());
  };


  return {
    handle_event,
  };
};
