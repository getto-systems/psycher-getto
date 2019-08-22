const event_map = {
  gitlab: (body) => parse_gitlab(body),
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

  if (Object.keys(detail).some((key) => !detail[key])) {
    return null;
  }

  return {
    type: body.type,
    detail,
  };
};

const parse_gitlab = (body) => {
  return {
    channel: body.channel,
    timestamp: body.timestamp,
    result: body.result,
  };
};
