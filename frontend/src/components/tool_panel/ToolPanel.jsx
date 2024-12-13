const ToolPanel = ({buttons={}, style={}, style={}}) => 
    <div className="tool-panel" style={style}>
        {buttons.map(({onClick=() => {}, text="", style={}, className=""}, i) => 
            <button onClick={onClick} style={style} className={className}>{text}</button>
        )}
    </div>

export default ToolPanel