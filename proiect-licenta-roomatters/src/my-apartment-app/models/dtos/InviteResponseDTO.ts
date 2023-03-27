import Member from "../Member";
import { GroupData } from "../GroupData";

export default interface InviteResponseDTO {
  requestID: string;
  sender: Member;
  receiver: Member;
  groupData: GroupData;
}
