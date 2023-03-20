// importing express 
const express = require('express');

// importing Auth
const { isAuth, authorize } = require('../utils/middleware/isAuth');

// importing user controller
const { userSignup, userlogin, userBooking, userEditBooking, userDeleteBooking, userGetAllBookings } = require('../controllers/user.controller');
const { allUsers, createReservation, allReservations } = require('../controllers/admin.controller');

const router = express.Router();

// importing Validation
const { validateRequest, schemas } = require('../utils/middleware/validation');


router.post('/signup', validateRequest(schemas.userSchema), userSignup);
router.post('/login', validateRequest(schemas.loginSchema), userlogin);
router.post('/booking', isAuth, validateRequest(schemas.bookingSchema), userBooking);
router.put('/bookings/:id', isAuth, userEditBooking);
router.delete('/bookings/:id', isAuth, userDeleteBooking);
router.get('/bookings', isAuth, userGetAllBookings);

// admin
router.get('/all', isAuth, authorize('admin'), allUsers);
router.post('/reservation', isAuth, authorize('admin'), createReservation);
router.get('/reservations', isAuth, authorize('admin'), allReservations);

// exporting router
module.exports = router;