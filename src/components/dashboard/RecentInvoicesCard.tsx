
import { ArrowRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

// Mock data
const recentInvoices = [
  { 
    id: "INV-2023-001", 
    client: "Acme Corp", 
    amount: "$3,200.00", 
    status: "Paid", 
    date: "2023-10-15" 
  },
  { 
    id: "INV-2023-002", 
    client: "Globex Industries", 
    amount: "$1,800.00", 
    status: "Due", 
    date: "2023-10-24" 
  },
  { 
    id: "INV-2023-003", 
    client: "TechStart Inc", 
    amount: "$5,400.00", 
    status: "Overdue", 
    date: "2023-10-08" 
  },
  { 
    id: "INV-2023-004", 
    client: "Design Partners", 
    amount: "$2,100.00", 
    status: "Draft", 
    date: "2023-10-20" 
  },
];

export const RecentInvoicesCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden animate-fade-up delay-100">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h3 className="font-semibold">Recent Invoices</h3>
        <Link to="/invoices">
          <Button variant="ghost" size="sm" className="text-sm">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/30">
              <th className="text-xs font-medium text-muted-foreground text-left px-6 py-3">Invoice</th>
              <th className="text-xs font-medium text-muted-foreground text-left px-6 py-3">Client</th>
              <th className="text-xs font-medium text-muted-foreground text-left px-6 py-3">Amount</th>
              <th className="text-xs font-medium text-muted-foreground text-left px-6 py-3">Status</th>
              <th className="text-xs font-medium text-muted-foreground text-left px-6 py-3">Date</th>
              <th className="text-xs font-medium text-muted-foreground text-left px-6 py-3 sr-only">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-b last:border-b-0 hover:bg-muted/10 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {invoice.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {invoice.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {invoice.amount}
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
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Download PDF</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
