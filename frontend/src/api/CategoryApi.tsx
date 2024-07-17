import { useMutation, useQuery } from "react-query";
import { API_BASE_URL } from "../constants/constant";
import { toast } from "sonner";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTYwZDVlODc2ZDkzOWFhMzdmYTg5NCIsImlhdCI6MTcyMTE2NzMwMSwiZXhwIjoxNzIzNzU5MzAxfQ.irUS5yYKx0vlkki8cJX-LhCcUH6cHC-EQP_mRJhhN18";

export const useCreateCategory = () => {};

export const useGetCategories = () => {
  const getCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/category`, {
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
