exports.init = () => init();

const init = () => {
  return {
    deploy: {
      success: {
        word: "success",
        reaction: "white_check_mark",
      },
      failure: {
        word: "failure",
        reaction: "x",
      },
    },
    push_latest: {
      success: {
        word: "success",
        messages: (image) => [
          image + " が push されました",
          "おわったよ！" + image,
          "ふう、" + image + "をビルドしたよ",
        ],
      },
    },
  };
};
