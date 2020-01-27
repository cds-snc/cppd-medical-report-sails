module.exports.routes = {
  'GET /api/documents': {
    name: 'api.documents',
    controller: 'API/DocumentsController',
    action: 'index',
  },

  'POST /api/documents': {
    name: 'api.documents.add',
    controller: 'API/DocumentsController',
    action: 'add',
  },

  'DELETE /api/documents': {
    name: 'api/documents.delete',
    controller: 'API/DocumentsController',
    action: 'delete',
  },

  'GET /api/conditions': {
    name: 'api.conditions',
    controller: 'API/ConditionsController',
    action: 'index',
  }
};
