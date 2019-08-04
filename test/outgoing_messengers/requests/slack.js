exports.init = () => init();

const init = () => {
  let data = {
    reaction: [],
  };

  const reaction = async (info, secret, name) => {
    data.reaction.push(info);
    return null;
  };

  return {
    reaction,
    data,
  };
};
