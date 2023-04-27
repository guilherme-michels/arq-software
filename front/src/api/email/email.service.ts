import { emailAPI } from "..";
import { Event } from "../event/event.service";

export function sendEmail(email: string, event: Event) {
  return emailAPI.post(`/send-email`, {
    email,
    event,
  });
}
