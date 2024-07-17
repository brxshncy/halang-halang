import { CircleMinus, CirclePlus } from "lucide-react";

const MenuLists = () => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {Array(8)
        .fill()
        .map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <img
              src="https://www.mochimommy.com/wp-content/uploads/2023/09/IMG_3198.jpeg"
              alt="Chicken Katsu"
              className="object-cover rounded-lg h-[250px] w-full"
            />
            <p className="text-sm font-bold">Crispy Calamari</p>
            <p className="text-sm text-light-3">Appetizer</p>
            <div className="flex justify-between items-center">
              <p className="font-bold text-sm">$22.90</p>
              <div className="flex gap-4 items-center bg-light-2 border rounded-full py-0.5 px-2">
                <CirclePlus size={20} className="cursor-pointer" />
                <span>0</span>
                <CircleMinus size={20} className="cursor-pointer" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MenuLists;
