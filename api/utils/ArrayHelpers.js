const castArray = (...args) => {
  if (!args.length) {
    return [];
  }
  const value = args[0];
  return Array.isArray(value) ? value : [value];
};

const pluckIds = (items) => {
  return _.map(items, (item) => {
    return item.id.toString();
  });
}



module.exports = {
  castArray,
  pluckIds,
}