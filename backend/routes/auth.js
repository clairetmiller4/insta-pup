const passport = require('passport');
const router = require('express').Router();

router.post(
  '/register',
  passport.authenticate('local-registration'),
  (req, res) => {
    res.status(201).json({
      message: 'Successfully created new user!',
      user: req.user.username
    });
  }
);

router.post('/login', passport.authenticate('local-login'), (req, res) => {
  res.status(200).json({
    message: 'Successfully logged in!',
    user: req.user.username
  });
});

module.exports = router;
