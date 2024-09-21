import React from 'react';
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

export default function Test() {
    // const dates = ["01.08.24", "02.08.24", "03.08.24", "04.08.24", "05.08.24", "06.08.24", "07.08.24", "08.08.24", "09.08.24", "10.08.24"]
    // const prices = [44,22,11,5,23,12,777,21,1,99];
    const [data, setData] = React.useState({country: [], gdp: []});

    React.useEffect(async () => {
      const response = await fetch("http://127.0.0.1:5000/data", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const responseData = await response.json();
      const country = responseData.map(item => item.country);
      const gdp = responseData.map(item => item.gdpPercap);
      // console.log(`yecountryars: ${years}, gdp:${gdp[0]}`);
      setData({country: country, gdp: gdp});
      // console.log(data);
    }, [])

    return (
   <div>
    <h1>Hello world!</h1>
    {/* <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      /> */}
     <Plot
      data={[
        {
          x: data.country,
          y: data.gdp,
          type: "bar",
          mode: "lines+markers",
          marker: { color: "blue" },
          name: "GDP per Capita",
        },
      ]}
      layout={{
        title: "Price History",
        xaxis: { title: "Country" },
        yaxis: { title: "GDP per capita" },
      }}
      config={{ staticPlot: true }}
    />
   </div>
  );
}
