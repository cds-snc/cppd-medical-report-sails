module.exports = function checkUnknowns(detailsId, radiosName, unknownValue) {
  const unknown = document.getElementById(detailsId);
  const radios = document.getElementsByName(radiosName);


  unknown.style.display = 'none';

  for (var i = 0, len = radios.length; i < len; i++) {
    if (radios[i].checked) {
      if (radios[i].value === unknownValue) {
        unknown.style.display = 'block';
      }
    }
    radios[i].onclick = function() {
      if (this.checked && this.value === unknownValue) {
        unknown.style.display = 'block';
      } else {
        unknown.style.display = 'none';
      }
    };
  }
};

