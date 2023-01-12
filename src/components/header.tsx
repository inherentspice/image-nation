import { HeaderProps } from "../types/types"

export default function Header({loggedIn, logOut, navigate}: HeaderProps) {
  return (
    <div className="header-cont">
      <h1>Image-Nation</h1>
      <div className="pages-color-cont">
        {loggedIn ? <button onClick={logOut}>Log Out</button> : ""}
        <button onClick={()=> navigate()}>Sign Up</button>
      </div>
    </div>
  )
}
