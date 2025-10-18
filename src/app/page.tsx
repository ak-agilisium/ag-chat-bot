
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      <h1>Welcome to India</h1>
    </div>
  );
}
