import mongoose from 'mongoose'
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    price: {
      type: Number
    }
  },
  { timestamps: true, versionKey: false }
)

const productModel = mongoose.model('product', productSchema)
export default productModel
