const i18n_factory = require("../lib/i18n");
const handler_factory = require("../lib/handler");

test("check i18n struct", async () => {
  i18n_factory.languages().forEach((lang) => {
    const i18n = i18n_factory.init(lang);

    const handler_tests = {
      release: (target) => {
        expect(target.success.word).toBeTruthy();
        expect(target.success.messages("0.0.0")).toBeTruthy();
        expect(target.failure.word).toBeTruthy();
        expect(target.failure.messages("0.0.0")).toBeTruthy();
      },
      deploy: (target) => {
        expect(target.success.word).toBeTruthy();
        expect(target.success.reaction).toBeTruthy();
        expect(target.failure.word).toBeTruthy();
        expect(target.failure.reaction).toBeTruthy();
      },
      push_latest: (target) => {
        expect(target.success.word).toBeTruthy();
        expect(target.success.messages("IMAGE")).toBeTruthy();
      },
    };

    handler_factory.handler_names().forEach((name) => {
      handler_tests[name](i18n[name]);
    });
  });
});

test("unknown language", async () => {
  expect(() => {
    i18n_factory.init("unknown");
  }).toThrow("unknown language: unknown");
});
