function confirmAction(message, okAction) {
  const isOk = confirm(message);
  if (isOk) {
    okAction();
  }
}
