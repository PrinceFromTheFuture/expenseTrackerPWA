import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/alert-dialog";
import React from "react";
import exit_main from "@/assets/exit_main.svg";
import Icon from "@/components/Icon";
type Props = {
  trigger: React.ReactNode;
};

const AccountsViewPreferencesDialog = ({ trigger }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <div className=" w-full bg-surface rounded-2xl mx-4 p-4">
          <AlertDialogCancel>
            <Icon src={exit_main} varient="mid" />
          </AlertDialogCancel>
          <div className=" font-semibold text-xl text-dark mt-4 mb-8">accounts prefrences</div>
          <div className="text-secondary  mb-2 font-semibold  text-base">accounts sum blance</div>
          
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AccountsViewPreferencesDialog;
