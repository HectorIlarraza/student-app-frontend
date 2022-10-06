import { useEffect } from "react";
import "./SingleTextInput.scss";

const SingleTextInput = ({searchTerm, setSearchTerm, collection = [], onSubmit, placeholder = "Search by name", width = "93%"}) => {
  
    const styles = {
        "width": width
    }

    useEffect(() => {
        const keyDownHandler = e => {
            // console.log("User pressed: ", e.key);

            // if(e.key === "Enter"){
            //     e.preventDefault();

            //     handleSubmit();
            // }
        };

        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };

    }, []);

    const handleSubmit = () => {
        onSubmit([...collection, searchTerm]);
    }

    return (
        <input 
            style={styles}
            className="searchBar" 
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    )
}

export default SingleTextInput;