import { useState } from "react";

interface ImageCreationProps {
  createImage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageDescription: String, imageSize: String) => Promise<String>;
}

export default function ImageCreation({createImage}: ImageCreationProps) {
  let [imageDescription, setImageDescription] = useState("");
  let [imageSize, setImageSize] = useState("")
  return (
    <>
    <div className="image-creation-cont">
      <textarea
        onChange={(e) => setImageDescription(e.target.value)}
        value={imageDescription}
        placeholder="Describe the image you want"
      />
      <select
        onChange={(e) => setImageSize(e.target.value)}
        value={imageSize}
      >
        <option value="">Choose an image size</option>
        <option value="1024x1024">Background Image</option>
        <option value="512x512">Blog Image</option>
        <option value="256x256">Logo Square</option>
      </select>
      <button onClick={(event)=> createImage(event, imageDescription, imageSize)}>
        Generate Image
      </button>
    </div>
    </>
  )
}
