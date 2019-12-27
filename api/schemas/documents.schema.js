module.exports = {
  supporting_documents: function (value, attributes) {
    const attachLater = attributes.attach_later;
    if (!attachLater) {
      return {
        presence: {
          allowEmpty: false,
          message: '^errors.supporting_documents_required'
        }
      };
    }
  }
};
