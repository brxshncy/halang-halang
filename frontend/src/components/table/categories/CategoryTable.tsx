import { useGetCategories } from "../../../api/CategoryApi";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const CategoryTable = () => {
  const { categories } = useGetCategories();

  console.log("categories>", categories);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={categories} />
    </div>
  );
};
