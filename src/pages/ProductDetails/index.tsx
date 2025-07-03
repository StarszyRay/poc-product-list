import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { selectProductById } from "../../store/products";
import styles from "./ProductDetails.module.css";
import { useAppSelector } from "../../store/hooks";
import TextInput from "../../components/TextInput";
import ProductImagesList from "../../components/ProductImagesList";
import { useProductForm } from "../../hooks/useProductForm";

const ProductDetails = () => {
  const { id } = useParams();
  const { code, name } = useMemo(() => {
    const splitId = id?.split("-");
    return splitId?.length === 2
      ? { code: splitId[0], name: splitId[1] }
      : { code: null, name: null };
  }, [id]);
  const product = useAppSelector(selectProductById(id));
  // Probably should have used some an existing form library to handle all this logic...
  const {
    onFormSubmit,
    cancelEdit,
    formValues,
    onFormValueChange,
    onFormImageChange,
    addImage,
    removeImage,
    isEditOn,
    setIsEditOn,
    errors,
  } = useProductForm(product);

  if (!code || !name) {
    return (
      <div>
        <h1>Invalid Product ID</h1>
        <p>The product ID format is incorrect.</p>
        <Link to="/products">Back to Products List</Link>
      </div>
    );
  }
  if (!product) {
    return (
      <div>
        <h1>Product not found</h1>
        <Link to="/products">Back to Products List</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Product Details</h1>
      <form
        className={styles.form}
        onSubmit={onFormSubmit}
        onReset={cancelEdit}
      >
        <TextInput
          id="code"
          label="Code:"
          value={formValues.code}
          onChange={(e) => onFormValueChange(e)}
          readOnly={!isEditOn}
          error={errors.code}
        />
        <TextInput
          id="name"
          label="Name:"
          value={formValues.name}
          onChange={(e) => onFormValueChange(e)}
          readOnly={!isEditOn}
          error={errors.name}
        />
        <TextInput
          id="description"
          label="Description:"
          value={formValues.description}
          onChange={(e) => onFormValueChange(e)}
          readOnly={!isEditOn}
          error={errors.description}
        />
        {!!formValues.images?.length ? (
          <ProductImagesList
            images={formValues.images}
            isEditOn={isEditOn}
            errors={errors.images}
            onImageChange={onFormImageChange}
            onRemoveImage={removeImage}
          />
        ) : (
          <p>Product has no images</p>
        )}
        {isEditOn && (
          <button type="button" onClick={addImage}>
            Add Image
          </button>
        )}
        <div className={styles.buttonsContainer}>
          {isEditOn ? (
            <div>
              <button type="submit">Save</button>
              <button type="reset">Cancel</button>
            </div>
          ) : (
            <button type="button" onClick={() => setIsEditOn(true)}>
              Edit
            </button>
          )}
        </div>
      </form>
      <br />
      <Link to="/products">Back to Products List</Link>
    </div>
  );
};

export default ProductDetails;
