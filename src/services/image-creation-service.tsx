const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();



interface ImageCreationProps {
  imageDescription: String,
  imageSize: String,
}

export default async function ImageCreationService({imageDescription, imageSize}: ImageCreationProps): Promise<String>{
  const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: imageDescription,
    n: 1,
    size: imageSize,
  });

  const image_url: String = response.data.data[0].url;
  return image_url
}
