export interface ImageData {
  data: Object,
  url: string,
  status: Number,
}

export interface ImageDisplayProps {
  imageURL: string,
}

export interface ErrorMessageProps {
  message: string,
}

export interface UserDataPassed {
  user: {
    username: string,
    password: string,
    dailyUse?: Number,
    lastLogin?: Date,
    id?: string,
  }
}

export interface UserData {
  user: {
    username: string,
    dailyUse: Number,
    lastLogin: Date,
    id: string,
  }
}

export interface LogInProps {
  handleUserLogIn: (event: React.FormEvent<HTMLFormElement>, username: string, password: string) => void;
}

export interface SignUpProps {
  handleUserSignUp: (event: React.FormEvent<HTMLFormElement>, username: string, password: string) => void;
}

export interface HeaderProps {
  loggedIn: UserData | Boolean,
  logOut: () => void,
  navigate: () => void,
}
