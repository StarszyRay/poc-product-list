import { renderHook, act } from "@testing-library/react";
import { useProductForm } from "./useProductForm";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { renderHookWithProviders } from "../utils/test-utils";
import { Product } from "../types/dataTypes";

const defaultInitialValues = {
  code: "",
  name: "",
  description: "",
  images: [],
};

const defaultInitialErrors = {
  code: "",
  name: "",
  description: "",
  images: "",
};

const productMock = {
  id: "1",
  code: "testCode",
  name: "Test Product",
  description: "Test Description",
  images: [
    { id: "1", url: "http://example.com/image1.jpg", name: "Image 1" },
    { id: "2", url: "http://example.com/image2.jpg", name: "Image 2" },
  ],
};
const { id, ...productFormValuesMock } = productMock;

describe("useProductForm", () => {
  it("should initialize with default values", () => {
    const { result } = renderHookWithProviders(() => useProductForm());
    expect(result.current.formValues).toEqual(defaultInitialValues);
    expect(result.current.errors).toEqual(defaultInitialErrors);
    expect(result.current.isEditOn).toEqual(false);
    expect(typeof result.current.onFormValueChange).toBe("function");
    expect(typeof result.current.onFormImageChange).toBe("function");
    expect(typeof result.current.onFormSubmit).toBe("function");
    expect(typeof result.current.cancelEdit).toBe("function");
    expect(typeof result.current.addImage).toBe("function");
    expect(typeof result.current.removeImage).toBe("function");
    expect(typeof result.current.setIsEditOn).toBe("function");
    expect(typeof result.current.validateForm).toBe("function");
  });

  it("correctly populates formValues with product data", () => {
    const { result } = renderHookWithProviders(() =>
      useProductForm(productMock)
    );
    expect(result.current.formValues).toEqual(productFormValuesMock);
  });

  it("should change only single value and keep all previous values on onFormValueChange", () => {
    const { result } = renderHookWithProviders(() =>
      useProductForm(productMock)
    );
    act(() => {
      result.current.onFormValueChange({
        target: { id: "name", value: "Product 1" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.formValues.name).toBe("Product 1");
    expect(result.current.formValues.code).toBe("testCode");
    expect(result.current.formValues.description).toBe("Test Description");
    expect(result.current.formValues.images).toEqual(productMock.images);
  });

  it("should validate and set errors on submit if invalid", () => {
    const { result } = renderHookWithProviders(() => useProductForm());
    const submitSpy = jest.spyOn(result.current, "onFormSubmit");
    act(() => {
      result.current.onFormSubmit({ preventDefault: jest.fn() } as any);
    });
    expect(submitSpy).toHaveBeenCalled();
    expect(result.current.errors).not.toEqual({});
  });

  it("should reset form values and errors on cancelEdit", () => {
    const { result } = renderHookWithProviders(() =>
      useProductForm(productMock)
    );
    act(() => {
      result.current.onFormValueChange({
        target: { id: "name", value: "Product 1" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.cancelEdit();
    });
    expect(result.current.formValues).toEqual(productFormValuesMock);
    expect(result.current.errors).toEqual(defaultInitialErrors);
  });
});
