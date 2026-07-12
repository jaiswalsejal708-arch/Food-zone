const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

// Public routes
router.get('/', restaurantController.getRestaurants);
router.get('/:id', restaurantController.getRestaurantById);

// Protected routes (requires login + role authorization)
router.post('/', protect, authorize('vendor', 'admin'), restaurantController.createRestaurant);
router.put('/:id', protect, authorize('vendor', 'admin'), restaurantController.updateRestaurant);
router.delete('/:id', protect, authorize('vendor', 'admin'), restaurantController.deleteRestaurant);

module.exports = router;
