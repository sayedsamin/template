import { body, validationResult } from 'express-validator';

export const validateTask = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().optional(),
  body('status')
    .isIn(['pending', 'in_progress', 'completed'])
    .withMessage('Invalid status')
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};