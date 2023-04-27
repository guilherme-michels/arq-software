import { MaskHappy } from "phosphor-react";
import { HeaderTemplate } from "../../templates/HeaderTemplate";
import { useEffect } from "react";
import { getEvents } from "../../api/event/event.service";

export function UserEvents() {
  return (
    <HeaderTemplate>
      <div className="flex items-center justify-center text-2xl text-zinc-600">
        <MaskHappy size={40} className="mr-2" />
        <strong>Available events</strong>
      </div>
      <div className="grid grid-cols-5 grid-flow-row gap-10 m-10">
        <div className="bg-zinc-700 h-44 flex flex-col items-center p-3 shadow-md shadow-zinc-600 rounded text-white">
          <div className="flex justify-between w-full items-center">
            <strong className="text-xl">Renato Albani</strong>
            <span className="text-sm bg-[#30a76d] p-1 rounded cursor-pointer hover:animate-pulse">
              Subscribe
            </span>
          </div>
          <div className="mt-10">
            <span className="text-lg">Show de standup, venha rir!</span>
          </div>
          <div className="mt-auto text-sm">
            <span>Teatro Univates - </span>
            <span>30/05 20:30</span>
          </div>
        </div>
      </div>
    </HeaderTemplate>
  );
}
