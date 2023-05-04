import Joi from "joi-browser";

const registerschema = {
  name: Joi.string().min(3).max(255).required().label("Name"),
  email: Joi.string().email().min(8).max(255).required().label("Email"),
  phone: Joi.string()
    .required()
    .regex(new RegExp("^(?:\\+?\\d{1,3}|0)?-?\\d{2,3}-?\\d{6,7}$"))
    .label("Phone"),
  password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .regex(new RegExp("^(?=.*\\d{4,})(?=.*[*\\-_&^%$#@!])(?=.*[a-zA-Z]).{8,}$"))
    .label("Password"),
};

export default registerschema;
