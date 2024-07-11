import { Prisma, PrismaClient } from '@prisma/client'
import express, {Request, Response} from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
const port = 3000

app.get('/healthz', (req: Request, res: Response) => {
  res.send('I am alive!')
})

app.post(`/level`, async (req, res) => {
    const { title, description }: {title: string, description: string } = req.body
  
    const level = await prisma.level.create({
        data: {
            title,
            description
        }
    })
    res.json(level)
})

app.get(`/level`, async (req, res) => {
    const levels = await prisma.level.findMany()
    res.json(levels)
})

app.get(`/level/:id`, async (req, res) => {
    const { id }: { id?: string } = req.params
  
    const user = await prisma.level.findUnique({
      where: { id: Number(id) }
    })
    res.json(user)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})