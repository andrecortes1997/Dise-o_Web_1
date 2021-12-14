import { useColors } from "./useColors"; 

export const useCharts = (initalData, filteredLabels) => {
  const { getColors } = useColors();
  
  const counterData = initalData.reduce(
    (acc, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1,
    }),
    {}
  );

  const colors = getColors(filteredLabels);

  const getChartData = () => {
    return {
      datasets: [
        {
          data: dataCounter(),
          backgroundColor: colors,
          borderColor: colors,
        },
      ],

      labels: filteredLabels,
    };
  };

  const dataCounter = () => {
    const values = [];
    // eslint-disable-next-line
    for (const property in counterData) {
      values.push(counterData[property]);
    }
    return values;
  };

  return { getChartData };
};