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

import LoadingButton from "../../components/common/LoadingButton";

const categoryFormSchema = z.object({
  name: z.string({
    required_error: "Category name is required",
  }),
  imageFile: z.instanceof(File, { message: "Image is required" }),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;

type Props = {
  onSaveCategory: (categoryFormData: FormData) => void;
  isLoading: boolean;
};

const CategoryForm = ({ onSaveCategory, isLoading }: Props) => {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
  });

  const onSubmit = (formDataJson: CategoryFormData) => {
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    formData.append("imageFile", formDataJson.imageFile);

    onSaveCategory(formData);
  };

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
