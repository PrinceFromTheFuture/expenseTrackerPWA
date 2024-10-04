import React from "react";
import Touchable from "../components/Touchable";

type Props = {
  onConfirmDelete: React.ReactEventHandler;
  onCancel: React.ReactEventHandler;
};
const DeleteWarning = ({ onCancel, onConfirmDelete }: Props) => {
  return (
    <>
      {" "}
      <div className=" w-full  flex flex-col justify-center items-center mb-8 ">
        <div className=" text-xl mb-2  text-dark font-bold ">Are you sure?!</div>

        <div className=" w-full  flex flex-col justify-center items-center ">
          <div className=" text-md text-center  mb-2 text-secondary font-semibold">This action cannot be undone. This will permanently delete </div>
        </div>
      </div>
      <div className=" w-full justify-between flex items-center gap-2">
        <div className=" w-full ">
          <Touchable onClick={onConfirmDelete} className=" w-full text-center bg-warning rounded-2xl font-semibold text-surface p-4">
            Delete
          </Touchable>
        </div>
        <div className=" w-full ">
          <Touchable
            onClick={onCancel}
            className=" flex justify-center items-center gap-2 w-full bg-container rounded-2xl font-semibold text-secondary p-4"
          >
            <div>Cancel</div>
          </Touchable>
        </div>
      </div>
    </>
  );
};

export default DeleteWarning;
