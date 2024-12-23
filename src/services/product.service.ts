import mongoose from 'mongoose'
import productModel from '../models/product.model'

export const getProductsFromDB = async () => {
  return await productModel
    .find()
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.log(err)
    })
}
export const createProductFromDB = async (data: any) => {
  return await productModel
    .create(data)
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.log(err)
    })
}
export const getProductFromDB = async (value: String) => {
  return await productModel
    .findById(value)
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.log(err)
    })
}
export const deleteProductFromDB = async (value: String) => {
  return await productModel
    .findByIdAndDelete(value)
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.log(err)
    })
}
export const updateProductFromDB = async (id: String, value: any) => {
  return await productModel
    .findByIdAndUpdate(id, value, { new: true })
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.log(err)
    })
}
