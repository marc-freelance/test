
import { useState, useEffect } from "react";
import { Check, Plus, Building, UserRound } from "lucide-react";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock client data - in a real app, this would come from an API or context
const mockClients = [
  { 
    id: "1", 
    name: "Acme Corp", 
    address: "123 Main St, New York, NY 10001",
    billingAddress: "123 Main St, New York, NY 10001",
    isBusiness: true,
    vat: "US123456789"
  },
  { 
    id: "2", 
    name: "Globex Industries", 
    address: "456 Tech Blvd, San Francisco, CA 94107",
    billingAddress: "456 Tech Blvd, San Francisco, CA 94107",
    isBusiness: true,
    vat: "EU987654321"
  },
  { 
    id: "3", 
    name: "TechStart Inc", 
    address: "789 Innovation Way, Boston, MA 02210",
    billingAddress: "PO Box 1234, Boston, MA 02211",
    isBusiness: true,
    vat: "TX12345ABC"
  },
  { 
    id: "4", 
    name: "Sarah Williams", 
    address: "101 Creative Ave, Austin, TX 78701",
    billingAddress: "101 Creative Ave, Austin, TX 78701",
    isBusiness: false,
    vat: ""
  },
];

interface ClientSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onAddNew: (name: string) => void;
}

export function ClientSelector({ value, onChange, onAddNew }: ClientSelectorProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  // Update the input value when the value prop changes
  useEffect(() => {
    if (value) {
      const selectedClient = mockClients.find(client => client.name === value);
      if (selectedClient) {
        setInputValue(selectedClient.name);
      } else {
        setInputValue(value);
      }
    } else {
      setInputValue("");
    }
  }, [value]);

  const handleSelectClient = (currentValue: string) => {
    if (currentValue && currentValue.trim() !== "") {
      onChange(currentValue);
      setOpen(false);
    }
  };

  const handleAddNew = () => {
    if (inputValue && inputValue.trim() !== "") {
      onAddNew(inputValue);
      setOpen(false);
    }
  };

  // Ensure we always have a valid array for filtering
  const filteredClients = inputValue && inputValue.trim() !== ""
    ? mockClients.filter(client => 
        client.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    : mockClients;

  // Check if input exactly matches an existing client name
  const existingClientNames = mockClients.map(client => client.name.toLowerCase());
  const isExactMatch = inputValue && inputValue.trim() !== ""
    ? existingClientNames.includes(inputValue.toLowerCase()) 
    : false;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || "Select client..."}
          <Check className={cn("ml-2 h-4 w-4", value ? "opacity-100" : "opacity-0")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput 
            placeholder="Search client..."
            value={inputValue || ""}
            onValueChange={(val) => setInputValue(val || "")}
          />
          <CommandEmpty>
            {inputValue && !isExactMatch ? (
              <div className="px-2 py-3 text-center">
                <p className="text-sm text-muted-foreground">No client found</p>
                <Button 
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={handleAddNew}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create "{inputValue}"
                </Button>
              </div>
            ) : (
              <p className="py-3 text-center text-sm text-muted-foreground">No client found</p>
            )}
          </CommandEmpty>
          <CommandGroup>
            {filteredClients.map((client) => (
              <CommandItem
                key={client.id}
                value={client.name}
                onSelect={handleSelectClient}
              >
                <div className="flex items-center">
                  {client.isBusiness ? (
                    <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                  ) : (
                    <UserRound className="mr-2 h-4 w-4 text-muted-foreground" />
                  )}
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === client.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {client.name}
                  {client.isBusiness && client.vat && (
                    <span className="ml-2 text-xs text-muted-foreground">VAT: {client.vat}</span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
