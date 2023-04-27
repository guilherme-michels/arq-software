import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import theater from "../../assets/theater.jpg";

export function Authenticate() {
  const [loginOrRegister, setLoginOrRegister] = useState(true);

  return (
    <div className="flex h-full w-full bg-[#131313] items-center justify-center">
      {/* <div className="flex justify-between w-full absolute opacity-30 items-center">
        <img src={theater} alt="" />
      </div> */}
      <div className="flex flex-col w-full items-center z-10">
        {loginOrRegister ? (
          <div className="flex flex-col w-full h-full items-center justify-center">
            <Login />
            <span
              className=" text-zinc-50 cursor-pointer hover:text-zinc-400 transition-all text-sm absolute mt-80"
              onClick={() => setLoginOrRegister(false)}
            >
              Dont have an account?
            </span>
          </div>
        ) : (
          <div className="flex flex-col w-full h-full items-center justify-center">
            <Register />
            <span
              className=" text-zinc-50 cursor-pointer hover:text-zinc-400 transition-all text-sm absolute mt-[450px]"
              onClick={() => setLoginOrRegister(true)}
            >
              Already have an account?
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
