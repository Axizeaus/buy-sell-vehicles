import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/themeProvider.tsx";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center mr-4 space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme("light")}
        className={`relative group ${
          theme === "light" ? "bg-gray-200 border-gray-400" : ""
        }`}
      >
        <Sun
          className={`h-[1.5rem] w-[1.5rem] transition-all duration-300 ease-in-out ${
            theme === "light" ? "text-gray-900" : "text-gray-500 opacity-50"
          }`}
        />
        <span className="sr-only">Light Mode</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme("dark")}
        className={`relative group ${
          theme === "dark" ? "bg-gray-700 border-gray-500" : ""
        }`}
      >
        <Moon
          className={`h-[1.5rem] w-[1.5rem] transition-all duration-300 ease-in-out ${
            theme === "dark" ? "text-gray-100" : "text-gray-500 opacity-50"
          }`}
        />
        <span className="sr-only">Dark Mode</span>
      </Button>
    </div>
  );
}
