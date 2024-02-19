import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

function checkKeys(obj) {
  const requiredKeys = [
    "Booking ID",
    "Name",
    "Email",
    "Phone",
    "Gender",
    "Category",
    "T-shirt Size",
    "Organization",
  ];
  return requiredKeys.every((key) => Object.keys(obj).includes(key));
}

function Participants({ handleParticipant }) {
  const [file, setFile] = useState(null);
  const handleConvert = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        // console.log(checkKeys(json[0]));
        if (checkKeys(json[0])) handleParticipant(json);
        else toast.error("Error in Uploaded Files");
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="flex justify-between items-center my-4">
      <label
        className="cursor-pointer flex items-center gap-5"
        htmlFor="fileUpload"
      >
        <div className="w-[50px] h-[50px] rounded-[50%] flex items-center justify-center bg-blue-500 hover:bg-blue-700">
          <FaFileUpload className="text-xl text-white  " />
        </div>
        <span className="text-gray-500">
          {file ? file.name : "Upload your .xlsx file"}
        </span>
      </label>
      <input
        className="hidden"
        id="fileUpload"
        type="file"
        accept=".xls,.xlsx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <div className="flex gap-4">
        <a className="w-full h-full" href="/Format.xlsx" download="Format.xlsx">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
          >
            Download Format
          </button>
        </a>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 h-fit py-2 rounded-xl hover:bg-blue-700"
          onClick={handleConvert}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Participants;
