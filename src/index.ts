import express, { Request, Response, Application, NextFunction } from 'express'

const app: Application = express()
const port: Number = 3000

app.use('/health', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: true, statusCode: 200, data: { message: 'Server running' } })
})

app.listen(port, () => console.log('Server running'))
