function checkReturnToWork() {
  const returnToWork = document.getElementsByName('returnToWork');
  const additional = document.getElementById('additional_fields');
  console.log(returnToWork);
  additional.style.display = 'none';

  for (var i = 0, len = returnToWork.length; i < len; i++) {
    if (returnToWork[i].checked) {
      if (returnToWork[i].value === '1') {
        additional.style.display = 'block';
      }
    }
    returnToWork[i].onclick = function () {
      if (this.checked && this.value === '1') {
        additional.style.display = 'block';
      } else {
        additional.style.display = 'none';
      }
    };
  }
}

checkReturnToWork();
