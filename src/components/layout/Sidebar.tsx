
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  FileText, 
  Users, 
  Briefcase, 
  BarChart4, 
  Settings, 
  Menu, 
  X,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Invoices", path: "/invoices", icon: FileText },
  { name: "Clients", path: "/clients", icon: Users },
  { name: "Projects", path: "/projects", icon: Briefcase },
  { name: "Reports", path: "/reports", icon: BarChart4 },
  { name: "Settings", path: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Handle mobile sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
          className="bg-white shadow-md rounded-full"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white z-40 shadow-lg transition-all duration-300 flex flex-col",
          isCollapsed ? "w-20" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Mobile close button */}
        <div className="lg:hidden absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Logo and collapse toggle */}
        <div className={cn(
          "flex items-center p-4 border-b",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && (
            <Link to="/" className="flex items-center space-x-2 font-bold text-xl animate-fade-in">
              <FileText className="h-6 w-6 text-primary" />
              <span>InvoiceHub</span>
            </Link>
          )}

          {isCollapsed && (
            <Link to="/" className="flex justify-center animate-fade-in">
              <FileText className="h-6 w-6 text-primary" />
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto pt-5 scrollbar-none">
          <ul className="space-y-2 px-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={cn(
                    "flex items-center py-3 px-4 rounded-md transition-all",
                    "hover:bg-secondary group",
                    location.pathname === item.path 
                      ? "bg-primary text-white hover:bg-primary/90" 
                      : "text-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5", 
                    location.pathname === item.path 
                      ? "text-white" 
                      : "text-foreground group-hover:text-primary"
                  )} />
                  
                  {!isCollapsed && (
                    <span className="ml-3 text-sm font-medium">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile */}
        <div className={cn(
          "border-t p-4",
          isCollapsed ? "text-center" : ""
        )}>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Alex Johnson</p>
                <p className="text-xs text-muted-foreground truncate">alex@example.com</p>
              </div>
            )}
          </div>
          
          {!isCollapsed && (
            <Button variant="ghost" size="sm" className="w-full mt-3 text-sm justify-start">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          )}
        </div>
      </aside>
    </>
  );
};
