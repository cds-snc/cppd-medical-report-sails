/**
 * Takes an array of conditions of the following structure:
 * [
 *    {
 *       clinically_impair: "",
 *       condition_last: "",
 *       condition_outlook: "",
 *       condition_outlook_unknown: "",
 *       name_of_condition: "",
 *       symptoms_began: "",
 *       symptoms_occur: "",
 *       symptoms_occur_unknown: ""
 *    }
 * ]
 * ... and returns an object like so:
 *  {
 *    0: "asdf",
 *    1: "test",
 *    2: "asdfasdf"
 *  }
 */
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
