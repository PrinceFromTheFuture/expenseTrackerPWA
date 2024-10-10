import generalTransition from "@/lib/generalTransition";
import { motion } from "framer-motion";
import app_icon from "@/assets/app_icon.svg";
import Touchable from "@/components/Touchable";
import google_icon from "@/assets/google__logo.svg";
import { Link } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

const Landing = () => {
  return (
    <motion.div
      transition={generalTransition}
      initial={{ opacity: 0, left: 40, right: -40 }}
      animate={{ opacity: 1, left: 0, right: 0 }}
      exit={{ opacity: 0, left: -40, right: 40 }}
      style={{ top: 0, bottom: 0 }}
      className=" p-4 bg-surface  fixed flex flex-col justify-center items-center"
    >
              <Toaster />
      <div className=" flex flex-col justify-center items-center mb-8">
        <div className="p-2  mb-8 flex justify-center items-center bg-dark rounded-3xl h-32 w-32">
          <img src={app_icon} className="  w-4/6 mt-4 " alt="" />
        </div>
        <div className=" text-3xl text-dark font-extrabold mb-2">How are you?!</div>
        <div className=" text-secondary font-semibold text-sm text-center">
          lets start to plan your life together because knwolage is the kay to undesrtanding!
        </div>
      </div>
      <div className=" w-full mb-8">
        <Link to="/signup">
          <Touchable className=" w-full bg-main  p-4 rounded-2xl flex justify-center items-center font-bold text-md  mb-4  text-surface">
            Sign Up
          </Touchable>
        </Link>
        <Link to="/signin">
          <div className=" w-full bg-transparent out outline-2 -outline-offset-2 outline-main outline  p-4 rounded-2xl flex justify-center items-center font-bold text-md text-main">
            Log In
          </div>
        </Link>
      </div>
      <div className=" w-11/12 flex gap-4 justify-between items-center mb-8">
        <div className=" h-[2px] bg-secondary w-full" />
        <div className=" font-semibold  text-dark">Or</div>
        <div className=" h-[2px] bg-secondary w-full" />
      </div>
      <Touchable className="  w-full bg-container  p-4 rounded-2xl flex justify-between items-center font-bold text-md text-main">
        <img src={google_icon} alt="" />
        <div className=" text-dark">continue with Google</div>
        <img className=" invisible" src={google_icon} alt="" />
      </Touchable>
    </motion.div>
  );
};

export default Landing;
