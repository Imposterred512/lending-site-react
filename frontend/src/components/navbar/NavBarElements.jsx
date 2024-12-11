const NavBarElements = ({ elements = [], width = "0px" }) =>
    <div className="navbar-elements" style={{
        width: width
    }}>
        {elements.map(({ type, value: { text = "", onclick = () => { }, style = null } }, id) => {
            switch (type) {
                case "button":
                    return <button key={`navbar-button-${id}`} style={style} onClick={onclick}>{text}</button>
                case "text":
                    return <p key={`navbar-text-${id}`} style={style}>{text}</p>
                default:
                    throw new Error(`navbar->elements->${text} is not currect`)
            }
        })}
    </div>

export default NavBarElements