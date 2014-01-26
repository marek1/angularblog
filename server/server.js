var flash = require('connect-flash')
  , express = require('express')
  , http = require('http')
  , path = require('path')
  , blog = require('./routes/blogs')
  , passport = require('passport')
  , util = require('util')
  , GitHubStrategy = require('passport-github').Strategy
  , ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

/*
 * Passport Setup & Strategies
 */  

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
	clientID: '9baff26af514475ffa62',
    clientSecret: '9e657bf95c2041a3a62ddee0e9a40b91954a2762',
    callbackURL: "http://localhost:9000/auth/github/callback"
  },
  function(token, tokenSecret, profile, done) {
    // NOTE: You'll probably want to associate the Twitter profile with a
    //       user record in your application's DB.
    var user = profile;
    return done(null, user);
  }
));


var app = express();
// configure Express
app.configure(function() {
	app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
	app.set('port', process.env.PORT || 9000);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	
	// required for passport
	app.use(express.cookieParser());
	app.use(express.session({ 
		secret: 'contatuajes',
    	cookie  : { maxAge  : new Date(Date.now() + (60 * 1000 * 30)) }
	})); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	
	// use flash
	app.use(flash());
	
	// router
	app.use(app.router);
	app.use(express.static(path.join(__dirname, '..', 'app')));
});
	
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
 * Blog routes
 */
/*
 * Public routes (in routes/blogs.js):
 */ 
app.get('/blogs', blog.findAll);
app.get('/blogs/id/:id', blog.findById);
app.get('/blogs/url/:url', blog.findByUrl);
/*
 * Private routes (in routes/blogs.js): 
 */
app.put('/blogs/:id', blog.updateblog);
app.delete('/blogs/:id', blog.deleteblog);
app.post('/blogs', blog.addblog);
/*
 * Account routes
 */
app.get('/account',
  ensureLoggedIn('/login'),
  function(req, res) {
    res.send(req.user.username);
  });
  
app.get('/login',
  function(req, res) {
  	res.send('Unauthorized');
  });
  
app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });  
  
app.get('/auth/github/callback', 
  passport.authenticate('github'),
  function(req, res) {
     res.redirect('/');
  });  
  
app.get('/logout', function(req, res){
  req.logout();
  //res.redirect('/');
  res.end();
});

/*
 * Create server :
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

