const slack = require("./outgoing_messengers/slack");

exports.init = (bot_event, secret) => init(bot_event, secret);

/**
 * bot_event : getto_bot_event
 * secret : psycher_secret
 */
const init = (bot_event, secret) => {
  return {
    slack: slack.init(bot_event, secret),
  };
};
