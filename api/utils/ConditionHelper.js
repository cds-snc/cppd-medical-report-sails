const castArray = require('./ArrayHelpers').castArray;

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
        body[selectedArray] = [];
      }

      body[selectedArray] = castArray(body[selectedArray]);

      // the new conditions go at the end of any existing conditions
      let newIndex = index + indexStart;
      body[selectedArray].push(newIndex.toString());
    }
  });

  return body;
}

const getMedicationsByCondition = (medicalReport, condition) => {
  if (!_.has(medicalReport, 'medications')) {
    return [];
  }
  const conditionId = medicalReport.conditions.indexOf(condition);
  let medications = [];

  medicalReport.medications.forEach((medication) => {
    if (medication.medicationTreatedCondition.indexOf(conditionId) !== -1) {
      medications.push(medication);
    }
  });

  return medications;
}

const getTreatmentsByCondition = (medicalReport, condition) => {
  if (!_.has(medicalReport, 'treatments')) {
    return [];
  }
  const conditionId = medicalReport.conditions.indexOf(condition);
  let treatments = [];

  medicalReport.treatments.forEach((treatment) => {
    if (treatment.treatmentTreatedCondition.indexOf(conditionId) !== -1) {
      treatments.push(treatment);
    }
  });

  return treatments;
}

// 56C15B
const getConditionsWithMedicationsAndTreatments = (medicalReport) => {
  // bail out if there are no conditions
  if (!_.has(medicalReport, 'conditions')) {
    return false;
  }

  medicalReport.conditions.forEach((condition) => {
    condition.medications = [];
    condition.treatments = [];

    if (_.has(medicalReport, 'medications')) {
      condition.medications = getMedicationsByCondition(medicalReport, condition);
    }

    if (_.has(medicalReport, 'treatments')) {
      condition.treatments = getTreatmentsByCondition(medicalReport, condition);
    }
  });

  return medicalReport.conditions;
}

module.exports = {
  addConditions,
  getConditionsWithMedicationsAndTreatments
}