import React from "react";
import Header from "./components/header";
import ImageInput from "./components/image-input";
import ImageDisplay from "./components/image-display";
import Loading from "./components/loading";
import LogIn from "./components/log-in";
import SignUp from "./components/sign-up";
import ImageCreationService from "./services/image-creation-service";
import UserService from "./services/user";
import ErrorMessage from "./components/error-message";
import { AxiosResponse } from "axios";
import { ImageData, UserData, UserDataPassed } from "./types/types";
import './App.css';

function App() {
  const [imageURL, setImageURL] = React.useState<string>("")
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("")
  const [user, setUser] = React.useState<UserData | boolean>(false);
  const [signUp, setSignUp] = React.useState<boolean>(false);


  React.useEffect(() => {
    UserService.checkAuthentication()
      .then(response => {
        setUser(response.data);
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

  // Submit user login info to the database for authentication
  function handleUserLogin(event: React.FormEvent<HTMLFormElement>, username: string, password: string): void {
    event.preventDefault();
    const userObject: UserDataPassed = {user: {
      username,
      password,
    }};

    UserService.logIn(userObject)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        setError(error.response.data);
      })
  }

  // Submit the newly created user to the database
  function handleUserSignUp(event: React.FormEvent<HTMLFormElement>, username: string, password: string): void {
    event.preventDefault();
    const userObject: UserDataPassed = {user: {
        username,
        password
      }
    };
    UserService.signUp(userObject)
      .then(response => {
        setUser(response.data);
        setSignUp(false);
      })
      .catch(error => {
        setError(error.response.data);
      })
  }

  return (
    <div className="App">
      <Header loggedIn={user}  logOut={() => {}} navigate={() => {}}/>
      {!user && !signUp && <LogIn handleUserLogIn={handleUserLogin}/>}
      {!user && signUp && <SignUp handleUserSignUp={handleUserSignUp}/>}
      {user && <ImageInput createImage={createImage}/>}
      {error && <ErrorMessage message={error}/>};
      {loading && <Loading />}
      {imageURL && <ImageDisplay imageURL={imageURL}/>}

    </div>
  );
}

export default App;
