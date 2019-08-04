exports.perform = (slack) => perform(slack);

/**
 * slack : outgoing_messengers/slack
 */
const perform = (slack) => {
  return slack.reaction("gitlab-success", "white_check_mark");
};
