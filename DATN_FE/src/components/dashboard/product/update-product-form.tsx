"use client";

import { updateProduct } from "@/action/productAction";
import InputField from "@/components/ui/input";
import SelectField from "@/components/ui/select";
import { useCustomActionState } from "@/lib/custom/customHook";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import slugify from "slugify";

interface IProps {
  product: IProduct;
  categorySelect: ICategorySelect[];
}

const UpdateProductForm = ({ product, categorySelect }: IProps) => {
  const router = useRouter();

  const initialState: FormState = { errors: [] };
  const [formState, formAction] = useCustomActionState<FormState>(
    updateProduct,
    initialState
  );
  const [formData, setFormData] = useState<IProduct>(product);

  const [toastDisplayed, setToastDisplayed] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formAction(formData);
    setToastDisplayed(false); // Đặt lại toastDisplayed khi đang submit
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (e.target instanceof HTMLInputElement && name === "title") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        slug: slugify(value, { lower: true }),
      }));
    }
  };

  useEffect(() => {
    if (formState.errors.length > 0 && !toastDisplayed) {
      toast.error("Cập nhật sản phẩm thất bại");
      setToastDisplayed(true); // Đặt toastDisplayed là true để tránh hiển thị nhiều toast
    }
    if (formState.success) {
      toast.success("Đã cập nhật sản phẩm thành công!");
      router.push("/dashboard/products");
    }
  }, [formState, toastDisplayed]);

  return (
    <form onSubmit={handleSubmit} className="px-4 w-full">
      <input type="hidden" name="id" value={product.id} />
      <input type="hidden" name="imageUrl" value={product.imageUrl} />
      <InputField
        label="Tiêu đề"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <label
        htmlFor="description"
        className="block mb-2 text-sm font-medium text-white"
      >
        Mô tả
      </label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        rows={10}
        onChange={handleChange}
        className="text-sm rounded-lg w-full p-2.5 bg-gray-600 placeholder-gray-400 text-white"
        required
      />
      <InputField
        label="Tiêu đề SEO"
        id="seoTitle"
        name="seoTitle"
        value={formData.seoTitle}
        onChange={handleChange}
        required
      />
      <InputField
        label="Mô tả SEO"
        id="seoDescription"
        name="seoDescription"
        value={formData.seoDescription}
        onChange={handleChange}
        required
      />
      <InputField
        label="Từ khóa SEO"
        id="seoKeyworks"
        name="seoKeyworks"
        value={formData.seoKeyworks}
        onChange={handleChange}
        required
      />
      <InputField
        label="Slug"
        id="slug"
        name="slug"
        value={formData.slug}
        onChange={handleChange}
        readonly
      />
      <label
        htmlFor="categoryId"
        className="block mb-2 text-sm font-medium text-white"
      >
        Danh mục
      </label>
      <select
        name="categoryId"
        id="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
        className="text-sm rounded-lg w-full p-2.5 bg-gray-600 placeholder-gray-400 text-white"
      >
        {categorySelect?.map((category: ICategorySelect, index) => (
          <option key={index} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>
      <SelectField
        label="Trạng thái"
        id="isActive"
        name="isActive"
        value={formData.isActive.toString()}
        onChange={handleChange}
        options={[
          { label: "Hoạt động", value: "true" },
          { label: "Ngưng hoạt động", value: "false" },
        ]}
      />
      {formState.errors.length > 0 && (
        <ul>
          {formState.errors.map((error, index) => (
            <li className="text-red-400" key={index}>
              {error}
            </li>
          ))}
        </ul>
      )}
      <button
        type="submit"
        className="float-right mt-4 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Cập nhật
      </button>
    </form>
  );
};

export default UpdateProductForm;
