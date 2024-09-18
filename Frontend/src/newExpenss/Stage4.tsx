import Touchable from "@/Touchable";
import calender_main from "@/assets/calender_main.svg";
import exit_main from "@/assets/exit_main.svg";
import TextareaAutosize from "react-textarea-autosize";

import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { useRef, useState } from "react";
function Stage4() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const titleTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const descriptionTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState("fsdfds");
  const [desciption, setDesciption] = useState("fsdfds");

  const maxFiledLength = 120;

  const handleOnOpenChange = () => {
    setTimeout(() => {
      if (!titleTextAreaRef.current) {
        return;
      }
      titleTextAreaRef.current.focus();
    }, 300);
  };

  return (
    <div className=" w-full h-full my-4 flex flex-col items-center ">
      <div className="text-secondary mb-4 font-semibold text-base">choose budget category</div>

      <Drawer>
        <DrawerTrigger className=" mt-2 w-full">
          <Touchable className=" p-4 bg-surface  gap-2 outline-secondary -outline-offset-2 outline  outline-2  rounded-2xl flex justify-between items-center">
            <img className=" w-7 h-7" src={calender_main} />
            <div className=" w-full">
              {" "}
              <div className="text-xs text-main font-semibold text-left">
                {" "}
                this is a title for the trnasaction
              </div>
              <TextareaAutosize
                value={title}
                placeholder="fdf"
                className="text-sm select-none w-full focus:outline-none text-dark font-bold bg-transparent "
              />
            </div>
          </Touchable>
        </DrawerTrigger>
        <DrawerContent className="">
          <div className=" font-semibold text-xl text-dark my-4">transaction details</div>
          <div className=" px-4 py-2 outline-main -outline-offset-2 outline  outline-2  rounded-2xl flex justify-between items-center">
            <div className=" w-full mr-2 flex gap-2 justify-start items-center">
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
                    console.log(e.target.value.length);
                    if (e.target.value.length <= maxFiledLength) {
                      setTitle(e.target.value);
                    }
                  }}
                  ref={titleTextAreaRef}
                  onBlur={(e) => {
                    e.target.focus();
                  }}
                  placeholder="fdsf"
                  className="text-sm w-full focus:outline-none text-dark font-bold bg-transparent "
                />
              </div>
            </div>
            <img onClick={() => setTitle("111")} className=" w-4 h-4" src={exit_main} />
          </div>
          <DrawerClose className=" w-full">
            <Touchable className=" mt-5 w-full p-4 bg-secondary text-sm font-bold  rounded-2xl text-surface">
              Close
            </Touchable>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
      <Drawer
        open={isOpen}
        onOpenChange={(isOpen) => {
          handleOnOpenChange();
          setIsOpen(isOpen);
        }}
      >
        <DrawerTrigger className=" mt-2 w-full">
          <Touchable className=" p-4 bg-surface   gap-2 outline-secondary -outline-offset-2 outline  outline-2  rounded-2xl flex justify-between items-center">
            <img className=" w-7 h-7" src={calender_main} />
            <div className=" w-full">
              {" "}
              <div className="text-xs text-main font-semibold text-left">
                {" "}
                this is a title for the trnasaction
              </div>
              <TextareaAutosize
                value={desciption}
                placeholder="fdf"
                className="text-sm select-none w-full focus:outline-none text-dark font-bold bg-transparent "
              />
            </div>
          </Touchable>
        </DrawerTrigger>
        <DrawerContent className="">
          <div className=" font-semibold text-xl text-dark my-4">transaction details</div>
          <div className=" px-4 py-2 outline-main -outline-offset-2 outline  outline-2  rounded-2xl flex justify-between items-center">
            <div className=" w-full mr-2 flex gap-2 justify-start items-center">
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
                    console.log(e.target.value.length);
                    if (e.target.value.length <= maxFiledLength) {
                      setDesciption(e.target.value);
                    }
                  }}
                  placeholder="fdf"
                  className="text-sm w-full focus:outline-none text-dark font-bold bg-transparent "
                />
              </div>
            </div>
            <img className=" w-4 h-4" onClick={() => setDesciption("111")} src={exit_main} />
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
