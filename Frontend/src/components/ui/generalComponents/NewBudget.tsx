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
import colors from "@/lib/colors";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { postNewBudgetAsyncThunk } from "@/pages/redux/budgetsSlice";

const IconSelector = ({
  setSelectedIcon,
  setIsDialogOpen,
  selectedIcon,
}: {
  setIsDialogOpen: () => void;
  setSelectedIcon: (path: string) => void;
  selectedIcon: string | null;
}) => {
  return (
    <>
      {" "}
      <DrawerPortal>
        <motion.div
          transition={generalTransition}
          initial={{ opacity: 0 }}
          style={{ pointerEvents: "all" }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className=" inset-0  z-50 fixed  overflow-y-auto  bg-black/80 flex justify-center items-center"
        >
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ pointerEvents: "all" }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={generalTransition}
              className=" w-3/4 gap-8 shadow-xl  justify-between  overflow-y-auto   items-start p-4 flex-col flex mx-4 rounded-2xl bg-surface"
            >
              <div className=" w-full">
                <div onClick={setIsDialogOpen}>
                  <Icon src={exit_main} varient="mid" />
                </div>

                <div
                  style={{ pointerEvents: "all" }}
                  className=" max-h-[60vh]   overflow-y-auto w-full  grid grid-cols-4 gap-2 my-4   justify-start "
                >
                  {" "}
                  {icons.map((icon) => {
                    return (
                      <div
                        onClick={() => {
                          setSelectedIcon(icon);
                          setIsDialogOpen();
                        }}
                        key={icon}
                        style={{ backgroundColor: icon === selectedIcon ? "#f0f4f7 " : "#f8fbfd" }}
                        className=" p-4 flex justify-center  items-center transition-all  bg-surface rounded-2xl "
                      >
                        <img src={`${icon}0D6680.svg`} alt="" className=" w-12" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </DrawerPortal>
    </>
  );
};

const ColorSelector = ({
  setSelectedColor,
  setIsDialogOpen,
  selectedColor,
}: {
  setIsDialogOpen: () => void;
  setSelectedColor: (name: string) => void;
  selectedColor: string;
}) => {
  return (
    <DrawerPortal>
      <motion.div
        transition={generalTransition}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className=" inset-0   z-50 fixed bg-black/80 flex justify-center items-center"
      >
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={generalTransition}
            className=" w-3/4 gap-8 shadow-xl pointer-events-auto justify-between  overflow-auto    items-start p-4 flex-col flex mx-4 rounded-2xl bg-surface"
          >
            <div className=" w-full">
              <div onClick={setIsDialogOpen}>
                <Icon src={exit_main} varient="mid" />
              </div>
              <div className=" max-h-[60vh] overflow-auto  w-full  grid grid-cols-4 gap-4 my-4   justify-start ">
                {" "}
                {colors.map((color) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectedColor(color);
                        setIsDialogOpen();
                      }}
                      key={color}
                      style={{ backgroundColor: color === selectedColor ? "#f0f4f7 " : "#f8fbfd" }}
                      className=" p-2 flex justify-center items-center transition-all  bg-surface rounded-2xl "
                    >
                      <div className=" w-full rounded-2xl aspect-square" style={{ backgroundColor: `#${color}` }}></div>
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
  const dispatch = useAppDispatch();
  const [selectedName, setSelectedName] = useState<null | string>(null);
  const [isSelectIconDialogOpen, setIsSelectIconDialogOpen] = useState(false);
  const [isSelectColorDialogOpen, setIsSelectColorDialogOpen] = useState(false);

  const [selectedIcon, setSelectedIcon] = useState<string>(icons[0]);
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 25) {
      setSelectedName(e.target.value);
    }
  };
  const handleSaveNewBudget = () => {
    if (selectedName) {
      dispatch(postNewBudgetAsyncThunk({ color: selectedColor, iconURL: selectedIcon, name: selectedName }));
    }
  };

  const handleChangeIsSelectIconDialogOpen = () => {
    setIsSelectIconDialogOpen(!isSelectIconDialogOpen);
  };
  const handleChangeIsSelectColorDialogOpen = () => {
    setIsSelectColorDialogOpen(!isSelectColorDialogOpen);
  };
  return (
    <>
      <Drawer shouldScaleBackground dismissible={false} disablePreventScroll={false}>
        <AnimatePresence>
          {isSelectIconDialogOpen && (
            <IconSelector setSelectedIcon={setSelectedIcon} setIsDialogOpen={handleChangeIsSelectIconDialogOpen} selectedIcon={selectedIcon} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isSelectColorDialogOpen && (
            <ColorSelector setIsDialogOpen={handleChangeIsSelectColorDialogOpen} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
          )}
        </AnimatePresence>
        <DrawerTrigger className=" h-min">{trigger}</DrawerTrigger>
        <DrawerContent>
          <div className=" font-semibold text-xl text-dark mt-4 mb-6">Create New Budget</div>
          <div className="text-secondary ml-4 mb-2 font-semibold text-base  ">Choose a budget name</div>
          <Touchable className={" bg-container p-4  mb-4   gap-3   outline-2  rounded-2xl flex justify-between items-center"}>
            <img className=" w-6 h-6" src={tag_main} />
            <div className=" w-full">
              {" "}
              <div className="text-sm  text-main font-bold text-left"> Name</div>
              <input
                type="name"
                value={selectedName ? selectedName : ""}
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
                <img src={`${selectedIcon}${selectedColor}.svg`} alt="" className=" w-6" />{" "}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-secondary   mb-2 font-semibold text-base ">Color</div>
              <div
                onClick={handleChangeIsSelectColorDialogOpen}
                style={{ backgroundColor: `#${selectedColor}` }}
                className="
   w-full h-14 flex justify-center shadow-sm items-center  p-3 rounded-2xl"
              ></div>
            </div>
          </div>
          <div className=" flex gap-2">
            <DrawerClose className="  ">
              <Touchable className=" mt-5 w-full px-8 p-4 bg-container text-sm font-bold  rounded-2xl text-secondary">Cancel</Touchable>
            </DrawerClose>
            <DrawerClose className=" w-full " disabled={selectedName ? false : true}>
              <Touchable onClick={handleSaveNewBudget} className=" mt-5 w-full p-4 bg-main text-sm font-bold  rounded-2xl text-surface">
                Save
              </Touchable>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NewBudget;
