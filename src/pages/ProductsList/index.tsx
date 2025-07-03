import { Link } from "react-router-dom";
import { selectAllProducts } from "../../store/products";
import { useSelector } from "react-redux";
import styles from "./ProducstsList.module.css";

const ProductsList = () => {
  const items = useSelector(selectAllProducts);

  console.log("ProductsList rendered", items);
  return (
    <div>
      <h1>Products list</h1>
      <ul className={styles.list}>
        {items.map((item) => (
          <li>
            <Link to={`/products/${encodeURIComponent(item.id)}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
