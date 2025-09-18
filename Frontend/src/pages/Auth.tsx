import generalTransition from "@/lib/generalTransition";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import validator from "validator";
import { cn } from "@/lib/utils";
import at_main from "@/assets/at_main.svg";
import lock_main from "@/assets/lock_main.svg";
import user_main from "@/assets/user_main.svg";
import PinaColada_text from "@/assets/PinaColada_text.svg";
import app_icon from "@/assets/app_icon.svg";
import { useAppDispatch } from "@/hooks/hooks";
import { signInAsyncTunk, signUpAsyncTunk } from "@/redux/userSlice";
import Touchable from "@/components/Touchable";

const Auth = ({ state }: { state: "signin" | "signup" }) => {
  const [email, setEmail] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);
  const [isEmailValid, setIsEmailValid] = useState<null | boolean>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<null | boolean>(null);
  const [name, setName] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 38) {
      return;
    }
    setEmail(e.target.value);
    if (e.target.value === "") {
      setIsEmailValid(null);
    } else {
      const isValid = validator.isEmail(e.target.value);
      setIsEmailValid(isValid);
    }
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 25) {
      return;
    }
    setPassword(e.target.value);
    if (e.target.value === "") {
      setIsPasswordValid(null);
    } else {
      const isValid = true
      setIsPasswordValid(isValid);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid || !isPasswordValid || !email || !password) {
      return;
    }
    if (state === "signin") {
      dispatch(signInAsyncTunk({ email, password }));
    } else {
      dispatch(signUpAsyncTunk({ email, password, name }));
    }
  };
  return (
    <motion.div
      transition={generalTransition}
      initial={{ opacity: 0, left: 40, right: -40 }}
      animate={{ opacity: 1, left: 0, right: 0 }}
      exit={{ opacity: 0, left: -40, right: 40 }}
      style={{ top: 0, bottom: 0 }}
      className=" p-4 bg-surface py-24  fixed flex flex-col justify-between items-center"
    >
      <div className=" flex justify-center gap-2 items-center">
        <div className=" w-12 h-14 p-2 bg-dark  rounded-2xl">
          <img className="mt-1" src={app_icon} alt="" />
        </div>
        <div className=" w-44">
          <img src={PinaColada_text} alt="" />
        </div>
      </div>

      <form className=" w-full" onSubmit={handleSubmit}>
        <div className="text-secondary ml-4 mb-4 font-semibold text-base ">
          {state === "signin" ? "Sign in to your account" : "Create New Account"}
        </div>
        {state === "signup" && (
          <Touchable
            className={cn(
              " bg-container p-4  mb-4   gap-3   outline-2  rounded-2xl flex justify-between items-center",
              " "
            )}
          >
            <img className=" w-6 h-6" src={user_main} />
            <div className=" w-full">
              {" "}
              <div className="text-sm  text-main font-bold text-left"> Name</div>
              <input
                type="name"
                value={name ? name : ""}
                onChange={handleNameChange}
                placeholder="Jhone Doe"
                className="placeholder:text-secondary text-sm select-none w-full focus:outline-none text-dark font-semibold bg-transparent "
              />
            </div>
          </Touchable>
        )}
        {isEmailValid === false && (
          <motion.div
            transition={generalTransition}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs m-2 text-warning text-left font-semibold"
          >
            please enter a valid email
          </motion.div>
        )}
        <Touchable
          animate={{
            outlineOffset: isEmailValid === false ? "-2px" : "0px",
            outlineWidth: isEmailValid === false ? "2px" : "0px",
          }}
          className={cn(
            " bg-container p-4  mb-4   gap-3   outline-0  rounded-2xl flex justify-between items-center",
            " outline-warning outline"
          )}
        >
          <img className=" w-6 h-6" src={at_main} />
          <div className=" w-full">
            {" "}
            <div className="text-sm  text-main font-bold text-left"> Email</div>
            <input
              type="email"
              value={email ? email : ""}
              onChange={handleEmailChange}
              placeholder="example@gmail.com"
              className="placeholder:text-secondary text-sm select-none w-full focus:outline-none text-dark font-semibold bg-transparent "
            />
          </div>
        </Touchable>
        {isPasswordValid === false && (
          <motion.div
            transition={generalTransition}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs m-2 text-warning text-left font-semibold"
          >
            password isnt Strong enough
          </motion.div>
        )}
        <Touchable
          animate={{
            outlineOffset: isPasswordValid === false ? "-2px" : "0px",
            outlineWidth: isPasswordValid === false ? "2px" : "0px",
          }}
          className={cn(
            " bg-container p-4   gap-3 outline-0     rounded-2xl flex justify-between items-center",
            " outline-warning m outline"
          )}
        >
          <img className=" w-6 h-6" src={lock_main} />
          <div className=" w-full">
            <div className="text-sm  text-main font-bold text-left"> Password</div>
            <input
              type="password"
              value={password ? password : ""}
              onChange={handlePasswordChange}
              placeholder="•••••••••••••••••••"
              className="placeholder:text-secondary text-sm select-none w-full focus:outline-none text-dark font-semibold bg-transparent "
            />
          </div>
        </Touchable>
        <button type="submit" className="mt-4 w-full">
          <Touchable className=" w-full bg-main  p-4 rounded-2xl flex justify-center items-center font-bold text-md  mb-4  text-surface">
            {state === "signin" ? "Sign in" : "Sign Up"}
          </Touchable>
        </button>
      </form>
      <div className="text-sm text-secondary text-left font-medium">
        {state === "signin" ? "Don't" : "Already"} have an account?{" "}
        <Link className=" font-bold text-main text underline" to={state === "signin" ? "/signup" : "/signin"}>
          {state === "signin" ? "sign up" : "sign in"}{" "}
        </Link>
      </div>
    </motion.div>
  );
};

export default Auth;
