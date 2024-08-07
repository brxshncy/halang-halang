import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { Pencil, Trash } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  _id: string;
  name: string;
  imageUrl: string;
};

export const columns: (
  onRemoveCategory: (category: Category) => void,
  handleEditCategory: (category: Category) => void
) => ColumnDef<Category>[] = (onRemoveCategory, handleEditCategory) => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div>
          <img
            src={row.getValue("imageUrl")}
            className="w-10 h-10 object-cover"
            alt={"Category Logo"}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Action",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleEditCategory(category)}
            className="flex gap-2 bg-blue-500 text-white border-none hover:bg-blue-600 hover:text-white"
          >
            <Pencil size={18} />
            <span>Edit</span>
          </Button>
          <Button
            variant="outline"
            className="flex gap-2 bg-red-600 text-white border-none hover:bg-red-700 hover:text-white"
            onClick={() => onRemoveCategory(category)}
          >
            <Trash size={18} />
            <span>Remove</span>
          </Button>
        </div>
      );
    },
  },
];
