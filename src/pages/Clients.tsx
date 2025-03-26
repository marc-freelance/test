
import { useState } from "react";
import { 
  Mail, 
  MoreHorizontal, 
  Phone, 
  PlusCircle, 
  Search, 
  Trash, 
  UserRound, 
  X 
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Mock data
const clients = [
  {
    id: "client-1",
    name: "Acme Corp",
    contactName: "John Smith",
    email: "john@acmecorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, Suite 100, San Francisco, CA 94107",
    invoices: 5,
    totalBilled: 12500,
  },
  {
    id: "client-2",
    name: "Globex Industries",
    contactName: "Jane Doe",
    email: "jane@globex.com",
    phone: "+1 (555) 234-5678",
    address: "456 Corporate Blvd, New York, NY 10001",
    invoices: 3,
    totalBilled: 8400,
  },
  {
    id: "client-3",
    name: "TechStart Inc",
    contactName: "Mike Johnson",
    email: "mike@techstart.com",
    phone: "+1 (555) 345-6789",
    address: "789 Innovation Dr, Austin, TX 78701",
    invoices: 7,
    totalBilled: 15600,
  },
  {
    id: "client-4",
    name: "Design Partners",
    contactName: "Sarah Williams",
    email: "sarah@designpartners.com",
    phone: "+1 (555) 456-7890",
    address: "321 Creative Way, Portland, OR 97204",
    invoices: 4,
    totalBilled: 9200,
  },
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter clients based on search term
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold animate-fade-in">Clients</h1>
            <p className="text-muted-foreground animate-fade-in delay-100">Manage your client relationships</p>
          </div>
          
          <Button className="animate-fade-in sm:self-end">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden animate-fade-up">
          <div className="p-6 border-b">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search clients..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <div 
                  key={client.id}
                  className="rounded-lg border border-border hover:border-primary/30 transition-colors p-6 interactive-card"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <UserRound className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{client.name}</h3>
                        <p className="text-sm text-muted-foreground">{client.contactName}</p>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Client</DropdownMenuItem>
                        <DropdownMenuItem>New Invoice</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Client
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{client.phone}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border/50 flex justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Invoices</p>
                      <p className="font-medium">{client.invoices}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Total Billed</p>
                      <p className="font-medium">${client.totalBilled.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 flex flex-col items-center justify-center">
                <X className="h-12 w-12 text-muted-foreground/40 mb-3" />
                <p className="text-lg text-muted-foreground font-medium">No clients found</p>
                <p className="text-muted-foreground">Add your first client to get started</p>
                <Button className="mt-4">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Client
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Clients;
