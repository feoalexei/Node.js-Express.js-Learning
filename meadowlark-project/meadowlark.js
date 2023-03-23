/* eslint-disable no-undef */
const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');

const handlers = require('./lib/handlers');

const app = express();

// configure Handlebars view engine
app.engine(
  'handlebars',
  expressHandlebars.engine({
    defaultLayout: 'main',
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

app.get('/', handlers.home);

// handlers for browser-based form submission
app.get('/newsletter-signup', handlers.newsletterSignup);
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess);
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou);

// handlers for fetch/JSON form submission
app.get('/newsletter', handlers.newsletter);
app.post('/api/newsletter-signup', handlers.api.newsletterSignup);

app.get('/about', handlers.about);

// vacation photo contest
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).send({ error: err.message });
    handlers.vacationPhotoContestProcess(req, res, fields, files);
  });
});

// User page 404
app.use(handlers.notFound);

// User page 500
app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express started on http://localhost:${port}` +
        '; press Ctrl-C to terminate.'
    );
  });
} else {
  module.exports = app;
}
