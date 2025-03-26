
import { useState } from "react";
import { 
  ArrowUpRight, 
  Clock, 
  MoreHorizontal, 
  PlusCircle, 
  Search, 
  Trash, 
  X
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Mock data
const projects = [
  {
    id: "project-1",
    name: "Website Redesign",
    client: "Acme Corp",
    startDate: "2023-09-15",
    dueDate: "2023-11-30",
    status: "in-progress",
    progress: 65,
    budget: 8000,
    invoiced: 5200,
  },
  {
    id: "project-2",
    name: "Mobile App Development",
    client: "TechStart Inc",
    startDate: "2023-08-01",
    dueDate: "2023-12-15",
    status: "in-progress",
    progress: 40,
    budget: 12000,
    invoiced: 4800,
  },
  {
    id: "project-3",
    name: "Brand Identity",
    client: "Design Partners",
    startDate: "2023-10-05",
    dueDate: "2023-11-15",
    status: "completed",
    progress: 100,
    budget: 5500,
    invoiced: 5500,
  },
  {
    id: "project-4",
    name: "Marketing Campaign",
    client: "Globex Industries",
    startDate: "2023-10-20",
    dueDate: "2024-01-20",
    status: "not-started",
    progress: 0,
    budget: 7500,
    invoiced: 0,
  },
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter projects based on search term and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      project.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Helper for status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "not-started":
        return "Not Started";
      default:
        return status;
    }
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold animate-fade-in">Projects</h1>
            <p className="text-muted-foreground animate-fade-in delay-100">Track and manage your client projects</p>
          </div>
          
          <Button className="animate-fade-in sm:self-end">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden animate-fade-up">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search projects..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div 
                  key={project.id}
                  className="rounded-lg border border-border hover:border-primary/30 transition-colors p-6 interactive-card"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        project.status === "completed" 
                          ? "bg-green-100 text-green-800"
                          : project.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {getStatusLabel(project.status)}
                      </span>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Project</DropdownMenuItem>
                          <DropdownMenuItem>Create Invoice</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="font-medium">${project.invoiced.toLocaleString()}</span>
                      <span className="text-muted-foreground"> / ${project.budget.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <Button variant="outline" size="sm" className="w-full">
                      View Project
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 flex flex-col items-center justify-center">
                <X className="h-12 w-12 text-muted-foreground/40 mb-3" />
                <p className="text-lg text-muted-foreground font-medium">No projects found</p>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== "all" ? 
                    "Try adjusting your search or filter" : 
                    "Create your first project to get started"}
                </p>
                {!(searchTerm || statusFilter !== "all") && (
                  <Button className="mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Projects;
