exports.perform = (slack) => perform(slack);

/**
 * slack : outgoing_messengers/slack
 */
const perform = (slack) => {
  return slack.reaction("gitlab-failure", "x");
};
