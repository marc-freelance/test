
import { useState, useEffect } from "react";
import { Bell, Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme (placeholder)
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className={`
      fixed top-0 right-0 left-0 lg:left-64 transition-all duration-300 z-30
      ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}
    `}>
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-semibold animate-fade-in">InvoiceHub</h1>
        
        <div className="hidden md:flex items-center mx-4 flex-1 max-w-md relative">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search invoices, clients..." 
            className="pl-10 bg-muted/50 border-0 focus-visible:ring-primary"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="animate-fade-in">
            <Search className="h-5 w-5 md:hidden" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="animate-fade-in"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative animate-fade-in">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="py-3 cursor-pointer">
                  <div>
                    <p className="font-medium">New payment received</p>
                    <p className="text-sm text-muted-foreground">Client ABC paid invoice #1234</p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-3 cursor-pointer">
                  <div>
                    <p className="font-medium">Invoice overdue</p>
                    <p className="text-sm text-muted-foreground">Invoice #5678 for Client XYZ is overdue</p>
                    <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
