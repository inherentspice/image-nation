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
  const [user, setUser] = React.useState<UserData>({user: {username: "", dailyUse: -1, id: "", lastLogin: ""}});
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

  function dateConversion(): string{
    return new Date().toLocaleString().split(',')[0]
  }

  async function createImage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageDescription: string, imageSize: string): Promise<void> {
    event.preventDefault();
    const dateNow = dateConversion()
    if (user.user.dailyUse >= 15 && dateNow === user.user.lastLogin) {
      setError("You have exceeded the daily limit of uses. Wait until tomorrow to try again.");
      return
    }
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
      })
    UserService.updateUser(user.user.id)
      .then(updatedUser => {
        setUser(updatedUser.data)
      })
      .catch(error => {
        setError(error.response.data.error);
      })
  }

  // Submit user login info to the database for authentication
  function handleUserLogin(event: React.FormEvent<HTMLFormElement>, username: string, password: string): void {
    event.preventDefault();
    // remove 'user' from userObject
    const userObject: UserDataPassed = {
      username,
      password,
    };

    UserService.logIn(userObject)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        setError(error.response.data.error);
      })
  }

  // Submit the newly created user to the database
  function handleUserSignUp(event: React.FormEvent<HTMLFormElement>, username: string, password: string): void {
    event.preventDefault();
    const userObject: UserDataPassed = {
        username,
        password
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

  // navigate to sign up page
  function handleSignUpClick(): void {
    setSignUp(!signUp);
  }

  // log user out of the app
  function logOut(): void {
    UserService.logOut()
      .then(response => {
        setUser({user: {username: "", dailyUse: -1, id: "", lastLogin: ""}});
      })
      .catch(error => {
        setError(error.response.message);
      })
  }

  return (
    <div className="App">
      <Header loggedIn={user}  logOut={logOut} navigate={handleSignUpClick}/>
      {user.user.dailyUse < 0 && !signUp && <LogIn handleUserLogIn={handleUserLogin}/>}
      {user.user.dailyUse < 0 && signUp && <SignUp handleUserSignUp={handleUserSignUp}/>}
      {user.user.dailyUse >= 0 && <ImageInput createImage={createImage}/>}
      {error && <ErrorMessage message={error}/>};
      {loading && <Loading />}
      {imageURL && <ImageDisplay imageURL={imageURL}/>}

    </div>
  );
}

export default App;
