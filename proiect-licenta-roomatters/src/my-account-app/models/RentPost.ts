import { LocationType } from "./constants/LocationType";
import { RentPostType } from "./constants/RentPostType";
import { RentType } from "./constants/RentType";

export default interface RentPost {
  docRef?: string;
  createDate: firebase.firestore.Timestamp;

  authorID: string;
  authorName: string;
  authorPhone: string;

  price: number;
  guaranty: number;
  contract: boolean;
  postType: RentPostType;
  rentType: RentType;

  floor: number;
  location: LocationType;
  rooms: number;
  bathrooms: number;
  balcony: number;

  description: string;
  photos: string[];
}
