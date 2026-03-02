const zod = require('zod')

const registerSchema = zod.object({
    name: zod.string().min(3,'Name must be atleast three characters'),
    email: zod.string().email('Invalid email'),
    password: zod.string.min(6,'password must have atleast six character')
})


const loginSchema = zod.object({
    email: zod.string().email('Invalid email address'),
    password: zod.string.min(6,'password must have atleast six character')
})

module.exports = {registerSchema, loginSchema}