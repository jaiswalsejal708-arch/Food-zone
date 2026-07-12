const Restaurant = require('../models/Restaurant');

// Create a new restaurant (Only Vendors and Admins)
const createRestaurant = async (req, res, next) => {
  try {
    const { name, address, phone, cuisine_type } = req.body;
    const vendor_id = req.user.id; // Extracted from authMiddleware

    if (!name || !address || !phone) {
      res.status(400);
      throw new Error('Name, address, and phone are required');
    }

    const newRestaurant = await Restaurant.create({
      name,
      address,
      phone,
      cuisine_type,
      vendor_id
    });

    res.status(201).json({
      message: 'Restaurant created successfully',
      restaurant: newRestaurant
    });
  } catch (error) {
    next(error);
  }
};

// Get all restaurants (Public)
const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    next(error);
  }
};

// Get single restaurant by ID (Public)
const getRestaurantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      res.status(404);
      throw new Error('Restaurant not found');
    }

    res.json(restaurant);
  } catch (error) {
    next(error);
  }
};

// Update restaurant details (Only owner vendor or admin)
const updateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, address, phone, cuisine_type } = req.body;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      res.status(404);
      throw new Error('Restaurant not found');
    }

    // Authorization: check if the logged-in user is the owner vendor or an admin
    if (restaurant.vendor_id !== req.user.id && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to update this restaurant');
    }

    const updated = await Restaurant.update(id, {
      name: name || restaurant.name,
      address: address || restaurant.address,
      phone: phone || restaurant.phone,
      cuisine_type: cuisine_type || restaurant.cuisine_type
    });

    res.json({
      message: 'Restaurant updated successfully',
      restaurant: updated
    });
  } catch (error) {
    next(error);
  }
};

// Delete restaurant (Only owner vendor or admin)
const deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      res.status(404);
      throw new Error('Restaurant not found');
    }

    // Authorization check
    if (restaurant.vendor_id !== req.user.id && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to delete this restaurant');
    }

    await Restaurant.delete(id);
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
};
