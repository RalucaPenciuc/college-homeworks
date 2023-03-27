import SenderData from "./SenderData";
import MessageDTO from "./dtos/MessageDTO";

export default interface Message {
  sender: SenderData;
  receiver: SenderData;
  messages: MessageDTO[];
}
