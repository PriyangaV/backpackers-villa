const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.sendApiError({
      title: 'Missing Data!',
      detail: 'Email or Password is missing!'
    });
    /* return res.status(422).send({
      errors: [
        { title: 'Missing Data', detail: 'Email or Password is missing' }
      ]
    }); */
  }

  User.findOne({ email }, (error, foundUser) => {
    if (error) {
      return res.mongoError(error);
    }
    if (!foundUser) {
      return res.sendApiError({
        title: 'Invalid Data!',
        detail: 'User with provided email or password does not exist!'
      });
      /* return res.status(422).send({
        errors: [
          {
            title: 'Invalid Email',
            detail: 'User with provided email does not exist!'
          }
        ]
      }); */
    }

    if (foundUser.hasSamePassword(password)) {
      // Generate JWT Token - header.payload.signature
      // Use this token and store it in client (localStorage / Cookie)
      const token = jwt.sign(
        {
          sub: foundUser._id, // subject
          username: foundUser.username
          // iat: generated automatically - issued at
        },
        config.JWT_SECRET,
        { expiresIn: '2h' } // optional
      );

      return res.json({ token });
    } else {
      return res.sendApiError({
        title: 'Invalid Password!',
        detail: 'Provided password does not match!'
      });
      /* return res.status(422).send({
        errors: [
          {
            title: 'Invalid Password',
            detail: 'Provided password does not match!'
          }
        ]
      }); */
    }

    /* const user = new User({ email, password });

    user.save((error, loggedInUser) => {
      if (error) {
        return res.mongoError(error);
      }
      return res.json({ status: `User ${loggedInUser._id} registered` });
    }); */
  });
  // return res.json({ message: `User logging in!` });
};
exports.register = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;

  if (!password || !email) {
    return res.sendApiError({
      title: 'Missing Data!',
      detail: 'Email or Password is missing!'
    });
    /* return res.status(422).send({
      errors: [
        { title: 'Missing Data', detail: 'Email or Password is missing' }
      ]
    }); */
  }

  if (password !== passwordConfirmation) {
    return res.sendApiError({
      title: 'Invalid password!',
      detail: 'Password is not matching the confirmation password!'
    });
    /* return res.status(422).send({
      errors: [
        {
          title: 'Invalid password',
          detail: 'Password is not matching the confirmation password!'
        }
      ]
    }); */
  }

  User.findOne({ email }, (error, existingUser) => {
    if (error) {
      return res.mongoError(error);
    }
    if (existingUser) {
      return res.sendApiError({
        title: 'Invalid Email!',
        detail: 'User with provided email already exists!'
      });
      /* return res.status(422).send({
        errors: [
          {
            title: 'Invalid Email',
            detail: 'User with provided email already exists!'
          }
        ]
      }); */
    }

    const user = new User({ username, email, password, passwordConfirmation });

    user.save((error, registeredUser) => {
      if (error) {
        return res.mongoError(error);
      }
      return res.json({ status: `User ${registeredUser._id} registered` });
    });
  });
};

exports.onlyAuthUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const { decodedToken, error } = parseToken(token);

    if (error) {
      return res.sendApiError({
        title: error.name,
        detail: error.message
      });
    }

    User.findById(decodedToken.sub, (error, foundUser) => {
      if (error) {
        return res.mongoError(error);
      }

      if (foundUser) {
        res.locals.user = foundUser;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  } else {
    return notAuthorized(res);
  }
};

function notAuthorized(res) {
  return res.sendApiError({
    title: 'Not Authorized!',
    detail: 'You need to log in to get an access!'
  });
  /* return res.status(422).send({
    errors: [
      {
        title: 'Not Authorized!',
        detail: 'You need to log in to get an access!'
      }
    ]
  }); */
}

function parseToken(token) {
  try {
    const decodedToken = jwt.verify(token.split(' ')[1], config.JWT_SECRET);
    return { decodedToken };
  } catch (error) {
    return { error };
  }

  /* try {
    return jwt.verify(token.split(' ')[1], config.JWT_SECRET);
  } catch (error) {
    return null;
  } */
}
