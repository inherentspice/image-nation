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

export interface UserData {
  user: {
    username: string,
    password: string,
    dailyUse: Number,
    lastLogin: Date
  }
}
