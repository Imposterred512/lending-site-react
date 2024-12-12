const env = await import.meta.env;

const min_x = await (await fetch(`${env.VITE_SERVER_DB_HOST}:${import.meta.env.VITE_SERVER_DB_PORT}/getEveryNthByColumn?c=timestamp&n=${env.VITE_N}`)).json()

const initChart = async ({column, text, type = 'line', itemStyle={}, lineStyle={}}) => ({
    id: `${column}-chart`,
    text, type,
    dataX: min_x,
    dataY: await (await fetch(`${env.VITE_SERVER_DB_HOST}:${env.VITE_SERVER_DB_PORT}/getEveryNthByColumn?c=${column}&n=${
        env.VITE_N}`)).json(),
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
            lineStyle: {
                color: color,
                width: 2
            }
        });
    })
);