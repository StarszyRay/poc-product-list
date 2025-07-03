import parseItemsData from "./parseItemsData";
import { RawProduct } from "../types/dataTypes";

describe("parseItemsData", () => {
  it("should swap name and code values", () => {
    const rawProducts: RawProduct[] = [
      {
        name: "12345",
        number: "Product A",
        description: "A sample product",
        images: [],
      },
    ];

    const result = parseItemsData(rawProducts);
    expect(result[0].name).toBe("Product A");
    expect(result[0].code).toBe("12345");
    expect(result[0].description).toBe("A sample product");
  });

  it("should generate an id based on name and code", () => {
    const rawProducts: RawProduct[] = [
      {
        name: "12345",
        number: "Product A",
        description: "A sample product",
        images: [],
      },
    ];

    const result = parseItemsData(rawProducts);
    expect(result[0].id).toBe("12345-Product A");
  });

  it("should handle empty images array", () => {
    const rawProducts: RawProduct[] = [
      {
        name: "67890",
        number: "Product B",
        description: "Another product",
        images: [],
      },
    ];

    const result = parseItemsData(rawProducts);

    expect(result).toHaveLength(1);
    expect(result[0].images).toEqual([]);
  });

  it("should parse multiple RawProducts", () => {
    const rawProducts: RawProduct[] = [
      {
        name: "11111",
        number: "Product X",
        description: "Desc X",
        images: [{ url: "x.jpg", name: "X" }],
      },
      {
        name: "22222",
        number: "Product Y",
        description: "Desc Y",
        images: [{ url: "y.jpg", name: "Y" }],
      },
    ];

    const result = parseItemsData(rawProducts);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("11111-Product X");
    expect(result[1].id).toBe("22222-Product Y");
    expect(result[0].images[0]).toHaveProperty("id");
    expect(result[1].images[0]).toHaveProperty("id");
  });

  it("should generate unique ids for images", () => {
    const rawProducts: RawProduct[] = [
      {
        name: "33333",
        number: "Product Z",
        description: "Desc Z",
        images: [
          { url: "z1.jpg", name: "Z1" },
          { url: "z2.jpg", name: "Z2" },
        ],
      },
    ];

    const result = parseItemsData(rawProducts);
    const [img1, img2] = result[0].images;

    expect(img1.id).not.toBe(img2.id);
    expect(typeof img1.id).toBe("string");
    expect(typeof img2.id).toBe("string");
  });

  it("should handle empty input array", () => {
    const result = parseItemsData([]);
    expect(result).toEqual([]);
  });
});
