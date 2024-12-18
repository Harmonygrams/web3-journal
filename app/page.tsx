import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

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
  onClose: () => void
  onSuccess: () => void
}

export default function ProjectFormModal({ project, onClose, onSuccess }: ProjectFormModalProps) {
  const [isLoading, setIsLoading] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const endpoint = project 
        ? `/api/projects/${project.id}` 
        : '/api/projects'
      
      const method = project ? 'PUT' : 'POST'

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          airdropDate: formData.airdropDate || null
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save project')
      }

      toast.success(project ? 'Project updated successfully' : 'Project created successfully')
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error saving project:', error)
      toast.error('Failed to save project. Please try again.')
    } finally {
      setIsLoading(false)
    }
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
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="discordLink">Discord Link</Label>
            <Input
              id="discordLink"
              name="discordLink"
              value={formData.discordLink}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="xLink">X Link</Label>
            <Input
              id="xLink"
              name="xLink"
              value={formData.xLink}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="wallet">Wallet</Label>
            <Input
              id="wallet"
              name="wallet"
              value={formData.wallet}
              onChange={handleChange}
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="airdropStatus">Airdrop Status</Label>
            <Select
              value={formData.airdropStatus}
              onValueChange={(value: AirdropStatus) => setFormData(prev => ({ ...prev, airdropStatus: value }))}
              disabled={isLoading}
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
                disabled={isLoading}
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
              disabled={isLoading}
            />
            <Label htmlFor="completed">Completed</Label>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {project ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>{project ? 'Update' : 'Add'} Project</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}