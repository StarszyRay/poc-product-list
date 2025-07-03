import localStorageService from "./localStorageService";

describe("localStorageService", () => {
  const testKey = "testKey";
  const testValue = { foo: "bar", num: 42 };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should set and get an object correctly", () => {
    localStorageService.set(testKey, testValue);
    const result = localStorageService.get(testKey);
    expect(result).toEqual(testValue);
  });

  it("should return null if key does not exist", () => {
    const result = localStorageService.get(testKey);
    expect(result).toBeNull();
  });

  it("should handle non-JSON values", () => {
    localStorage.setItem(testKey, "not-json");
    const result = localStorageService.get(testKey);
    expect(result).toBe("not-json");
  });

  it("should log error if set throws", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    const circularObj: any = {};
    circularObj.self = circularObj;
    localStorageService.set(testKey, circularObj);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining("Error setting localStorage item with key"),
      expect.any(Error)
    );
    spy.mockRestore();
  });

  it("should store and retrieve primitive values", () => {
    localStorageService.set("number", 123);
    expect(localStorageService.get<number>("number")).toBe(123);

    localStorageService.set("string", "hello");
    expect(localStorageService.get<string>("string")).toBe("hello");

    localStorageService.set("boolean", true);
    expect(localStorageService.get<boolean>("boolean")).toBe(true);
  });

  it("should store and retrieve arrays", () => {
    const arr = [1, 2, 3];
    localStorageService.set("arr", arr);
    expect(localStorageService.get<number[]>("arr")).toEqual(arr);
  });
});
