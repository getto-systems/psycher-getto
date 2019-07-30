exports.handle_event = (bot_event, messenger) => handle_event(bot_event, messenger);

/**
 * bot_event : getto_bot_event
 * messenger : outgoing_messenger
 */
const handle_event = (bot_event, messenger) => {
  if (bot_event.is_gitlab_success()) {
    return messenger.slack.add_reaction("white_check_mark");
  }
  if (bot_event.is_gitlab_failure()) {
    return messenger.slack.add_reaction("x");
  }
};
