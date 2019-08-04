const slack_messenger = require("../../lib/outgoing_messengers/slack");
const slack_request = require("../outgoing_messengers/requests/slack");

const notify_gitlab_failure = require("../../lib/actions/notify_gitlab_failure");

test("notify gitlab failure", async () => {
  const slack_request_mock = slack_request.init();
  const slack = slack_messenger.prepare(slack_request_mock).init({
    channel: "CHANNEL",
    timestamp: "TIMESTAMP",
    bot_token: "SLACK_BOT_TOKEN",
  });

  notify_gitlab_failure.perform(slack);

  expect(slack_request_mock.data.reaction.length).toBe(1);
  expect(slack_request_mock.data.reaction[0]).toBe("gitlab-failure");
});
