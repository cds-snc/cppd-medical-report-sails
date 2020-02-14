module.exports = {


  friendlyName: 'Create user',


  description: '',

  args: ['name', 'email', 'password'],

  inputs: {
    name: {
      description: 'The name of the user',
      type: 'string',
      required: true
    },
    email: {
      description: 'The email of the user',
      type: 'string',
      required: true
    },
    password: {
      description: 'The password of the user',
      type: 'string',
      required: true
    }
  },


  fn: async function ({ name, email, password }) {

    sails.log('Running custom shell script... (`sails run create-user`)');

    let check = await User.findOne({
      where: {
        email: email
      }
    });

    if (check) {
      sails.log.error('Sorry, that email is already taken.');
      return;
    }

    sails.log.info('All good, creating....');
    await User.create({
      name: name,
      email: email,
      password: password
    });

    sails.log.info('User created!');
  }


};

