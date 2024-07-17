import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../../constants/constant";
import {
  BookOpen,
  LayoutDashboard,
  ListFilter,
  ShoppingCart,
} from "lucide-react";
import { cn } from "../../lib/utils";

const SideBar = () => {
  const renderIcon = (iconName: string) => {
    const icon: { [key: string]: JSX.Element } = {
      dashboard: <LayoutDashboard />,
      menu: <BookOpen />,
      "shopping-cart": <ShoppingCart />,
      filter: <ListFilter />,
    };

    return icon[iconName];
  };

  const location = useLocation();
  return (
    <div className="bg-light-1 w-fit rounded-lg max-sm:hidden lg:w-[264px] p-6 min-h-screen sticky top-0 left-0 flex flex-col gap-3">
      {navLinks.map((link) => {
        const isActive = location.pathname === link.route;
        console.log("ocation.pathname>", location.pathname);
        return (
          <Link
            to={link.route}
            key={link.label}
            className={cn(
              "bg-light-2 text-light-3 p-3 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-green-1 hover:text-white",
              { "bg-green-1 text-white": isActive }
            )}
          >
            {renderIcon(link.icon)}
            <p className="max-lg:hidden">{link.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;
