/**
 * UserManagementController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async function (req, res) {
    let users = await User.findAll();

    return res.view('pages/users/index.njk', {
      users: users
    });
  },

  create: function (req, res) {
    return res.view('pages/users/create.njk');
  },

  store: async function (req, res) {

  },

  edit: async function (req, res) {

  },

  update: async function (req, res) {

  },

  destroy: async function (req, res) {

  }

};

