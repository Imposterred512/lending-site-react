const {VITE_SERVER_DB_URL, VITE_N} = await import.meta.env;

const min_x = [...await (await fetch(`${VITE_SERVER_DB_URL}/getEveryNthByColumn?c=timestamp&n=${VITE_N}`)).json()]
    .map(it => it.replace('T', ' ').replace('.000Z', ''))

const initChart = async ({column, text, type = 'line', itemStyle={}, x=[], lineStyle={}}) => ({
    id: `${column}-chart`,
    text, type,
    dataX: x,
    dataY: await (await fetch(`${VITE_SERVER_DB_URL}/getEveryNthByColumn?c=${column}&n=${VITE_N}`)).json(),
    itemStyle,
    lineStyle
})

const columns = [['humidity', 'Влажность', 'blue'], ['pressure', 'Давление', 'orange'], 
    ['light', 'Освещенность', 'yellow'], ['temperature', 'Температура', 'red']]

export const all = await Promise.all(
    columns.map(async ([column, text, color]) => {
        return initChart({
            column,
            text,
            x: min_x,
            lineStyle: {
                color: color,
                width: 2
            }
        });
    })
);