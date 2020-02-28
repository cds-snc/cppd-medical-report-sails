//This funcion is included on pages through webpack it is used!

// eslint-disable-next-line no-unused-vars
function confirmAction(message, okAction) {
  const isOk = confirm(message);
  if (isOk) {
    okAction();
  }
}
