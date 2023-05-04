import Joi from "joi-browser";

const productSchema = {
  name: Joi.string().min(2).max(255).required().trim().label("Name"),
  price: Joi.string()
    .required()
    .label("Price" + " "),
  description: Joi.string()
    .min(3)
    .max(150)
    .required()
    .trim()
    .label("Description"),
  img: Joi.string().uri().required().label("Image url").trim(),
  id: Joi.string().label(" ID"),
};

export default productSchema;
