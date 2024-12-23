import { Router, Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validations/product.validation'
import {
  createProductFromDB,
  deleteProductFromDB,
  updateProductFromDB,
  getProductFromDB,
  getProductsFromDB
} from '../services/product.service'
import uuid4 from 'uuid4'

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  logger.info('Get all products data')
  const products = await getProductsFromDB()
  res.status(200).send({ status: true, statusCode: 200, data: products })
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  logger.info('Delete product data')
  const {
    params: { id }
  } = req
  const deletedData = await deleteProductFromDB(id)
  if (deletedData) {
    res.status(204).send({ status: true, statusCode: 204, message: 'Product deleted successfully' })
  } else {
    res.status(404).send({ status: false, statusCode: 404, message: 'Product not found' })
  }
}
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  logger.info('Update product data')
  const {
    params: { id }
  } = req
  const originalData = await getProductFromDB(id)
  const updatedData = await updateProductFromDB(id, req.body)
  if (updatedData) {
    res.status(200).send({ status: true, statusCode: 200, data: updatedData, original: originalData })
  } else {
    res.status(404).send({ status: false, statusCode: 404, message: 'Product not found' })
  }
}
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  logger.info('Get product data')
  const {
    params: { id }
  } = req
  const product = await getProductFromDB(id)
  if (product) {
    res.status(200).send({ status: true, statusCode: 200, data: product })
  } else {
    res.status(404).send({ status: false, statusCode: 404, message: 'Product not found' })
  }
}
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error(`product-create = ${error.details[0].message}`)
    res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
      data: {}
    })
  } else {
    logger.info('Success create new product')
    value.product_id = uuid4()
    const product = await createProductFromDB(value)
    res.status(201).send({
      status: true,
      statusCode: 201,
      data: product
    })
  }
}
