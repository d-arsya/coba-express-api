import Joi from 'joi'

interface ProductInterface {
  name: String
  price: Number
}

export const createProductValidation = (payload: ProductInterface) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().allow('', 0)
  })

  return schema.validate(payload)
}
