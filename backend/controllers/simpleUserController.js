const SimpleUser = require('../models/SimpleUser');

// Create a new user in the database
const createSimpleUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    // 1. Validation
    if (!name || !email) {
      res.status(400);
      throw new Error('Name and email are required');
    }

    // 2. Call the Model to run database logic
    const newUser = await SimpleUser.create({ name, email });

    // 3. Return JSON response
    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      user: newUser
    });
  } catch (error) {
    next(error); // Forward error to central error handler
  }
};

module.exports = {
  createSimpleUser
};
