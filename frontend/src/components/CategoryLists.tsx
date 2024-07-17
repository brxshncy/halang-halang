import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "../lib/utils";

const CategoryLists = () => {
  const isActive = true;
  return (
    <div className="flex gap-10">
      <div className="w-12 h-12 flex flex-col gap-2">
        <div
          className={cn(
            "border rounded-lg  w-full h-full flex justify-center items-center  py-6",
            {
              "bg-green-1 text-white": isActive,
            }
          )}
        >
          <GalleryVerticalEnd size={18} />
        </div>
        <span className="text-xs font-bold w-24"> All Menu</span>
      </div>
      <div className="w-12 h-12 flex flex-col gap-2">
        <div className="border rounded-lg w-full h-full flex justify-center items-center  py-6">
          <GalleryVerticalEnd size={18} />
        </div>
        <span className="text-xs font-bold w-24"> Chicken</span>
      </div>
    </div>
  );
};

export default CategoryLists;
