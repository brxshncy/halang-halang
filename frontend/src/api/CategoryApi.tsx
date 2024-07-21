import { useMutation, useQuery, useQueryClient } from "react-query";
import { API_BASE_URL } from "../constants/constant";
import { toast } from "sonner";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTYwZDVlODc2ZDkzOWFhMzdmYTg5NCIsImlhdCI6MTcyMTQwMzY1NiwiZXhwIjoxNzIzOTk1NjU2fQ.0lbBA1B8ea6APmTM5R8dXnHyL5I0Wog3q3cML_2pi7M";

const categoryAPi = `${API_BASE_URL}/api/category`;

export interface UpdateCategoryParams {
  categoryFormData: FormData;
  categoryId: string;
}

export type CreateCategoryParams = FormData;
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  const updateCategoryRequest = async ({
    categoryFormData,
    categoryId,
  }: UpdateCategoryParams) => {
    try {
      const response = await fetch(`${categoryAPi}/${categoryId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: categoryFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(String(error));
      }
    }
  };

  const { mutate: updateCategory, isLoading } = useMutation(
    updateCategoryRequest,
    {
      onSuccess: () => {
        toast.success("Category updated");
        queryClient.invalidateQueries("fetchCategories");
      },
      onError: (error) => {
        toast.error(error.toString());
      },
    }
  );

  return {
    updateCategory,
    isLoading,
  };
};
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const createCategoriesRequest = async (categoryFormData: FormData) => {
    try {
      const response = await fetch(categoryAPi, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type":
        },
        body: categoryFormData,
      });

      if (!response.ok) {
        toast.error("Fail to create new category");
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(String(error));
      }
    }
  };

  const { mutate: createCategory, isLoading } = useMutation(
    createCategoriesRequest,
    {
      onSuccess: () => {
        toast.success("Category deleted");
        queryClient.invalidateQueries("fetchCategories");
      },
      onError: (error) => {
        toast.error(error.toString());
      },
    }
  );

  return {
    createCategory,
    isLoading,
  };
};

export const useGetCategories = () => {
  const getCategories = async () => {
    try {
      const response = await fetch(categoryAPi, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Fail to fetch category");
      }

      return response.json();
    } catch (error) {
      throw new Error(error.message || "Fail to fetch category");
    }
  };

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery("fetchCategories", getCategories);

  if (error) {
    toast.error(error.toString());
  }

  return {
    categories,
    isLoading,
  };
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const deleteCategoryReq = async (categoryId: string) => {
    try {
      const response = await fetch(`${categoryAPi}/${categoryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "appl;ication/json",
        },
      });

      if (!response.ok) {
        throw new Error("Fail to delete category");
      }

      return response.json();
    } catch (error) {
      throw new Error(error.message || "Fail to delete category");
    }
  };

  const { mutate: deleteCategory } = useMutation(deleteCategoryReq, {
    onSuccess: () => {
      toast.success("Category deleted");
      queryClient.invalidateQueries("fetchCategories");
    },
    onError: (error) => {
      toast.error(error.toString());
    },
  });

  return {
    deleteCategory,
  };
};
