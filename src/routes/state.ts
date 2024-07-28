import express, { Request, Response } from 'express';
import State from '../models/State';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// Middleware for authentication (example, replace with your actual middleware)
const isAuthenticated = (req: Request, res: Response, next: any) => {
  // Your authentication logic here
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Unauthorized');
};

// Create a new state
router.post(
  '/',
  isAuthenticated,
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('status').notEmpty().withMessage('Status is required'),
  ],
  async (req: Request, res: Response) => {
    console.log('Received POST request with data:', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, status, createdBy } = req.body;
      const newState = new State({
        name,
        description,
        status,
        createdBy,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await newState.save();
      res.status(201).json(newState);
    } catch (err) {
      console.error('Error creating state:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Get all states
router.get('/', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const states = await State.find();
    res.status(200).json(states);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single state by ID
router.get('/:id', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const state = await State.findById(req.params.id);
    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }
    res.status(200).json(state);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a state by ID
router.put(
  '/:id',
  isAuthenticated,
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('status').notEmpty().withMessage('Status is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const state = await State.findById(req.params.id);
      if (!state) {
        return res.status(404).json({ error: 'State not found' });
      }

      const { name, description, status, createdBy } = req.body;
      state.name = name;
      state.description = description;
      state.status = status;
      state.updatedAt = new Date();
      state.createdBy = createdBy;

      await state.save();
      res.status(200).json(state);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Delete a state by ID
router.delete('/:id', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }
   // await state.remove();
    res.status(200).json({ message: 'State deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
