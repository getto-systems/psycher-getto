exports.init = () => init();

const init = () => {
  return {
    gitlab: {
      success: {
        word: "success",
        reaction: "ok",
      },
      failure: {
        word: "failure",
        reaction: "ng",
      },
    },
  };
};
