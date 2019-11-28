exports.init = (struct) => init(struct);

/**
 * struct : {
 *   i18n
 *   notification
 * }
 */
const init = ({i18n, notification}) => {
  const user = "getto";
  const condition = notification.condition;

  const success = {
    condition: condition.result_matches(i18n.success.word),
    perform: () => {
      return notification.reply({ messages: (info) => i18n.success.messages(info.version), user });
    },
  };

  const failure = {
    condition: condition.result_matches(i18n.failure.word),
    perform: () => {
      return notification.reply({ messages: (info) => i18n.failure.messages(info.version), user });
    },
  };

  return [
    success,
    failure,
  ];
};
