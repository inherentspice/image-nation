import React from "react";
import Header from "./components/header";
import ImageCreation from "./components/image-input";
import ImageCreationService from "./services/image-creation-service";
import './App.css';

function App() {
  async function createImage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageDescription: String, imageSize: String): Promise<String> {
    event.preventDefault();
    const imageURL = await ImageCreationService.generateImage({imageDescription, imageSize});
    console.log(imageURL);
    return imageURL;
  }

  return (
    <>
      <Header />
      <ImageCreation createImage={createImage}/>
    </>
  );
}

export default App;
