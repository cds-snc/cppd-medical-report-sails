const addConditions = (req, body, selectedArray) => {
  /**
     * Init conditions array if it doesn't exist yet and grab
     * the starting index for any new conditions.
     */
  if (!_.has(req.session.medicalReport, 'conditions')) {
    req.session.medicalReport.conditions = [];
  }
  const indexStart = req.session.medicalReport.conditions.length;

  body.newConditions.forEach((item, index) => {

    // we're not doing any validation, just don't save blanks
    if (item !== '') {
      req.session.medicalReport.conditions.push({
        conditionName: item
      });

      // now we're going to "select" the newly created conditions
      if (!_.has(body, selectedArray)) {
        body.medicationTreatedCondition = [];
      }

      // the new conditions go at the end of any existing conditions
      let newIndex = index + indexStart;
      body.medicationTreatedCondition.push(newIndex.toString());
    }
  });

  return body;
}

module.exports = {
  addConditions,
}