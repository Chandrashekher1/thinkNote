import { GithubIcon, LinkedinIcon, XIcon } from "lucide-react";

export function Footer() {

  return (
    <footer className="dark:bg-black dark:text-white  text-secondary py-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">© {new Date().getFullYear()} <span className="font-bold">Chandrashekher</span></p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://github.com/Chandrashekher1" className="hover:-translate-y-1 duration-300"><GithubIcon/></a>
          <a href="https://www.linkedin.com/in/chandrashekher-prasad-a496a2293" className="hover:-translate-y-1 duration-300"><LinkedinIcon/></a>
          <a href="https://x.com/cpsaw03" className="hover:-translate-y-1 duration-300"><XIcon/></a>
        </div>
      </div>
    </footer>
  );
}