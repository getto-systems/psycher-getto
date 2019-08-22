exports.init = () => init();

const init = () => {
  return {
    gitlab: {
      success: {
        word: "success",
        reaction: "thumbsup",
      },
      failure: {
        word: "failure",
        reaction: "x",
      },
    },
  };
};
