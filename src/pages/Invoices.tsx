
import { useState } from "react";
import { 
  ArrowDown, 
  ArrowUp, 
  Check, 
  Download, 
  FileText, 
  MoreHorizontal, 
  PlusCircle, 
  Search, 
  Trash, 
  X 
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewInvoiceForm } from "@/components/invoices/NewInvoiceForm";

// Mock data
const invoices = [
  { 
    id: "INV-2023-001", 
    client: "Acme Corp", 
    amount: 3200, 
    status: "Paid", 
    date: "2023-10-15",
    dueDate: "2023-10-30",
  },
  { 
    id: "INV-2023-002", 
    client: "Globex Industries", 
    amount: 1800, 
    status: "Due", 
    date: "2023-10-24",
    dueDate: "2023-11-07",
  },
  { 
    id: "INV-2023-003", 
    client: "TechStart Inc", 
    amount: 5400, 
    status: "Overdue", 
    date: "2023-10-08",
    dueDate: "2023-10-22",
  },
  { 
    id: "INV-2023-004", 
    client: "Design Partners", 
    amount: 2100, 
    status: "Draft", 
    date: "2023-10-20",
    dueDate: "2023-11-03",
  },
  { 
    id: "INV-2023-005", 
    client: "Acme Corp", 
    amount: 2400, 
    status: "Due", 
    date: "2023-10-21",
    dueDate: "2023-11-05",
  },
  { 
    id: "INV-2023-006", 
    client: "TechStart Inc", 
    amount: 1800, 
    status: "Due", 
    date: "2023-10-25",
    dueDate: "2023-11-08",
  },
  { 
    id: "INV-2023-007", 
    client: "Design Partners", 
    amount: 3600, 
    status: "Draft", 
    date: "2023-10-30",
    dueDate: "2023-11-15",
  },
];

type SortField = "id" | "client" | "amount" | "date" | "dueDate";
type SortDirection = "asc" | "desc";

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter invoices based on search term and status
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      invoice.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Sort invoices
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    if (sortField === "amount") {
      return sortDirection === "asc" 
        ? a.amount - b.amount 
        : b.amount - a.amount;
    } else {
      const aValue = a[sortField].toString();
      const bValue = b[sortField].toString();
      
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
  });

  // Toggle sort direction
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold animate-fade-in">Invoices</h1>
            <p className="text-muted-foreground animate-fade-in delay-100">Manage and track all your invoices</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="animate-fade-in sm:self-end">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <NewInvoiceForm onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden animate-fade-up">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search invoices..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="due">Due</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30">
                  <th 
                    className="text-xs font-medium text-muted-foreground text-left px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center">
                      Invoice
                      {sortField === "id" && (
                        sortDirection === "asc" 
                          ? <ArrowUp className="ml-1 h-3 w-3" /> 
                          : <ArrowDown className="ml-1 h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-xs font-medium text-muted-foreground text-left px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("client")}
                  >
                    <div className="flex items-center">
                      Client
                      {sortField === "client" && (
                        sortDirection === "asc" 
                          ? <ArrowUp className="ml-1 h-3 w-3" /> 
                          : <ArrowDown className="ml-1 h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-xs font-medium text-muted-foreground text-left px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("amount")}
                  >
                    <div className="flex items-center">
                      Amount
                      {sortField === "amount" && (
                        sortDirection === "asc" 
                          ? <ArrowUp className="ml-1 h-3 w-3" /> 
                          : <ArrowDown className="ml-1 h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th className="text-xs font-medium text-muted-foreground text-left px-6 py-3">Status</th>
                  <th 
                    className="text-xs font-medium text-muted-foreground text-left px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center">
                      Issue Date
                      {sortField === "date" && (
                        sortDirection === "asc" 
                          ? <ArrowUp className="ml-1 h-3 w-3" /> 
                          : <ArrowDown className="ml-1 h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-xs font-medium text-muted-foreground text-left px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("dueDate")}
                  >
                    <div className="flex items-center">
                      Due Date
                      {sortField === "dueDate" && (
                        sortDirection === "asc" 
                          ? <ArrowUp className="ml-1 h-3 w-3" /> 
                          : <ArrowDown className="ml-1 h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th className="text-xs font-medium text-muted-foreground text-left px-6 py-3 sr-only">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedInvoices.length > 0 ? (
                  sortedInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b last:border-b-0 hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{invoice.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {invoice.client}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        ${invoice.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          invoice.status === "Paid" 
                            ? "bg-green-100 text-green-800"
                            : invoice.status === "Due"
                            ? "bg-yellow-100 text-yellow-800"
                            : invoice.status === "Overdue"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {invoice.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {invoice.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Check className="mr-2 h-4 w-4" />
                              Mark as Paid
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center">
                        <X className="h-10 w-10 text-muted-foreground/40 mb-2" />
                        <p className="text-muted-foreground font-medium">No invoices found</p>
                        {searchTerm || statusFilter !== "all" ? (
                          <p className="text-sm text-muted-foreground">Try adjusting your search or filter</p>
                        ) : (
                          <p className="text-sm text-muted-foreground">Create your first invoice to get started</p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Invoices;
