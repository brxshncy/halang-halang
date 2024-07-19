import { useEffect, useState } from "react";
import { useCreateCategory, useGetCategories } from "../../../api/CategoryApi";
import FormModal from "../../common/FormModal";
import { Button } from "../../ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import CategoryForm from "../../../forms/category-form/CategoryForm";

export const CategoryTable = () => {
  const { categories, isLoading } = useGetCategories();
  const [openCategoryModal, setOpenCategoryModal] = useState<boolean>(false);
  const { createCategory, isLoading: isCreatingLoading } = useCreateCategory();

  const closeModal = () => {
    setOpenCategoryModal(false);
  };

  if (isLoading) {
    return null;
  }

  useEffect(() => {
    console.log("isreRender");
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-5 flex justify-between">
        <h2 className="text-2xl font-bold">Category Lists</h2>
        <Button onClick={() => setOpenCategoryModal(true)}>
          Add New Category
        </Button>
      </div>
      <DataTable columns={columns} data={categories} />
      <FormModal
        isOpen={openCategoryModal}
        closeModal={closeModal}
        title="Create New Catregory"
        children={
          <CategoryForm
            onSaveCategory={createCategory}
            isLoading={isCreatingLoading}
          />
        }
      />
    </div>
  );
};
