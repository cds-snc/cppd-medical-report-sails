function isEnabled(flag) {
  return (process.env[flag] === 'true') || false;
}

module.exports = {
  isEnabled : isEnabled
};
