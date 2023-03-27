import SenderData from "./SenderData";

export default interface SendReplyRequest {
  receiver: SenderData;
  content: string;
}
