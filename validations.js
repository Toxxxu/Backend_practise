import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Невірний формат пошти').isEmail(),
    body('password', 'Пароль повинен бути мінімум 8 символів').isLength({ min: 8 }),
];

export const registerValidation = [
    body('email', 'Невірний формат пошти').isEmail(),
    body('password', 'Пароль повинен бути мінімум 8 символів').isLength({ min: 8 }),
    body('fullName', 'Укажіть імя').isLength({ min: 3 }),
    body('avatarUrl', 'Невірна силка на аватарку').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Введіть заголовок статті').isLength({ min: 3 }).isString(),
    body('text', 'Введіть текст статті').isLength({ min: 10 }).isString(),
    body('tags', 'Невірний формат тегів, укажіть масив').optional().isArray(),
    body('imageUrl', 'Невірна силка зображення').optional().isURL(),
];