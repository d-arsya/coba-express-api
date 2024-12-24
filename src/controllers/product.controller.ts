import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validations/product.validation'
import {
  createProductFromDB,
  deleteProductFromDB,
  updateProductFromDB,
  getProductFromDB,
  getProductsFromDB
} from '../services/product.service'
import { put, del } from '@vercel/blob'
import { decode } from 'base64-arraybuffer'

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const products = await getProductsFromDB()
  logger.info('Get all products data')
  res.status(200).send({ status: true, statusCode: 200, data: products })
}
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product = await getProductFromDB(parseInt(req.params.id))
  if (product) {
    logger.info('Get product data')
    res.status(200).send({ status: true, statusCode: 200, data: product })
  } else {
    logger.error('Get product failed')
    res.status(404).send({ status: false, statusCode: 404, message: 'Product not found' })
  }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const deletedData = await deleteProductFromDB(parseInt(req.params.id))
  del(deletedData?.photo || 'ga')

  if (deletedData) {
    logger.info('Delete product data')
    res.status(204).send({ status: true, statusCode: 204, message: 'Product deleted successfully' })
  } else {
    logger.error('Delete product failed')
    res.status(404).send({ status: false, statusCode: 404, message: 'Product not found' })
  }
}
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const originalData = await getProductFromDB(parseInt(req.params.id))
  const file = req.file
  if (file) {
    await del(originalData?.photo || 'ga')
    const fileBase64 = decode(file?.buffer.toString('base64') || 'gata')
    const fileUpload = await put(`products/product.${file?.originalname.split('.').pop()}`, fileBase64, {
      access: 'public'
    })
    req.body.photo = fileUpload.url
  }

  const updatedData = await updateProductFromDB(parseInt(req.params.id), req.body)
  if (updatedData) {
    logger.info('Update product data')
    res.status(200).send({ status: true, statusCode: 200, data: updatedData, original: originalData })
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
    const file = req.file
    const fileBase64 = decode(file?.buffer.toString('base64') || 'gata')
    const fileUpload = await put(`products/product.${file?.originalname.split('.').pop()}`, fileBase64, {
      access: 'public'
    })
    value.photo = fileUpload.url

    const product = await createProductFromDB(value)
    res.status(201).send({
      status: true,
      statusCode: 201,
      data: product
    })
  }
}
