import axios from "axios";
import { AxiosResponse } from "axios";
import { ImageData } from "../types/types";
const baseUrl = "/api/image";

interface generateImageObject {
  imageDescription: string,
  imageSize: string,
}


const generateImage = (newObject: generateImageObject): Promise<AxiosResponse<ImageData>> => {
  return axios.get<ImageData>(`${baseUrl}?imageDescription=${newObject.imageDescription}&imageSize=${newObject.imageSize}`)
}

export default {
  generateImage,
}
