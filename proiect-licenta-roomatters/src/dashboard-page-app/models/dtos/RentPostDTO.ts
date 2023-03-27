import RentPost from "../RentPost";
import RentPostPhoto from "../RentPostPhoto";

export default interface RentPostDTO {
  rentPostData: RentPost;
  photos: RentPostPhoto[];
}
