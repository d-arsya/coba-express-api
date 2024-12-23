import { Router } from 'express'
import { getProducts, createProduct, getProduct, deleteProduct, updateProduct } from '../controllers/product.controller'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getProducts)
ProductRouter.get('/:id', getProduct)
ProductRouter.post('/', createProduct)
ProductRouter.delete('/:id', deleteProduct)
ProductRouter.put('/:id', updateProduct)
