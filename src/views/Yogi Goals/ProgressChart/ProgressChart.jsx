import { VictoryAxis, VictoryBar, VictoryChart } from "victory";

// weeklyMinutes: [{ style, label, minutes }] as returned by weeklyMinutesByStyle
const ProgressChart = ({ weeklyMinutes }) => {
    const data = weeklyMinutes.map(({ label, minutes }) => ({ x: label, y: minutes }));
    const hasMinutes = data.some(({ y }) => y > 0);

    return (
        <VictoryChart
            domainPadding={{ x: 25, y: 10 }}
            // keep a sensible axis before anything is logged this week
            domain={hasMinutes ? undefined : { y: [0, 60] }}
        >
            <VictoryBar
                data={data}
                labels={({ datum }) => (datum.y ? `${datum.y}` : '')}
                style={{ data: { fill: "#F8C55C" } }}
            />
            <VictoryAxis
                dependentAxis
                tickFormat={(tick) => `${tick} min`}
                style={{ tickLabels: { fontSize: 10 } }}
            />
            <VictoryAxis
                tickFormat={(label) => label.replace(/ yoga$/i, '')}
                style={{ tickLabels: { fontSize: 10 } }}
            />
        </VictoryChart>
    );
}

export default ProgressChart;
