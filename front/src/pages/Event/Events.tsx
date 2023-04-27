import { MaskHappy } from "phosphor-react";
import { HeaderTemplate } from "../../templates/HeaderTemplate";
import { useEffect, useState, useCallback } from "react";
import * as EventService from "../../api/event/event.service";
import * as EmailService from "../../api/email/email.service";
import clsx from "clsx";
import { useToast } from "@chakra-ui/react";

export function Events() {
  const toast = useToast();
  const [events, setEvents] = useState<EventService.Event[]>();

  const fetchEvents = useCallback(() => {
    EventService.getEvents().then(setEvents).catch(console.error);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <HeaderTemplate>
      <div className="flex items-center justify-center text-2xl text-zinc-600">
        <MaskHappy size={40} className="mr-2" />
        <strong>Available events</strong>
      </div>
      <div className="grid grid-cols-5 grid-flow-row gap-10 m-10">
        {events?.map((event) => (
          <div
            key={event.id}
            className="bg-zinc-700 h-44 flex flex-col items-center p-3 shadow-md shadow-zinc-600 rounded text-white"
          >
            <div className="flex justify-between w-full items-center">
              <strong className="text-xl">{event.name}</strong>

              <button
                onClick={async () => {
                  if (event.subscribed) {
                    await EventService.cancelSubscription(event.id);
                    toast({
                      description: `Subscription canceled`,
                      status: "info",
                      duration: 4000,
                      isClosable: true,
                    });
                  } else {
                    await EventService.subscribeEvent(event.id);
                    toast({
                      description: `Subscription created`,
                      status: "success",
                      duration: 4000,
                      isClosable: true,
                    });
                    EmailService.sendEmail(
                      localStorage.getItem(`email`)!,
                      event
                    );
                  }

                  await fetchEvents();
                }}
              >
                <span
                  className={clsx(
                    "text-sm p-1 rounded cursor-pointer hover:animate-pulse",
                    event.subscribed ? "bg-[#c42e2e]" : "bg-[#30a76d]"
                  )}
                >
                  {event.subscribed ? "Unsubscribe" : "Subscribe"}
                </span>
              </button>
            </div>
            <div className="mt-auto text-sm">
              <span>{event.location} -</span>
              <span> {new Date(event.date).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </HeaderTemplate>
  );
}
