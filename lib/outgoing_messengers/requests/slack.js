const fetch = require("node-fetch");

exports.reaction = (info, secret, name) => reaction(info, secret, name);

/**
 * info : request type (string)
 * secret : {
 *   bot_token: slack bot token
 *   channel: slack channel
 *   timestamp: event timestamp
 * }
 * name : reaction name
 */
const reaction = (info, {bot_token, channel, timestamp}, name) => {
  console.log("slack reaction : " + info);
  return request("/api/reactions.add", bot_token, {
    channel,
    timestamp,
    name,
  });
};

const request = async (path, bot_token, data) => {
  const url = "https://slack.com" + path;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer " + bot_token,
    },
    body: JSON.stringify(data),
  });

  console.log("response code: " + response.status);
};
