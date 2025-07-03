import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "./index";

describe("TextInput", () => {
  it("displays the correct value", () => {
    render(
      <TextInput value="test value" label="Test label" onChange={() => {}} />
    );
    expect(screen.getByDisplayValue("test value")).toBeInTheDocument();
  });

  it("displays new value when it changes", () => {
    const { rerender } = render(
      <TextInput value="Initial value" label="Test label" onChange={() => {}} />
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("Initial value");

    rerender(
      <TextInput value="Updated value" label="Test label" onChange={() => {}} />
    );
    expect(input.value).toBe("Updated value");
  });

  it("displays the correct label", () => {
    render(
      <TextInput value="test value" label="Test label" onChange={() => {}} />
    );
    const label = screen.getByText("Test label");
    expect(label).toBeInTheDocument();
  });

  it("calls onChange when input changes", () => {
    const handleChange = jest.fn();
    render(<TextInput label="" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "abc" } });
    expect(handleChange).toHaveBeenCalled();
  });
});
