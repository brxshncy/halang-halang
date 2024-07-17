import CategoryLists from "../components/CategoryLists";
import Filter from "../components/common/Filter";
import SearchInput from "../components/common/SearchInput";
import MenuLists from "../components/MenuLists";

const MenuPage = () => {
  return (
    <div className="flex flex-col py-6 px-4">
      <div className="flex justify-between items-center">
        <h4 className="font-bold">Categories</h4>
        <div className="flex items-center gap-3">
          <SearchInput />
          <Filter />
        </div>
      </div>
      <div className="flex flex-col">
        <CategoryLists />
        <MenuLists />
      </div>
    </div>
  );
};

export default MenuPage;
