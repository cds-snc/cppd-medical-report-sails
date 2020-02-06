function checkPractitionerType() {
  const practitionerType = document.getElementsByName('practitionerType');
  const additional = document.getElementById('otherPractitionerType');

  additional.style.display = 'none';

  for (var i = 0, len = practitionerType.length; i < len; i++) {
    if (practitionerType[i].checked && practitionerType[i].value === '4') {
      additional.style.display = 'block';
    }
    practitionerType[i].onclick = function () {
      if (this.checked && this.value === '4') {
        additional.style.display = 'block';
      } else {
        additional.style.display = 'none';
      }
    };
  }
}

checkPractitionerType();
