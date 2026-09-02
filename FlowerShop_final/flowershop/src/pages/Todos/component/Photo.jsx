import React from "react";

const UploadAndDisplayImage = ({ selectedImage, onChange }) => {
  return (
    <div className="form-group col-12 col-md-10">
      {selectedImage && (
        <div className="mt-4">
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br /> <br />
          <button
            type="button"
            onClick={() => onChange(null)}
          >
            Убрать
          </button>
        </div>
      )}

      <br />

      <input
        type="file"
        name="myImage"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files && event.target.files[0];
          onChange(file || null);
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;
