import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="flex items-center border px-3 py-2 rounded-lg gap-2 max-w-[200px]  hover:border-green-1">
      <Search />
      <input
        type="text"
        placeholder="Search menu"
        className="appearance-none border-none focus:outline-none w-full text-gray-700 placeholder-gray-500"
      />
    </div>
  );
};

export default SearchInput;
