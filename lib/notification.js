const condition_factory = require("./notification/condition");
const replyer_factory = require("./notification/replyer");

exports.init = (struct) => init(struct);

/**
 * struct : {
 *   event_info: {
 *     channel : slack channel
 *     timestamp : event timestamp
 *     result : pipeline result status
 *   }
 *   repository: {
 *     stream
 *   }
 * }
 *
 * returns {
 *   condition : check notification condition
 *   reaction : (name) => add reaction
 * }
 */
const init = ({event_info: {channel, timestamp, result}, repository}) => {
  const reply_to = {
    channel,
    timestamp,
  };

  const result_matches = (word) => result === word;

  const replyer = replyer_factory.init({
    reply_to,
    repository,
  });

  const reaction = (name) => replyer.reaction(name);

  const condition = condition_factory.init({
    result_matches,
  });

  return {
    condition,
    reaction,
  };
};
