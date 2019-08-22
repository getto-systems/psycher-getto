exports.init = (data) => init(data);

/**
 * returns infra/message_store + data
 */
const init = () => {
  let data = {
    add: [],
  };

  const add = async (struct) => {
    data.add.push(struct);
  };

  return {
    add,
    data,
  };
};
