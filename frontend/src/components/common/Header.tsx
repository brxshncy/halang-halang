import { Beef, User } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-light-1 rounded-lg px-4 py-5 flex justify-between items-center">
      <Beef size={40} />
      <div className="flex items-center gap-3 font-bold">
        <User size={40} />
        <span className="cursor-pointer">Bruce Real</span>
      </div>
    </div>
  );
};

export default Header;
