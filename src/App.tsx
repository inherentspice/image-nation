import React from "react";
import Header from "./components/header";
import ImageInput from "./components/image-input";
import ImageDisplay from "./components/image-display";
import Loading from "./components/loading";
import ImageCreationService from "./services/image-creation-service";
import UserService from "./services/user";
import ErrorMessage from "./components/error-message";
import { AxiosResponse } from "axios";
import { ImageData } from "./types/types";
import './App.css';

function App() {
  const [imageURL, setImageURL] = React.useState<string>("")
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("")
  const [user, setUser] = React.useState<Object | boolean>(false);


  React.useEffect(() => {
    UserService.checkAuthentication()
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        if (error.reponse.status===401) {
          return
        }
        setError(error.message);
      })
  }, [])

  async function createImage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageDescription: string, imageSize: string): Promise<void> {
    event.preventDefault();
    if (imageDescription==="") {
      setError("No image description!");
      return
    }

    if (imageSize==="") {
      setError("No image size!");
      return
    }

    setImageURL("");
    setError("")
    setLoading(true);
    ImageCreationService.generateImage({imageDescription, imageSize})
      .then((image: AxiosResponse<ImageData>) => {
        setImageURL(image.data.url);
        setLoading(false);
      })
      .catch(error => {
        setError(error.response.data.error);
        setLoading(false);
      });
  }
  console.log(user);
  return (
    <div className="App">
      <Header />
      {/* {!user && <LogIn/>} */}
      {user && <ImageInput createImage={createImage}/>}
      {error && <ErrorMessage message={error}/>};
      {loading && <Loading />}
      {imageURL && <ImageDisplay imageURL={imageURL}/>}

    </div>
  );
}

export default App;
