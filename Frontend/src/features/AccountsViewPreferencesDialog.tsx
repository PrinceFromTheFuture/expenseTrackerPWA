import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/alert-dialog";
import React, { useState } from "react";
import exit_main from "@/assets/exit_main.svg";
import Icon from "@/components/Icon";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  accountsViewPreferencesSelector,
  changeUserAccountPrefrences,
  updateAccountsBalanceSumSelectorAsyncThunk,
} from "@/redux/userPreferencesSlice";
import { getAllAccountsSelector } from "@/redux/accountsSlice";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import Touchable from "@/components/Touchable";
import { Slider } from "@/components/ui/slider";
type Props = {
  trigger: React.ReactNode;
};

const AccountsViewPreferencesDialog = ({ trigger }: Props) => {
  const preferences = useAppSelector(accountsViewPreferencesSelector);
  const accounts = useAppSelector(getAllAccountsSelector).filter((account) => !account.isDeleted);
  const dispatch = useAppDispatch();

  const [selectedAccounts, setSelectedAccounts] = useState(preferences.accountsBalanceSumSelector);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(preferences.accountBalanceChanageInDays);

  const handleSelectedAccountsChange = (accountId: string, isChecked: boolean) => {
    if (isChecked === true) {
      const newArr = selectedAccounts.slice();
      newArr.push(accountId);
      setSelectedAccounts(newArr);
    } else {
      const newArr = selectedAccounts.filter((id) => id !== accountId);
      setSelectedAccounts(newArr);
    }
  };
  const handleSelectedTimeFrameChange = (value: number[]) => {
    const [newValue] = value;
    setSelectedTimeFrame(newValue);
  };
  const handleSave = () => {
    dispatch(updateAccountsBalanceSumSelectorAsyncThunk(selectedAccounts));
    dispatch(changeUserAccountPrefrences({ accountBalanceViewTimeFrame: selectedTimeFrame, selectedAccounts: selectedAccounts }));
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <div className=" w-full bg-surface rounded-2xl mx-4 p-4">
          <AlertDialogCancel>
            <Icon src={exit_main} varient="mid" />
          </AlertDialogCancel>
          <div className=" font-semibold text-xl text-dark mt-4 ">accounts prefrences</div>
          <div className=" mx-2 my-4 mb-6">
            <div className="text-secondary  mb-2 font-semibold  text-base">accounts sum blance</div>
            <div className=" flex flex-col gap-3">
              {accounts.map((account) => {
                return (
                  <div className="  flex justify-between items-center ">
                    <div className=" text-sm font-bold text-dark">{account.name}</div>
                    <Checkbox
                      onCheckedChange={(isChecked) => {
                        handleSelectedAccountsChange(account.id, isChecked as boolean);
                      }}
                      checked={!!selectedAccounts.find((accountId) => account.id === accountId)}
                    />
                  </div>
                );
              })}
            </div>
            <div className="text-secondary  mb-4 font-semibold mt-4  text-base">accounts sum blance</div>
            <div className="  ">
              <Slider
                value={[selectedTimeFrame]}
                onValueChange={handleSelectedTimeFrameChange}
                defaultValue={[selectedTimeFrame]}
                max={30}
                step={1}
              />
              <div className=" mt-6   bg-transparent outline outline-[2px] outline-secondary text-secondary flex justify-center items-center rounded-lg p-2  px-4 text-xs h-min   text-left font-bold   ">
                {selectedTimeFrame} days ago
              </div>
            </div>
          </div>
          <AlertDialogAction onClick={handleSave} className=" w-full ">
            <Touchable className=" w-full p-4 bg-main text-sm font-bold  rounded-2xl text-surface">Save</Touchable>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AccountsViewPreferencesDialog;
