exports.init = () => init();

const init = () => {
  return {
    deploy: {
      success: {
        word: "success",
        reaction: "ok",
      },
      failure: {
        word: "failure",
        reaction: "ng",
      },
    },
    push_latest: {
      success: {
        word: "success",
        messages: (image) => [
          image + ": ok",
        ],
      },
    },
  };
};
