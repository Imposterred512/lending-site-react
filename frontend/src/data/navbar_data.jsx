const navbar_data = {
    style: {
        backgroundColor: "#999",
        height: "5vh",
        zIndex: "1"
    },
    elements_arr: [
        [
            {
                type: "button",
                value: {
                    text: "Просто Кнопка",
                    onclick: () => { alert("Hello World") }
                }
            },
            {
                type: "text",
                value: {
                    text: "Teкст",
                    style: {
                        fontSize: "30px",
                        margin: 0
                    }
                }
            }
        ],
        [
            {
                type: "text",
                value: {
                    text: "Лендинг сайт",
                    style: {
                        fontSize: "30px",
                        textAlign: "center",
                        margin: 5,
                        flex: "auto"
                    }
                }
            }
        ],
        [
            {
                type: "button",
                value: {
                    text: "Кнопка",
                    style: {
                        marginLeft: "auto"
                    },
                    onclick: () => { alert("Hello World") }
                }
            },
            {
                type: "button",
                value: {
                    text: "Кнопка",
                    style: {

                    },
                    onclick: () => { alert("Hello World") }
                }
            },
        ],
    ]
}

export default navbar_data