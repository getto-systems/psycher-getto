const event_map = {
  release: (body) => parse_release(body),
  deploy: (body) => parse_deploy(body), // TODO deprecated
  push_latest: (body) => parse_push_latest(body), // TODO deprecated
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

const parse_release = (body) => {
  return {
    reply_to: {
      channel: body.channel,
    },
    info: {
      version: body.version,
    },
    result: body.result,
  };
};

const parse_deploy = (body) => {
  return {
    reply_to: {
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
      channel: body.channel,
    },
    info: {
      image: body.image,
    },
    result: body.result,
  };
};
