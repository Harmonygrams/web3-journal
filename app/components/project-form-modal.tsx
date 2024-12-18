import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast, { Toaster } from 'react-hot-toast';

type AirdropStatus = 'Not Airdropped' | 'Airdropped' | 'Scheduled';

type Project = {
  id: string
  name: string
  discordLink: string
  xLink: string
  website: string
  wallet: string
  email: string
  completed: boolean
  createdAt: Date
  airdropStatus: AirdropStatus
  airdropDate: string | null
}

type ProjectFormModalProps = {
  project?: Project | null
  onSubmit: (project: Omit<Project, 'id' | 'createdAt'>) => void
  onClose: () => void
}

export default function ProjectFormModal({ project, onSubmit, onClose }: ProjectFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    discordLink: '',
    xLink: '',
    website: '',
    wallet: '',
    email: '',
    completed: false,
    airdropStatus: 'Not Airdropped' as AirdropStatus,
    airdropDate: ''
  })

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        discordLink: project.discordLink,
        xLink: project.xLink,
        website: project.website,
        wallet: project.wallet,
        email: project.email,
        completed: project.completed,
        airdropStatus: project.airdropStatus,
        airdropDate: project.airdropDate || ''
      })
    }
  }, [project])
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      airdropDate: formData.airdropDate || null
    })
    toast('Project updated')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add New Project'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="discordLink">Discord Link</Label>
            <Input
              id="discordLink"
              name="discordLink"
              value={formData.discordLink}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="xLink">X Link</Label>
            <Input
              id="xLink"
              name="xLink"
              value={formData.xLink}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="wallet">Wallet</Label>
            <Input
              id="wallet"
              name="wallet"
              value={formData.wallet}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="airdropStatus">Airdrop Status</Label>
            <Select
              value={formData.airdropStatus}
              onValueChange={(value: AirdropStatus) => setFormData(prev => ({ ...prev, airdropStatus: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select airdrop status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Not Airdropped">Not Airdropped</SelectItem>
                <SelectItem value="Airdropped">Airdropped</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {formData.airdropStatus === 'Scheduled' && (
            <div>
              <Label htmlFor="airdropDate">Expected Airdrop Date</Label>
              <Input
                id="airdropDate"
                name="airdropDate"
                type="date"
                value={formData.airdropDate}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="completed"
              name="completed"
              checked={formData.completed}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, completed: checked === true }))
              }
            />
            <Label htmlFor="completed">Completed</Label>
          </div>
          <DialogFooter>
            <Button type="submit">{project ? 'Update' : 'Add'} Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

