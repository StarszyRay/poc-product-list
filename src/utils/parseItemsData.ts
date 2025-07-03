import { Product, RawProduct } from "../types/dataTypes";
import { v4 as uuidv4 } from "uuid";

// Parses raw data from the RawProducts data source (defaultItemsData.ts) - necessary
// because in it's raw format the name and number fields are mixed-up and there's no unique ID.
const parseItemsData = (rawProducts: RawProduct[]) => {
  return rawProducts.map((rawProduct): Product => {
    // Fix for mixed-up name and number
    const actualName = rawProduct.number;
    const actualNumber = rawProduct.name;
    return {
      // Use number-name pair as a unique ID for cleaner urls - on the assumption that
      // there's no duplicate product and it doesn't update on name or number changes.
      id: `${actualNumber}-${actualName}`,
      name: actualName,
      code: actualNumber,
      description: rawProduct.description,
      images: rawProduct.images.map((image, index) => {
        return { ...image, id: uuidv4() };
      }),
    };
  });
};

export default parseItemsData;
