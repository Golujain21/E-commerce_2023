import React from "react";
import Button from "@mui/material/Button";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 add-category">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
