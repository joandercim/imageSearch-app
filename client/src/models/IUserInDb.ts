import { IUserImg } from "./IUserImg"

export interface IUserInDb {
    userId?: string, 
    userDetails: {
        favoriteImages: IUserImg[]
    }
  }