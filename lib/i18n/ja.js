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
        messages: (info) => [
          info.image + " が push されました",
          "おわったよ！" + info.image,
          "ふう、" + info.image + "をビルドしたよ",
        ],
      },
    },
  };
};
