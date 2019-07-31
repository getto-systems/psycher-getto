exports.init = () => init();

const init = () => {
  const data = {
    slack: {
      message: [],
      reaction: [],
    },
  };

  const slack_reply = async (info, message) => {
    data.slack.message.push(info);
  };
  const slack_reply_random = async (info, messages) => {
    data.slack.message.push(info);
  };
  const slack_add_reaction = async (info, emoji) => {
    data.slack.reaction.push(info);
  };

  return {
    slack: {
      reply: slack_reply,
      reply_random: slack_reply_random,
      add_reaction: slack_add_reaction,
    },

    data: data,
  };
};
