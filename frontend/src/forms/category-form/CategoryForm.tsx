import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { ICategory } from "../../models/Category";

import LoadingButton from "../../components/common/LoadingButton";
import { useEffect } from "react";
import { AspectRatio } from "../../components/ui/aspect-ratio";
import { OnSaveType } from "../../components/table/categories/CategoryTable";

const categoryFormSchema = z
  .object({
    name: z.string({
      required_error: "Category name is required",
    }),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

export type CategoryFormData = z.infer<typeof categoryFormSchema>;

type Props = {
  onSaveCategory: OnSaveType;
  isLoading: boolean;
  closeModal: () => void;
  category: null | ICategory;
};

const CategoryForm = ({
  onSaveCategory,
  isLoading,
  closeModal,
  category,
}: Props) => {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
  });

  useEffect(() => {
    if (!category) return;
    form.reset(category);
  }, [form, category]);

  const onSubmit = (formDataJson: CategoryFormData) => {
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    if (formDataJson.imageFile) {
      formData.append(
        "imageFile",
        formDataJson.imageFile || form.watch("imageUrl")
      );
    }
    console.log(formDataJson);

    if (category) {
      onSaveCategory({ categoryFormData: formData, categoryId: category._id });
    } else {
      onSaveCategory(formData);
    }

    closeModal();
  };

  const existingImageUrl = form.watch("imageUrl");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        {existingImageUrl && (
          <div className="mt-10">
            <p className="font-bold text-sm mb-3">Choosen Image</p>
            <AspectRatio ratio={16 / 9}>
              <img
                src={existingImageUrl}
                alt="Existing Image"
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        )}
        <div className="space-y-2 mt-3">
          <FormField
            control={form.control}
            name="imageFile"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(event) => {
                        field.onChange(
                          event.target.files ? event.target.files[0] : null
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="flex items-end justify-end mt-3">
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit"> Submit</Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
