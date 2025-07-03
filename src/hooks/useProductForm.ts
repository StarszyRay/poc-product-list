import { useState } from "react";
import { Product } from "../types/dataTypes";
import { useAppDispatch } from "../store/hooks";
import { v4 as uuidv4 } from "uuid";

interface FormErrors {
  code: string;
  name: string;
  description: string;
  images: string;
}

export const useProductForm = (product?: Product) => {
  const [isEditOn, setIsEditOn] = useState(false);
  const [formValues, setFormValues] = useState({
    code: product?.code || "",
    name: product?.name || "",
    description: product?.description || "",
    images: product?.images || [],
  });
  const [errors, setErrors] = useState<FormErrors>({
    code: "",
    name: "",
    description: "",
    images: "",
  });
  const dispatch = useAppDispatch();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    dispatch({
      type: "products/updateProduct",
      payload: { ...product, ...formValues },
    });
    setIsEditOn(false);
  };

  const onFormValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const onFormImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    position: number,
    field: string
  ) => {
    const { value } = e.target;
    const newImages = [...(formValues?.images || [])];
    if (newImages[position]) {
      newImages[position] = { ...newImages[position], [field]: value };
    } else {
      newImages.push({
        id: newImages.length.toString(),
        url: "",
        name: "",
        [field]: value,
      });
    }
    setFormValues((prev) => ({ ...prev, images: newImages }));
    setErrors((prev) => ({ ...prev, images: "" }));
  };

  const addImage = () => {
    setFormValues((prev) => ({
      ...prev,
      images: [
        ...(prev?.images || []),
        {
          url: "",
          name: "",
          id: uuidv4(),
        },
      ],
    }));
  };

  const cancelEdit = () => {
    setIsEditOn(false);
    setErrors({
      code: "",
      name: "",
      description: "",
      images: "",
    });
    setFormValues({
      code: product?.code || "",
      name: product?.name || "",
      description: product?.description || "",
      images: product?.images || [],
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: "",
      code: "",
      description: "",
      images: "",
    };
    let isValid = true;
    if (!formValues.code.trim()) {
      newErrors.code = "Code is required";
      isValid = false;
    }
    if (!formValues.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formValues.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    formValues.images.forEach((image) => {
      if (!image.url.trim()) {
        newErrors.images = "One or more image is missing an URL";
        isValid = false;
      }
      if (!image.name.trim()) {
        newErrors.images = "One or more image is missing a name";
        isValid = false;
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const removeImage = (index: number) => {
    const newImages = formValues.images.filter((_, i) => i !== index);
    setFormValues((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  return {
    isEditOn,
    formValues,
    errors,
    onFormSubmit,
    onFormValueChange,
    onFormImageChange,
    addImage,
    cancelEdit,
    validateForm,
    removeImage,
    setIsEditOn,
  };
};
