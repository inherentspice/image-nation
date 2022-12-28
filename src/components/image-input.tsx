import { useState } from "react";

export default function ImageCreation() {
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
        <option value="1920x1080">Background Image</option>
        <option value="1200x630">Blog Image</option>
        <option value="250x100">Logo Rectangle</option>
        <option value="100x100">Logo Square</option>
      </select>
      <button onClick={()=> {}}>
        Generate Image
      </button>
    </div>
    </>
  )
}
