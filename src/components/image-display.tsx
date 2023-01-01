import { ImageDisplayProps } from "../types/types"

export default function ImageDisplay( props: ImageDisplayProps ) {
  return (
    <img src={props.imageURL} alt=""></img>
  )
}
