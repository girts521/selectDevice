import * as React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })


export default function ProductDashboard() {
  const router = useRouter();
  let productId = router.query;
  const [data, setData] = React.useState({ price: [], date: [] });

  React.useEffect(() => {
    if (router.isReady) {
      productId = router.query.id;
      const fetchData = async () => {
        console.log("product id: ", productId);
        const response = await fetch(
          `https://api.mytechfinder.info//data?id=${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        const price = responseData.map(item => item[3]);
        const date = responseData.map(item => item[2]);
        console.log("data: ", date);
        setData({price: price, date: date});
      };
      fetchData();
    }
  }, [router.isReady, router.query.id]);

  return (
    <>
    <h1>Product price history</h1>
    <Plot
      data={[
        {
          x: data.date,
          y: data.price,
          type: "scatter",
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
      config={{ staticPlot: false }}
    />
    </>
  )
}
