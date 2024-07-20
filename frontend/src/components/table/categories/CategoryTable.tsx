import { useState } from "react";
import { useCreateCategory, useGetCategories } from "../../../api/CategoryApi";
import FormModal from "../../common/FormModal";
import { Button } from "../../ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import CategoryForm from "../../../forms/category-form/CategoryForm";
import WarningModal from "../../common/WarningModal";

export const CategoryTable = () => {
  const { categories, isLoading } = useGetCategories();
  const [openCategoryModal, setOpenCategoryModal] = useState<boolean>(false);
  const [categoryToRemove, setCategoryToRemove] = useState<Category | null>(
    null
  );
  const { createCategory, isLoading: isCreatingLoading } = useCreateCategory();

  const closeModal = () => {
    setOpenCategoryModal(false);
    setCategoryToRemove(null);
  };

  const handleRemoveCategory = (category) => {
    console.log("test");
    setCategoryToRemove(category);
    setOpenCategoryModal(true);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-5 flex justify-between">
        <h2 className="text-2xl font-bold">Category Lists</h2>
        <Button onClick={() => setOpenCategoryModal(true)}>
          Add New Category
        </Button>
      </div>
      <DataTable columns={columns(handleRemoveCategory)} data={categories} />
      <FormModal
        isOpen={openCategoryModal}
        closeModal={closeModal}
        title="Create New Catregory"
        children={
          categoryToRemove ? (
            <WarningModal warningMessage="Are you sure you want to remove this category" />
          ) : (
            <CategoryForm
              onSaveCategory={createCategory}
              isLoading={isCreatingLoading}
            />
          )
        }
      />
    </div>
  );
};
