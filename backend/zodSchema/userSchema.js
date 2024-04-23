const { z } = require('zod');

const userRegistrationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string().email(),
  password: z.string().min(8),
});

const userLoginSchema = z.object({
  userName: z.string().email(),
  password: z.string().min(8),
});


const userUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().min(8).optional(),
});

module.exports = {userRegistrationSchema, userLoginSchema , userUpdateSchema}