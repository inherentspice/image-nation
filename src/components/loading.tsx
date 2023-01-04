import LoadingImage from "../media/loading-planet.png";

export default function Loading() {
  return (
    <div className="loading-indicator">
      <img className="spinner" src={LoadingImage} alt=""></img>
      <p>Generating Image...</p>
    </div>
  )
}
