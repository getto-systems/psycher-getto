const specification = require("getto-specification");

exports.init = (struct) => init(struct);

/**
 * struct : {
 *   result_matches : (word) => check notification result mathces word
 * }
 */
const init = (notification) => {
  const spec = specification.init();

  const result_matches = (word) => {
    return spec.init(() => {
      return notification.result_matches(word);
    });
  };

  return {
    result_matches,
  };
};
