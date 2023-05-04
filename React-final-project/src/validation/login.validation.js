import Joi from "joi-browser";

const loginSchema = {
  email: Joi.string().email().min(6).max(255).required().label("Email"),
  password: Joi.string()
    .max(30)
    .required()
    .regex(new RegExp("^(?=.*\\d{4,})(?=.*[*\\-_&^%$#@!])(?=.*[a-zA-Z]).{8,}$"))
    .label("Password"),
};

export default loginSchema;
