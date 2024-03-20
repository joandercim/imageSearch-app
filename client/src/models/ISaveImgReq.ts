import { IUserImg } from "./IUserImg";

export interface ISaveImgReq {
    id?: string,
    userId?: string, 
    image: IUserImg
}