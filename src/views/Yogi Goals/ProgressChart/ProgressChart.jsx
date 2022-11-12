import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack } from "victory";

const ProgressChart = ({yogaTypes}) => {
    const transformData = (datasetInitial) => {
        const progress = datasetInitial.reduce((datasetArray, currentDataset) =>
            [...datasetArray, { x: currentDataset.name, y: currentDataset.progress }]
            , []);
        const amount = datasetInitial.reduce((datasetArray, currentDataset) =>
            [...datasetArray, { x: currentDataset.name, y: currentDataset.amount - currentDataset.progress }]
            , []);
        
        const dataset = [amount, progress];
        const totals = progress.map((_data, i) => {
            return dataset.reduce((memo, curr) => {
                return memo + curr[i].y;
            }, 0);
        });
        return dataset.map((data) => {
            return data.map((datum, i) => {
                return { x: datum.x, y: totals[i] - datum.y};
            });
        });
    }
        
    return (
        <VictoryChart 
            domainPadding={{ x: 13, y: 10 }}
        >
            <VictoryStack
                colorScale={["#F8C55C", "grey",]}
            >
                {transformData(yogaTypes).map((data, i) => {
                    return <VictoryBar data={data} key={i}/>;
                })}
            </VictoryStack>
            <VictoryAxis
                dependentAxis
                tickFormat={(tick) => `${tick}%`}
            />
            <VictoryAxis
                tickFormat={() => null}
            />
        </VictoryChart>
    );
}

export default ProgressChart;
