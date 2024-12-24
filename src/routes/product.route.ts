import { Router } from 'express'
import { getProducts, createProduct, getProduct, deleteProduct, updateProduct } from '../controllers/product.controller'
import multer from 'multer'

export const ProductRouter: Router = Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

ProductRouter.get('/', getProducts)
ProductRouter.get('/:id', getProduct)
ProductRouter.post('/', upload.single('photo'), createProduct)
ProductRouter.delete('/:id', deleteProduct)
ProductRouter.put('/:id', updateProduct)
