// pages/api/projects/[id].ts
import { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import { connectDB } from '@/lib/mongodb'

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discordLink: String,
  xLink: String,
  website: String,
  wallet: String,
  email: String,
  completed: { type: Boolean, default: false },
  airdropStatus: {
    type: String,
    enum: ['Not Airdropped', 'Airdropped', 'Scheduled'],
    default: 'Not Airdropped'
  },
  airdropDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
})

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()

  const { method } = req
  const { id } = req.query

  switch (method) {
    case 'GET':
      try {
        const project = await Project.findById(id)
        if (!project) {
          return res.status(404).json({ success: false, error: 'Project not found' })
        }
        res.status(200).json({ success: true, data: project })
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break

    case 'PUT':
      try {
        const project = await Project.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!project) {
          return res.status(404).json({ success: false, error: 'Project not found' })
        }
        res.status(200).json({ success: true, data: project })
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break

    case 'DELETE':
      try {
        const project = await Project.deleteOne({ _id: id })
        if (!project) {
          return res.status(404).json({ success: false, error: 'Project not found' })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break

    default:
      res.status(405).json({ success: false, error: `Method ${method} Not Allowed` })
  }
}

// pages/api/projects/index.ts
import { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import { connectDB } from '@/lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()

  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const projects = await Project.find({})
        res.status(200).json({ success: true, data: projects })
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break

    case 'POST':
      try {
        const project = await Project.create(req.body)
        res.status(201).json({ success: true, data: project })
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break

    default:
      res.status(405).json({ success: false, error: `Method ${method} Not Allowed` })
  }
}