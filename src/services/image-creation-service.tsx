import axios from "axios";
const baseUrl = "/api/image";

interface generateImageObject {
  imageDescription: String,
  imageSize: String,
}


const generateImage = (newObject: generateImageObject): Promise<String> => {
  return axios.get(`${baseUrl}?imageDescription=${newObject.imageDescription}&imageSize=${newObject.imageSize}`)
}

export default {
  generateImage,
}
