import { Image } from "../../types/dataTypes";
import { useEffect, useState } from "react";
import styles from "./ProductImage.module.css";
import clsx from "clsx";

const ProductImage = ({
  url,
  name,
  className = "",
}: Image & React.HTMLAttributes<HTMLDivElement>) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [url]);

  return (
    <div className={clsx(styles.productImage, className)}>
      {isError || !url ? (
        <p>Cannot load image: {name}</p>
      ) : (
        <img
          className={styles.image}
          src={url}
          alt={name}
          onError={() => setIsError(true)}
        />
      )}
    </div>
  );
};

export default ProductImage;
