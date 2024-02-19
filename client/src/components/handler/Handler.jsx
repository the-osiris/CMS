import React from "react";
import { MdDeleteForever } from "react-icons/md";

function Handler(props) {
  return (
    <div className="relative w-fit h-fit bg-gray-200 rounded p-2 flex flex-col gap-2">
      <div className="flex text-sm gap-2">
        <p className="font-bold">Username:</p>
        {props.username}
      </div>
      <div className="flex text-sm gap-2">
        <p className="font-bold">Password:</p>
        {props.password}
      </div>
      <button
        onClick={() => {
          props.handleDelete(props.username);
        }}
        type="button"
        className="absolute top-[-13px] left-[-13px] p-1 bg-red-500 hover:bg-red-700 flex items-center justify-center w-fit h-fit rounded-[50%]"
      >
        <MdDeleteForever className="text-xl text-white" />
      </button>
    </div>
  );
}

export default Handler;
