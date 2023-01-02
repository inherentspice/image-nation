import React from "react";
import Header from "./components/header";
import ImageInput from "./components/image-input";
import ImageDisplay from "./components/image-display";
import ImageCreationService from "./services/image-creation-service";
import { AxiosResponse } from "axios";
import { ImageData } from "./types/types";
import './App.css';

function App() {
  const [imageURL, setImageURL] = React.useState<string>("")

  async function createImage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageDescription: string, imageSize: string): Promise<void> {
    event.preventDefault();
    ImageCreationService.generateImage({imageDescription, imageSize})
      .then((image: AxiosResponse<ImageData>) => {
        setImageURL(image.data.url);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <Header />
      <ImageInput createImage={createImage}/>
      {imageURL && <ImageDisplay imageURL={imageURL}/>}
    </div>
  );
}

export default App;
