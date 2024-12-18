import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DiscIcon as Discord, Twitter, Globe, Wallet, Mail, Trash2, Calendar, Edit, Plane } from 'lucide-react'

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

type ProjectCardProps = {
  project: Project
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
  onEdit: (project: Project) => void
}

export default function ProjectCard({ project, onDelete, onToggleComplete, onEdit }: ProjectCardProps) {
  return (
    <Card className={`overflow-hidden ${project.completed ? 'bg-green-100 dark:bg-green-900' : ''} flex flex-col h-full`}>
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            {project.createdAt.toLocaleDateString()}
          </div>
          <Badge variant={project.completed ? "default" : "secondary"}>
            {project.completed ? "Completed" : "In Progress"}
          </Badge>
        </div>
        <CardTitle>{project.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <ul className="space-y-2">
          {project.discordLink && (
            <li>
              <a href={project.discordLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline">
                <Discord size={16} />
                <span>Discord</span>
              </a>
            </li>
          )}
          {project.xLink && (
            <li>
              <a href={project.xLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline">
                <Twitter size={16} />
                <span>X (Twitter)</span>
              </a>
            </li>
          )}
          {project.website && (
            <li>
              <a href={project.website} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline">
                <Globe size={16} />
                <span>Website</span>
              </a>
            </li>
          )}
          {project.wallet && (
            <li className="flex items-center space-x-2">
              <Wallet size={16} />
              <span className="truncate">{project.wallet}</span>
            </li>
          )}
          {project.email && (
            <li className="flex items-center space-x-2">
              <Mail size={16} />
              <span>{project.email}</span>
            </li>
          )}
          <li className="flex items-center space-x-2">
            <Plane size={16} />
            <span>Airdrop: {project.airdropStatus}</span>
          </li>
          {project.airdropDate && (
            <li className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>Expected Airdrop: {project.airdropDate}</span>
            </li>
          )}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <Button variant="outline" onClick={() => onToggleComplete(project.id)}>
          {project.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onEdit(project)}>
            <Edit size={16} className="mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => onDelete(project.id)}>
            <Trash2 size={16} className="mr-2" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

