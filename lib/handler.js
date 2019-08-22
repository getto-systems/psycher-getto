const action_map = {
  "gitlab": "gitlab",
};

exports.handler_names = () => handler_names();

exports.detect_actions = (struct) => detect_actions(struct);
exports.perform = (actions) => perform(actions);

const handler_names = () => Object.values(action_map);

/**
 * struct : {
 *   type : event type
 *   i18n
 *   notification
 * }
 *
 * returns actions
 */
const detect_actions = ({type, i18n, notification}) => {
  const name = action_map[type];
  if (!name) {
    throw "unknown event type: " + type;
  }

  return require("./actions/" + name).init({
    i18n: i18n[name],
    notification,
  });
};

/**
 * actions
 */
const perform = async (actions) => {
  for(let i in actions) {
    const action = actions[i];
    if (await action.condition.matches()) {
      return action.perform();
    }
  }

  return null;
};
