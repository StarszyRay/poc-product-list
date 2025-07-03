import ProductImage from ".";
import { render, screen, fireEvent } from "@testing-library/react";

describe("ProductImage Component", () => {
  it("correctly renders image", () => {
    render(
      <ProductImage url="working-url.png" name="WorkingImage" id="testId" />
    );
    const fallback = screen.queryByAltText(/Cannot load image/i);
    const img = screen.queryByAltText("WorkingImage");
    expect(img).toBeInTheDocument();
    expect(fallback).not.toBeInTheDocument();
  });

  it("renders fallback error message if url is empty", () => {
    render(<ProductImage url="" name="Empty" id="testId" />);
    const fallback = screen.getByText(/Cannot load image/i);
    const img = screen.queryByAltText("Broken");
    expect(fallback).toBeInTheDocument();
    expect(img).not.toBeInTheDocument();
  });

  it("shows fallback message when image fails to load", () => {
    render(<ProductImage url="broken-url.jpg" name="Broken" id="testId" />);
    const img = screen.getByAltText("Broken");
    fireEvent.error(img);
    const fallback = screen.getByText(/Cannot load image/i);
    expect(fallback).toBeInTheDocument();
    expect(img).not.toBeInTheDocument();
  });
});
