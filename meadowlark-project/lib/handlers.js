/* eslint-disable no-unused-vars */
exports.api = {};

// **** these handlers are for browser-submitted forms
exports.newsletterSignup = (req, res) => {
  // we will learn about CSRF later...for now, we just
  // provide a dummy value
  res.render('newsletter-signup', { csrf: 'CSRF token goes here' });
};
exports.newsletterSignupProcess = (req, res) => {
  console.log('Form (from query field): ' + req.query.form);
  console.log('CSRF token (from hidden form field): ' + req.body._csrf);
  console.log('Name (from visible form field): ' + req.body.name);
  console.log('Email (from visible form field): ' + req.body.email);
  res.redirect(303, '/newsletter-signup/thank-you');
};
exports.newsletterSignupThankYou = (req, res) =>
  res.render('newsletter-signup-thank-you');
// **** end browser-submitted form handlers

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
  console.log('field data: ', fields);
  console.log('files: ', files);
  res.redirect(303, '/contest/vacation-photo-thank-you');
};

exports.api.vacationPhotoContest = (req, res, fields, files) => {
  console.log('field data: ', fields);
  console.log('files: ', files);
  res.send({ result: 'success' });
};

const fortune = require('./fortune');

exports.home = (req, res) => res.render('home');

exports.about = (req, res) =>
  res.render('about', { fortune: fortune.getFortune() });

// **** these handlers are for fetch/JSON form handlers
exports.newsletter = (req, res) => {
  // we will learn about CSRF later...for now, we just
  // provide a dummy value
  res.render('newsletter', { csrf: 'CSRF token goes here' });
};
exports.api.newsletterSignup = (req, res) => {
  console.log('CSRF token (from hidden form field): ' + req.body._csrf);
  console.log('Name (from visible form field): ' + req.body.name);
  console.log('Email (from visible form field): ' + req.body.email);
  res.send({ result: 'success' });
};
// **** end fetch/JSON form handlers

exports.notFound = (req, res) => res.render('404');

exports.serverError = (err, req, res, next) => res.render('500');
