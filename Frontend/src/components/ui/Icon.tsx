import { cn } from "@/lib/utils";
import Touchable from "@/components/ui/generalComponents/Touchable";

const Icon = ({ varient, src, backgroundColor }: { varient: "full" | "mid" | "small"; src: string; backgroundColor?: string }) => {
  switch (varient) {
    case "full":
      return <img src={src} alt="" className=" w-10" />;
    case "mid":
      return (
        <Touchable className=" w-10 h-10 bg-container rounded-2xl flex justify-center items-center">
          <img src={src} alt="" className=" w-4" />
        </Touchable>
      );
    case "small":
      return (
        <div
          style={{
            backgroundColor: backgroundColor && backgroundColor,
          }}
          className={cn("p-2 rounded-full", !backgroundColor && "bg-main")}
        >
          <img src={src} alt="" className=" w-4 aspect-square" />
        </div>
      );
  }
};

export default Icon;
