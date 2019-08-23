const event_map = {
  deploy: (body) => parse_deploy(body),
  push_latest: (body) => parse_push_latest(body),
};

exports.parse = (body) => parse(body);

/**
 * body : event body
 *
 * returns event_info
 */
const parse = (body) => {
  if (!body || !body.type || !event_map[body.type]) {
    return null;
  };

  const detail = event_map[body.type](body);

  return {
    type: body.type,
    detail,
  };
};

const parse_deploy = (body) => {
  return {
    reply_to: {
      as: "getto",
      channel: body.channel,
      timestamp: body.timestamp,
    },
    info: {},
    result: body.result,
  };
};

const parse_push_latest = (body) => {
  return {
    reply_to: {
      as: "dockerhub",
      channel: body.channel,
    },
    info: {
      image: body.image,
    },
    result: body.result,
  };
};
