import NavBarElements from "./NavBarElements"
import "./NavBar.scss"

const NavBar = ({ elements_arr, style }) =>
    <div className="navbar" style={style}>
        {elements_arr.map((elements, key) =>
            <NavBarElements key={`navbar-elements-${key}`}
                width={`${100 / elements_arr.length}vw`}
                elements={elements} />)}
    </div>

export default NavBar