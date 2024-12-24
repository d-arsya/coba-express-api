import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createProductFromDB = async (product: any) => {
  const productCreated = await prisma.product.create({
    data: {
      name: product.name,
      price: product.price,
      photo: product.photo
    }
  })
  return productCreated
}
export const getProductsFromDB = async () => {
  const products = await prisma.product.findMany()
  return products
}
export const getProductFromDB = async (value: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id: value
    }
  })
  return product
}
export const updateProductFromDB = async (id: number, product: any) => {
  const productUpdated = await prisma.product.update({
    where: {
      id: id
    },
    data: {
      name: product.name,
      price: product.price,
      photo: product.photo
    }
  })
  return productUpdated
}
export const deleteProductFromDB = async (value: number) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: value
      }
    })
    return deletedProduct
  } catch (error) {
    return null
  }
}
