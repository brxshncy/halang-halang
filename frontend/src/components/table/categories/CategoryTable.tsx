import { useState } from "react";

import FormModal from "../../common/FormModal";
import { Button } from "../../ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import CategoryForm from "../../../forms/category-form/CategoryForm";
import WarningModal from "../../common/WarningModal";
import { ICategory } from "../../../models/Category";
import {
  CreateCategoryParams,
  UpdateCategoryParams,
} from "../../../api/CategoryApi";

export type OnSaveType = (
  params: UpdateCategoryParams | CreateCategoryParams
) => void;

type Props = {
  categories: ICategory[];
  onSave: OnSaveType;
  deleteCategory: (categoryId: string) => void;
  loading: boolean;
};

export const CategoryTable = ({
  categories,
  onSave,
  deleteCategory,
  loading,
}: Props) => {
  const [openCategoryModal, setOpenCategoryModal] = useState<boolean>(false);
  const [categoryToRemove, setCategoryToRemove] = useState<ICategory | null>(
    null
  );

  const [categoryToEdit, setCategoryToEdit] = useState<ICategory | null>(null);

  const closeModal = () => {
    setOpenCategoryModal(false);
    setCategoryToRemove(null);
  };

  const handleRemoveCategory = (category: ICategory) => {
    setCategoryToRemove(category);
    setOpenCategoryModal(true);
  };

  const handleEditCategory = (category: ICategory) => {
    setCategoryToEdit(category);
    setOpenCategoryModal(true);
  };

  const handleDelete = () => {
    if (categoryToRemove) {
      deleteCategory(categoryToRemove._id);
      closeModal();
    }
  };

  if (loading) {
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
      <DataTable
        columns={columns(handleRemoveCategory, handleEditCategory)}
        data={categories}
      />
      <FormModal
        isOpen={openCategoryModal}
        closeModal={closeModal}
        containerClassName={
          categoryToRemove ? "max-w-[400px] w-full px-6 pt-9 pb-5" : ""
        }
        title={categoryToRemove ? "Delete Category" : "Create New Catregory"}
        children={
          categoryToRemove ? (
            <WarningModal
              warningMessage="Are you sure you want to remove this category?"
              handleDelete={handleDelete}
              onCancel={closeModal}
            />
          ) : (
            <CategoryForm
              onSaveCategory={onSave}
              isLoading={loading}
              closeModal={closeModal}
              category={categoryToEdit}
            />
          )
        }
      />
    </div>
  );
};
