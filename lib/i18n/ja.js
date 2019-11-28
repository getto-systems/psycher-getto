exports.init = () => init();

const init = () => {
  return {
    release: {
      success: {
        word: "success",
        messages: (version) => [
          version + " がリリースされました",
          version + " のリリース、おわったよ！",
          "ふう、" + version + "をリリースしたよ",
        ],
      },
      failure: {
        word: "failure",
        messages: (version) => [
          "リリースに失敗しました",
          "うぅ、リリースできなかったよ・・・",
          "ぎゃー失敗したー",
        ],
      },
    },
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
