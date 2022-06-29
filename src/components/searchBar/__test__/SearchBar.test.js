import { render, screen } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("Search bar component", () => {
    it("has a placeholder when no value is provided", () => {
        render(<SearchBar />);
        const placeholderText = screen.queryAllByPlaceholderText(/search by name/i)
        expect(placeholderText).toBeInTheDocument();
    })

    it("shows the search term when it is provided", () => {
        render(<SearchBar searchTerm="Samuel" />);
        const searchBarText = screen.getByDisplayValue(/Samuel/i);
        expect(searchBarText).toBeInTheDocument();
        expect(searchBarText.value).toEqual("Samuel");
    })
})