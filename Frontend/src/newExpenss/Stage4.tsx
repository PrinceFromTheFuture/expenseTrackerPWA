import Touchable from "@/Touchable";
import calender_main from "@/assets/calender_main.svg";
import exit_main from "@/assets/exit_main.svg";
import TextareaAutosize from "react-textarea-autosize";

import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { useRef, useState } from "react";
function Stage4() {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
  const [isTitleOpen, setIsTitleOpen] = useState<boolean>(false);

  const titleTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const descriptionTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState("");
  const [desciption, setDesciption] = useState("");

  const maxFiledLength = 120;

  const handleOnDescriptionOpenChange = () => {
    setTimeout(() => {
      if (!descriptionTextAreaRef.current) {
        return;
      }
      descriptionTextAreaRef.current.focus();
    }, 300);
  };

  const handleOnTitleOpenChange = () => {
    setTimeout(() => {
      if (!titleTextAreaRef.current) {
        return;
      }
      titleTextAreaRef.current.focus();
    }, 300);
  };

  return (
    <div className=" w-full h-full my-4 flex flex-col items-center ">
      <div className="text-secondary mb-4 font-semibold text-base">Add Details</div>

      <Drawer
        open={isTitleOpen}
        onOpenChange={(isOpen) => {
          handleOnTitleOpenChange();
          setIsTitleOpen(isOpen);
        }}
      >
        <DrawerTrigger className=" mt-2 w-full">
          <Touchable className=" p-4 bg-surface  gap-3 outline-secondary -outline-offset-2 outline  outline-2  rounded-2xl flex justify-between items-center">
            <img className=" w-7 h-7" src={calender_main} />
            <div className=" w-full">
              {" "}
              <div className="text-xs text-main font-semibold text-left"> Expense Title</div>
              <TextareaAutosize
                value={title}
                placeholder="Enter a brief title (e.g., Groceries, Coffee, Gas)"
                className="placeholder:text-secondary text-sm select-none w-full focus:outline-none text-dark font-semibold bg-transparent "
              />
            </div>
          </Touchable>
        </DrawerTrigger>
        <DrawerContent className="">
          <div className=" font-semibold text-xl text-dark my-4">transaction details</div>
          <div className=" px-4 py-2 outline-main -outline-offset-2 outline  outline-2  rounded-2xl flex justify-between items-center">
            <div className=" w-full mr-2 flex gap-3 justify-start items-center">
              <img className=" w-7 h-7" src={calender_main} />
              <div className=" w-full">
                {" "}
                <div className="text-xs text-main font-semibold">
                  {" "}
                  this is a title for the trnasaction
                </div>
                <TextareaAutosize
                  value={title}
                  onChange={(e) => {
                    if (e.target.value.length <= maxFiledLength) {
                      setTitle(e.target.value);
                    }
                  }}
                  ref={titleTextAreaRef}
                  onBlur={(e) => {
                    e.target.focus();
                  }}
                  placeholder="Enter a brief title (e.g., Groceries, Coffee, Gas)"
                  className=" placeholder:text-secondary text-sm w-full focus:outline-none text-dark font-semibold bg-transparent "
                />
              </div>
            </div>
            <img onClick={() => setTitle("")} className=" w-4 h-4" src={exit_main} />
          </div>
          <DrawerClose className=" w-full">
            <Touchable className=" mt-5 w-full p-4 bg-secondary text-sm font-bold  rounded-2xl text-surface">
              Close
            </Touchable>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
      <Drawer
        open={isDescriptionOpen}
        onOpenChange={(isOpen) => {
          handleOnDescriptionOpenChange();
          setIsDescriptionOpen(isOpen);
        }}
      >
        <DrawerTrigger className=" mt-2 w-full">
          <Touchable className=" p-4 bg-surface   gap-3 outline-secondary -outline-offset-2 outline  outline-2  rounded-2xl flex justify-between items-center">
            <img className=" w-7 h-7" src={calender_main} />
            <div className=" w-full">
              {" "}
              <div className="text-xs text-main font-semibold text-left"> Expense Description</div>
              <TextareaAutosize
                value={desciption}
                placeholder="Add any relevant details (e.g., purchased from, purpose, etc."
                className="placeholder:text-secondary  text-sm select-none w-full focus:outline-none text-dark font-semibold bg-transparent "
              />
            </div>
          </Touchable>
        </DrawerTrigger>
        <DrawerContent className="">
          <div className=" font-semibold text-xl text-dark my-4">transaction details</div>
          <div className=" px-4 py-2 outline-main -outline-offset-2 outline  outline-2  rounded-2xl flex justify-between items-center">
            <div className=" w-full mr-2 flex gap-3 justify-start items-center">
              <img className=" w-7 h-7" src={calender_main} />
              <div className=" w-full">
                {" "}
                <div className="text-xs text-main font-semibold">
                  {" "}
                  this is a title for the trnasaction
                </div>
                <TextareaAutosize
                  ref={descriptionTextAreaRef}
                  onBlur={(e) => {
                    e.target.focus();
                  }}
                  value={desciption}
                  onChange={(e) => {
                    if (e.target.value.length <= maxFiledLength) {
                      setDesciption(e.target.value);
                    }
                  }}
                  placeholder="Add any relevant details (e.g., purchased from, purpose, etc."
                  className=" placeholder:text-secondary text-sm w-full focus:outline-none text-dark font-semibold bg-transparent "
                />
              </div>
            </div>
            <img className=" w-4 h-4" onClick={() => setDesciption("")} src={exit_main} />
          </div>
          <DrawerClose className=" w-full">
            <Touchable className=" mt-5 w-full p-4 bg-secondary text-sm font-bold  rounded-2xl text-surface">
              Close
            </Touchable>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Stage4;
