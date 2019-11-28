exports.init = () => init();

const init = () => {
  return {
    release: {
      success: {
        word: "success",
        messages: (version) => [
          "OK : version: " + version,
        ],
      },
      failure: {
        word: "failure",
        messages: (version) => [
          "NG : version: " + version,
        ],
      },
    },
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
