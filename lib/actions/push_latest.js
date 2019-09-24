exports.init = (struct) => init(struct);

/**
 * struct : {
 *   i18n
 *   notification
 * }
 */
const init = ({i18n, notification}) => {
  const user = "dockerhub";
  const condition = notification.condition;

  const success = {
    condition: condition.result_matches(i18n.success.word),
    perform: () => {
      return notification.reply({ messages: (info) => i18n.success.messages(info.image), user });
    },
  };

  return [
    success,
  ];
};
