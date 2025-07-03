import styles from "./ProductImagesList.module.css";
import ProductImage from "../ProductImage";
import { Image } from "../../types/dataTypes";
import clsx from "clsx";

interface ProductImagesListProps {
  images: Image[];
  isEditOn: boolean;
  errors: string;
  onImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => void;
  onRemoveImage: (index: number) => void;
}

const ProductImagesList = ({
  images,
  isEditOn,
  errors,
  onImageChange,
  onRemoveImage,
}: ProductImagesListProps) => {
  return (
    <>
      <p>Images:</p>
      <ul className={clsx(styles.images, { [styles.editable]: isEditOn })}>
        {images.map((image, index) => (
          <li key={image.id} className={styles.imageItem}>
            <ProductImage
              {...image}
              className={isEditOn ? styles.miniatureImage : ""}
            />
            {isEditOn && (
              <div className={styles.imageEdit}>
                <label>
                  URL:
                  <input
                    type="text"
                    value={image.url}
                    onChange={(e) => onImageChange(e, index, "url")}
                  />
                </label>
                <label>
                  Name:
                  <input
                    type="text"
                    value={image.name}
                    onChange={(e) => onImageChange(e, index, "name")}
                  />
                </label>
                <button type="button" onClick={() => onRemoveImage(index)}>
                  remove
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {errors && isEditOn && <p className={styles.errorMessage}>{errors}</p>}
    </>
  );
};

export default ProductImagesList;
