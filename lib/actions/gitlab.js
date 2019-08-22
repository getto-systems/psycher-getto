exports.init = (struct) => init(struct);

/**
 * struct : {
 *   i18n
 *   notification
 * }
 */
const init = ({i18n, notification}) => {
  const condition = notification.condition;

  const success = {
    condition: condition.result_matches(i18n.success.word),
    perform: () => {
      return notification.reaction(i18n.success.reaction);
    },
  };

  const failure = {
    condition: condition.result_matches(i18n.failure.word),
    perform: () => {
      return notification.reaction(i18n.failure.reaction);
    },
  };

  return [
    success,
    failure,
  ];
};
