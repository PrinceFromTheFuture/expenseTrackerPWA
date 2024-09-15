import Tuchable from "@/Tuchable";

const Icon = ({ varient, src }: { varient: "full" | "mid" | "small"; src: string }) => {
  switch (varient) {
    case "full":
      return <img src={src} alt="" className=" w-10" />;
    case "mid":
      return (
        <Tuchable className=" w-10 h-10 bg-container rounded-2xl flex justify-center items-center">
          <img src={src} alt="" className=" w-4" />
        </Tuchable>
      );
    case "small":
      return (
        <div className="p-2 bg-main rounded-full">
          <img src={src} alt="" className=" w-4" />
        </div>
      );
  }
};

export default Icon;
