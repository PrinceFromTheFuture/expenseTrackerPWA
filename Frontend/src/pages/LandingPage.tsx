import generalTransition from "@/lib/generalTransition";
import React from "react";
import { motion } from "framer-motion";
import app_icon from "@/assets/app_icon.svg";
import Touchable from "@/components/ui/generalComponents/Touchable";
import google_icon from "@/assets/google__logo.svg";

const LandingPage = () => {
  return (
    <motion.div
      transition={generalTransition}
      initial={{ opacity: 0, left: 40, right: -40 }}
      animate={{ opacity: 1, left: 0, right: 0 }}
      exit={{ opacity: 0, left: -40, right: 40 }}
      style={{ top: 0, bottom: 0 }}
      className=" p-4 bg-dark  fixed flex flex-col justify-center items-center"
    >
      <div className=" flex flex-col justify-center items-center mb-10">
        <img src={app_icon} className=" w-32" alt="" />
        <div className=" text-4xl text-white font-extrabold mb-2">How are you?!</div>
        <div className=" text-secondary font-semibold text-base text-center">
          lets start to plan your life together because knwolage is the kay to undesrtanding!
        </div>
      </div>
      <div className=" w-full mb-10">
        <Touchable className=" w-full bg-main  p-4 rounded-2xl flex justify-center items-center font-bold text-md  mb-4  text-surface">
          Sign Up
        </Touchable>
        <div className=" w-full bg-transparent outline-2 outline-main outline  p-4 rounded-2xl flex justify-center items-center font-bold text-md text-main">
          Log In
        </div>
      </div>
      <div className=" w-11/12 flex gap-4 justify-between items-center mb-10">
        <div className=" h-[2px] bg-surface w-full" />
        <div className=" font-semibold text-md text-surface">Or</div>
        <div className=" h-[2px] bg-surface w-full" />
      </div>
      <Touchable className="  w-full bg-surface  p-4 rounded-2xl flex justify-between items-center font-bold text-md text-main">
        <img src={google_icon} alt="" />
        <div>continue with google</div>
        <img className=" invisible" src={google_icon} alt="" />
      </Touchable>
    </motion.div>
  );
};

export default LandingPage;
