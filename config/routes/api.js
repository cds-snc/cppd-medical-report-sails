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

  'PATCH /api/documents/:id': {
    name: 'api.documents.update',
    controller: 'API/DocumentsController',
    action: 'save',
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
  },

  'GET /api/conditions/:id/documents': {
    controller: 'API/ConditionDocumentsController',
    action: 'index',
  },

  'DELETE /api/conditions/:id/documents': {
    controller: 'API/ConditionDocumentsController',
    action: 'delete'
  },
};
