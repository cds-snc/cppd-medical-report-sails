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
    // validate for existing email
    let user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) {
      req.flash('errors', [{ email: ['Email address already taken'] }]);
      req.flash('data', req.body);
      return res.redirect('back');
    }

    let valid = req.validate(req, res, require('../schemas/user.schema'));

    if (valid) {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      return res.redirect(sails.route('users'));
    }
  },

  edit: async function (req, res) {
    let user = await User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['name', 'email']
    });

    if (!user) {
      return res.redirect(sails.route('users'));
    }

    res.view('pages/users/edit.njk', {
      data: user
    });
  },

  update: async function (req, res) {

  },

  destroy: async function (req, res) {

  }

};

