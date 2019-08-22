exports.init = () => init();

const init = () => {
  return {
    gitlab: {
      success: {
        word: "success",
        reaction: "white_check_mark",
      },
      failure: {
        word: "failure",
        reaction: "x",
      },
    },
  };
};
