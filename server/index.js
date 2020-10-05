const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const { provideMongoErrorHandler } = require('./middlewares');
const path = require('path');

// Routes
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');
const imageUploadRoutes = require('./routes/image-upload');

const { onlyAuthUser } = require('./controllers/users');

/* const Rental = require('./models/rental');
const User = require('./models/user'); */

// Models
// before mongoose connect, schema is necessary
require('./models/rental');
require('./models/user');
require('./models/booking');
require('./models/cloudinary-image');

// Port
const PORT = process.env.PORT || 3002;

// mongoose.set('useCreateIndex', true);
mongoose.connect(
  config.DB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log('Connected to DB!');
  }
);

// ! Middleware
app.use(express.json()); // * used to parse JSON bodies
app.use(provideMongoErrorHandler);

// ! Custom Middleware - Global
// - We can have many middlewares
/* const middleware = (req, res, next) => {
  const isError = false;
  if (!isError) {
    req.someProp = 'Hello Universe from Custom Middleware!';
    return next();
  }
  return res.status(422).send('We got an error!');
  // next(); // ! without this, middleware won't continue to the next action handler
}; */

// $ Middlewares
// app.use(middleware); // @ Global - applies to all routes
// app.use('/api/v1/users', middleware, userRoutes); // @ Only applies to userRoutes
// express.Router().get("/api/v1/rentals", middleware, getRentals); // @ Only applies to this request

// - Only access to the authenticated users
// @ Protected-Route
// > headers - authorization: Bearer token
app.get('/api/v1/secret', onlyAuthUser, (req, res) => {
  const {
    user: { username }
  } = res.locals;
  return res.json({
    message: `Secret Message to: ${username}!`
  });
});

// API Routes
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/image-upload', imageUploadRoutes);

if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'build');
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    // return res.json({ message: 'hello universe!' });
    return res.sendFile(path.resolve(distPath, 'index.html'));
  });
}
app.listen(PORT, () => {
  console.log('Server is listening on port', PORT);
});
