/**
 * Created by austin on 16/10/2016.
 */

exports.loginadmin = {
  handler: function (request, reply) {
    Admin.findOne({email: admin.email}).then(foundAdmin => {
      if (foundAdmin && foundAdmin.password === admin.password) {
        request.cookieAuth.set({
          loggedIn: true,
          loggedInAdmin: user.email,
        });
        reply.redirect('/adminhome');
      } else {
        reply.redirect('/signup');
      }
    }).catch(err => {
      reply.redirect('/');
    });
  },
};