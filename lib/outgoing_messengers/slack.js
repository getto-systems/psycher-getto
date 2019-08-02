const fetch = require("node-fetch");

exports.init = (bot_event, secret) => init(bot_event, secret);

/**
 * bot_event : getto_bot_event
 * secret : psycher_secret
 */
const init = (bot_event, secret) => {
  const add_reaction = (info, emoji) => {
    console.log("slack reaction : " + info);

    const data = {
      channel: bot_event.channel,
      timestamp: bot_event.timestamp,
      name: emoji,
    };
    console.log("slack add reaction : " + emoji);
    return request("/api/reactions.add", data, secret);
  };

  return {
    add_reaction: add_reaction,
  };
};

const request = async (path, data, secret) => {
  const url = "https://slack.com" + path;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer " + secret.slack.bot_token,
    },
    body: JSON.stringify(data),
  });

  console.log("response code: " + response.status);
};
