exports.init = () => init();

const init = () => {
  const data = {
    slack: {
      reaction: [],
    },
  };

  const slack_add_reaction = async (info, emoji) => {
    data.slack.reaction.push(info);
  };

  return {
    slack: {
      add_reaction: slack_add_reaction,
    },

    data: data,
  };
};
