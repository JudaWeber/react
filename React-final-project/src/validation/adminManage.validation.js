import Joi from "joi-browser";

const adminManageSchema = {
  isAdmin: Joi.boolean().label("isAdmin"),
};

export default adminManageSchema;
