import Dock from "@/lightwind/Components/Dock";
import { GithubIcon, LinkedinIcon, XIcon } from "lucide-react";

export function Footer() {
  const items = [
    { icon: <GithubIcon size={18} />, label: 'Github', onClick: () =>  window.open("https://github.com/Chandrashekher1", "_blank") },
    { icon: <LinkedinIcon size={18} />, label: 'LinkedIn', onClick: () => window.open("https://www.linkedin.com/in/chandrashekher-prasad-a496a2293", "_blank") },
    { icon: <XIcon size={18} />, label: 'X', onClick: () => window.open("https://x.com/cpsaw03", "_blank") },
  ];

  return (
    <footer className="dark:bg-black dark:text-white  text-secondary py-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">© {new Date().getFullYear()} <span className="font-bold">Chandrashekher</span>. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <Dock 
            items={items}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />
            {/* <a href="https://github.com/Chandrashekher1"><GithubIcon/></a>
            <a href="www.linkedin.com/in/chandrashekher-prasad-a496a2293"><LinkedinIcon/></a>
            <a href="https://x.com/cpsaw03" className="b"><XIcon/></a> */}
        </div>
      </div>
    </footer>
  );
}