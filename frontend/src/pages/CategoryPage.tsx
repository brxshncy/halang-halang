import {
  useCreateCategory,
  useDeleteCategory,
  useGetCategories,
  useUpdateCategory,
} from "../api/CategoryApi";
import { CategoryTable } from "../components/table/categories/CategoryTable";

const CategoryPage = () => {
  const { categories, isLoading } = useGetCategories();
  const { createCategory, isLoading: isCreatingLoading } = useCreateCategory();
  const { deleteCategory } = useDeleteCategory();
  const { updateCategory, isLoading: isUpdateLoading } = useUpdateCategory();
  const isEditing = !!categories;

  return (
    <CategoryTable
      categories={categories}
      onSave={isEditing ? updateCategory : createCategory}
      deleteCategory={deleteCategory}
      loading={isLoading || isCreatingLoading || isUpdateLoading}
    />
  );
};

export default CategoryPage;
