/**
 * We just want to get an array collection of objects
 * like { id: name } for the checkbox list
 */
const conditionReducer = (conditions) => {
  return _.reduce(
    conditions,
    (outList, condition) => {
      outList[condition.id] = condition.conditionName;
      return outList;
    },
    {},
  );
};

module.exports = {
  conditionReducer
};
