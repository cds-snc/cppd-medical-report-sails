function isEnabled(flag) {
  return process.env[flag] || false;
}

module.exports = {
  isEnabled : isEnabled
};
