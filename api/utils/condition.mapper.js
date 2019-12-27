/**
 * I don't know if we should convert this to a "sails helper"
 */
// const reduce = require('lodash.reduce')

const conditionReducer = (conditions) => {
  return _.reduce(
    conditions,
    (outList, condition, index) => {
      outList[index] = condition.name_of_condition;
      return outList;
    },
    {},
  );
};

const oneAttribute = (obj) => (Object.keys(obj).length === 1);

module.exports =  { conditionReducer, oneAttribute };
