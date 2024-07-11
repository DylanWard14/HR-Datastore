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

app.get(`/staffmember`, async (req, res) => {
    const limit = Number(req.query.limit ?? 100);
    const offset = Number(req.query.offset ?? 0);
    const count = await prisma.staffMember.count();
    const staffMembers = await prisma.staffMember.findMany({
        include: {
            level: true,
            office: true,
            skills: {
                select: {
                    skill: true
                },
            },
            position: {
                include: {
                    jobTitle: true,
                    team: true
                }
            }
        },
        skip: offset,
        take: limit,
    })
    res.json({count, data: staffMembers})
})

app.get(`/office`, async (req, res) => {
    const offices = await prisma.office.findMany()
    res.json(offices)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})