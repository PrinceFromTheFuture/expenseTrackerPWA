import React, { EventHandler, ReactNode, useState } from "react";
import { DrawerContent, Drawer, DrawerTrigger, DrawerClose, DrawerPortal } from "../drawer";
import Touchable from "./Touchable";
import tag_main from "@/assets/tag_main.svg";
import bell_main from "@/assets/user_main.svg";
import Icon from "../Icon";
import { AnimatePresence, motion } from "framer-motion";
import generalTransition from "@/lib/generalTransition";
import exit_main from "@/assets/exit_main.svg";
import icons from "@/lib/icons";

const IconSelector = ({
  setIconPath,
  setIsDialogOpen,
  iconPath,
}: {
  setIsDialogOpen: () => void;
  setIconPath: (path: string) => void;
  iconPath: string | null;
}) => {
  return (
    <DrawerPortal>
      <motion.div
        transition={generalTransition}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className=" inset-0    z-50 fixed bg-black/80 flex justify-center items-center"
      >
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={generalTransition}
            className=" w-full gap-8 shadow-xl justify-between pointer-events-auto  items-start p-4 flex-col flex mx-4 rounded-2xl bg-surface"
          >
            <div className=" w-full">
              <div onClick={setIsDialogOpen}>
                <Icon src={exit_main} varient="mid" />
              </div>
              <div className=" max-h-[60vh] overflow-scroll   w-full  grid grid-cols-2 gap-4 my-4   justify-start ">
                {" "}
                {icons.map((icon) => {
                  return (
                    <div
                      onClick={() => {
                        setIconPath(icon);
                        setIsDialogOpen();
                      }}
                      key={icon}
                      style={{ backgroundColor: icon === iconPath ? "#f0f4f7 " : "#f8fbfd" }}
                      className=" p-6 flex justify-center items-center transition-all  bg-surface rounded-2xl "
                    >
                      <img src={icon} alt="" className=" w-12" />
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </DrawerPortal>
  );
};

const NewBudget = ({ trigger }: { trigger: ReactNode }) => {
  const [name, setName] = useState<null | string>(null);
  const [isSelectIconDialogOpen, setIsSelectIconDialogOpen] = useState(false);
  const [iconPath, setIconPath] = useState<string>(icons[0]);
  const [selectColor, setSelectedColor] = useState<string>("#B6C5CC");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 25) {
      setName(e.target.value);
    }
  };

  const handleChangeIsSelectIconDialogOpen = () => {
    setIsSelectIconDialogOpen(!isSelectIconDialogOpen);
  };
  return (
    <>
      <Drawer modal={!isSelectIconDialogOpen}>
        <AnimatePresence>
          {isSelectIconDialogOpen && (
            <IconSelector
              setIconPath={setIconPath}
              setIsDialogOpen={handleChangeIsSelectIconDialogOpen}
              iconPath={iconPath}
            />
          )}
        </AnimatePresence>
        <DrawerTrigger>{trigger}</DrawerTrigger>
        <DrawerContent>
          <div className=" font-semibold text-xl text-dark mt-4 mb-6">Create New Budget</div>
          <div className="text-secondary ml-4 mb-2 font-semibold text-base  ">Choose a budget name</div>
          <Touchable
            className={
              " bg-container p-4  mb-4   gap-3   outline-2  rounded-2xl flex justify-between items-center"
            }
          >
            <img className=" w-6 h-6" src={tag_main} />
            <div className=" w-full">
              {" "}
              <div className="text-sm  text-main font-bold text-left"> Name</div>
              <input
                type="name"
                value={name ? name : ""}
                onChange={handleNameChange}
                placeholder="Outside Food"
                className="placeholder:text-secondary text-sm select-none w-full focus:outline-none text-dark font-semibold bg-transparent "
              />
            </div>
          </Touchable>
          <div className=" flex justify-between items-start gap-6">
            <div>
              <div className="text-secondary  mb-2 font-semibold text-base ">Icon</div>
              <div
                onClick={handleChangeIsSelectIconDialogOpen}
                className=" 
outline-dashed  outline-secondary outline-[3px] -outline-offset-[3px]  bg-container w-14 h-14 flex justify-center items-center  p-3 rounded-2xl"
              >
                <img src={iconPath} alt="" className=" w-6" />{" "}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-secondary   mb-2 font-semibold text-base ">Color</div>
              <div
                style={{ backgroundColor: selectColor }}
                className=" Class
   w-full h-14 flex justify-center shadow-sm items-center  p-3 rounded-2xl"
              ></div>
            </div>
          </div>
          <DrawerClose className=" w-full">
            <Touchable className=" mt-5 w-full p-4 bg-main text-sm font-bold  rounded-2xl text-surface">
              Save
            </Touchable>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NewBudget;
