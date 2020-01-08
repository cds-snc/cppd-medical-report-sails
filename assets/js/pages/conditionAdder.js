const addConditionLink = document.getElementById('addCondition');
const addedConditions = document.getElementById('addedConditions');

const addConditionField = (e) => {
  e.preventDefault();

  const conditionField = document.createElement("INPUT");
  conditionField.setAttribute('type', 'text');
  conditionField.setAttribute('name', 'newConditions[]');

  addedConditions.appendChild(conditionField);
  conditionField.focus();
}

addConditionLink.addEventListener('click', addConditionField);
