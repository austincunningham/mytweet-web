const Tweets = require('./app/controllers/tweets');
const Assets = require('./app/controllers/assets');
const Accounts = require('./app/controllers/accounts');

module.exports = [

  { method: 'GET', path: '/', config: Accounts.main },
  { method: 'GET', path: '/signup', config: Accounts.signup },
  { method: 'GET', path: '/login', config: Accounts.login },
  { method: 'POST', path: '/login', config: Accounts.authenticate },
  { method: 'GET', path: '/logout', config: Accounts.logout },
  { method: 'POST', path: '/register', config: Accounts.register },


  { method: 'GET', path: '/home', config: Tweets.home },
  { method: 'GET', path: '/report', config: Tweets.report },
  { method: 'POST', path: '/tweet', config: Tweets.submit },
  { method: 'POST', path: '/delete', config: Tweets.delete },

  { method: 'GET', path: '/settings', config: Accounts.viewSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },
  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },

];

