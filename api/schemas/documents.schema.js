module.exports = {
  supportingDocuments: function (value, attributes) {
    const attachLater = attributes.attachLater;
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
