import { GithubIcon, LinkedinIcon, XIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="dark:bg-secondary bg-secondary-foreground dark:text-white  text-secondary py-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">© {new Date().getFullYear()} <span className="font-bold">Chandrashekher</span>. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
            <a href="https://github.com/Chandrashekher1"><GithubIcon/></a>
            <a href="www.linkedin.com/in/chandrashekher-prasad-a496a2293"><LinkedinIcon/></a>
            <a href="https://x.com/cpsaw03" className="b"><XIcon/></a>
        </div>
      </div>
    </footer>
  );
}