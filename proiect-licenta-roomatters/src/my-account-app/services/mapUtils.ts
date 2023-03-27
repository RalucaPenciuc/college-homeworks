import { GetDocResponse, Doc, QueryResponse, QueryDoc } from "./typeAlias";
import { GenderType } from "../models/constants/GenderType";
import { LocationType } from "../models/constants/LocationType";
import { RentPostType } from "../models/constants/RentPostType";
import { RentType } from "../models/constants/RentType";
import UserData from "../models/UserData";
import RentPost from "../models/RentPost";
import MessageDTO from "../models/dtos/MessageDTO";
import SenderData from "../models/SenderData";

export function getUserDataFromDocResponse(response: GetDocResponse): UserData | undefined {
  const responseData: Doc | undefined = response.data();
  if (responseData) {
    const genderType = responseData.gender.toUpperCase() as keyof typeof GenderType;
    const locationType = responseData.location as keyof typeof LocationType;
    return {
      email: responseData.email,
      firstName: responseData.firstName,
      lastName: responseData.lastName,
      gender: GenderType[genderType],
      birthdate: responseData.birthdate,
      location: LocationType[locationType],
      profileImage: responseData.profileImage,
    };
  }
  return undefined;
}

export function getSenderDataFromDocResponse(response: GetDocResponse): SenderData | undefined {
  const responseData: Doc | undefined = response.data();
  if (responseData) {
    return {
      docRef: response.id,
      email: responseData.email,
      firstName: responseData.firstName,
      lastName: responseData.lastName,
      profileImage: responseData.profileImage,
    };
  }
  return undefined;
}

export function getSavedPostFromDocReponse(response: GetDocResponse): RentPost | undefined {
  const responseData: Doc | undefined = response.data();
  if (responseData) {
    const postType = responseData.postType.toUpperCase() as keyof typeof RentPostType;
    const locationType = responseData.location as keyof typeof LocationType;
    const rentType = responseData.rentType.toUpperCase() as keyof typeof RentType;
    return {
      docRef: response.id,
      createDate: responseData.createDate,
      authorID: responseData.authorID,
      authorName: responseData.authorName,
      authorPhone: responseData.authorPhone,
      price: responseData.price,
      guaranty: responseData.guaranty,
      contract: responseData.contract,
      postType: RentPostType[postType],
      rentType: RentType[rentType],
      floor: responseData.floor,
      location: LocationType[locationType],
      rooms: responseData.rooms,
      bathrooms: responseData.bathrooms,
      balcony: responseData.balcony,
      description: responseData.description,
      photos: responseData.photos,
    };
  }
  return undefined;
}

export function getRentPostFromQueryResponse(response: QueryResponse): RentPost[] {
  return response.docs.map((rentPostResponse: QueryDoc) => {
    const rentPostResponseData: Doc = rentPostResponse.data();
    const postType = rentPostResponseData.postType.toUpperCase() as keyof typeof RentPostType;
    const locationType = rentPostResponseData.location as keyof typeof LocationType;
    const rentType = rentPostResponseData.rentType.toUpperCase() as keyof typeof RentType;
    return {
      docRef: rentPostResponse.id,
      createDate: rentPostResponseData.createDate,
      authorID: rentPostResponseData.authorID,
      authorName: rentPostResponseData.authorName,
      authorPhone: rentPostResponseData.authorPhone,
      price: rentPostResponseData.price,
      guaranty: rentPostResponseData.guaranty,
      contract: rentPostResponseData.contract,
      postType: RentPostType[postType],
      rentType: RentType[rentType],
      floor: rentPostResponseData.floor,
      location: LocationType[locationType],
      rooms: rentPostResponseData.rooms,
      bathrooms: rentPostResponseData.bathrooms,
      balcony: rentPostResponseData.balcony,
      description: rentPostResponseData.description,
      photos: rentPostResponseData.photos
    }
  });
}

export function getSendersFromQueryResponse(response: QueryResponse): string[] {
  const result: string[] = [];
  response.docs.forEach((senderResponse: QueryDoc) => {
    if (!result.includes(senderResponse.id)) {
      result.push(senderResponse.data().sender);
    }
  });
  return result;
}

export function getMessagesFromQueryResponse(response: QueryResponse): MessageDTO[] {
  return response.docs.map((messageResponse: QueryDoc) => {
    const messageResponseData: Doc = messageResponse.data();
    return {
      docRef: messageResponse.id,
      createDate: messageResponseData.createDate,
      senderID: messageResponseData.sender,
      receiverID: messageResponseData.receiver,
      content: messageResponseData.message,
      read: messageResponseData.read
    }
  })
}