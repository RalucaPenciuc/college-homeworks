import RentPost from "../models/RentPost";
import { RentPostType } from "../models/constants/rentPostType";
import { RentType } from "../models/constants/rentType";
import { LocationType } from "../models/constants/location";
import RentPostDTO from "../models/dtos/RentPostDTO";
import firebase from "firebase";
import { FirebaseAuth } from "./firebase-init";
import { QueryDoc } from "./typeAlias";

export function getRentPostFromQueryDoc(object: QueryDoc): RentPost {
  const postTypeEnum = object.get("postType").toUpperCase() as keyof typeof RentPostType;
  const rentTypeEnum = object.get("rentType").toUpperCase() as keyof typeof RentType;
  const locationEnum = object.get("location") as keyof typeof LocationType;

  return {
    docRef: object.id,
    createDate: object.get("createDate"),
    authorID: object.get("authorID"),
    authorName: object.get("authorName"),
    authorPhone: object.get("authorPhone"),
    price: object.get("price"),
    guaranty: object.get("guaranty"),
    contract: object.get("contract"),
    postType: RentPostType[postTypeEnum],
    rentType: RentType[rentTypeEnum],
    floor: object.get("floor"),
    location: LocationType[locationEnum],
    rooms: object.get("rooms"),
    bathrooms: object.get("bathrooms"),
    balcony: object.get("balcony"),
    description: object.get("description"),
    photos: object.get("photos"),
  };
}

export function getRentPostFromDTO(dto: RentPostDTO): RentPost {
  return {
    createDate: dto.rentPostData.createDate,
    authorID: dto.rentPostData.authorID,
    authorName: FirebaseAuth.currentUser?.displayName || "",
    authorPhone: dto.rentPostData.authorPhone,
    price: dto.rentPostData.price,
    guaranty: dto.rentPostData.guaranty,
    contract: dto.rentPostData.contract,
    postType: dto.rentPostData.postType,
    rentType: dto.rentPostData.rentType,
    floor: dto.rentPostData.floor,
    location: dto.rentPostData.location,
    rooms: dto.rentPostData.rooms,
    bathrooms: dto.rentPostData.bathrooms,
    balcony: dto.rentPostData.balcony,
    description: dto.rentPostData.description,
    photos: dto.photos.map(photo => photo.name),
  };
}
