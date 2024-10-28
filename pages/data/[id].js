import * as React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import InfoTable from "./infoTable"
import ProductCategory from "../../components/ProductCard/productCategory"

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import {fetchPriceHIstory, fetchSentimentData, fetchProductData, fetchRelatedProducts} from "./fetchData"

export default function ProductDashboard() {
  const router = useRouter();
  let productId = router.query;
  const [data, setData] = React.useState({ price: [], date: [] });
  const [sentiment, setSentiment] = React.useState(null);
  const [relatedProdArray, setRelatedProdArray] = React.useState([]);
  const [productData, setProductData] = React.useState({
    title: "",
    current_price: 0,
    discount: 0,
    image: "",
    date_last_update: "",
    brand: "",
    search_term: "",
    rating: "",
    review_count: 0,
    sentiment: "",
  });
  const [relatedProducts, setRelatedProducts] = React.useState([{
    title: "",
    current_price: 0,
    discount: 0,
    image: "",
    date_last_update: "",
    brand: "",
    search_term: "",
    rating: "",
    review_count: 0,
    sentiment: "",
  }]);

  React.useEffect(() => {
    if (router.isReady) {
      productId = router.query.id;
      fetchSentimentData(setSentiment, productId);
      fetchPriceHIstory(setData, productId);
      fetchProductData(setProductData, productId);
      fetchRelatedProducts(setRelatedProdArray, productId);
    }
  }, [router.isReady, router.query.id])

  React.useEffect(() => {
    if (relatedProdArray.length > 1)
    {
      relatedProdArray.forEach(async (prodId) => {
        const product = await fetchProductData(() => {}, prodId)
        console.log("check this: ", product)
        setRelatedProducts((prevProducts) => [...prevProducts, product]);
      })
    }
  }, [relatedProdArray])

  return (
    <>
      {productData && 
      <Typography
        variant="h1"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'column' },
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 'clamp(1.5rem, 10vw, 2.5rem)',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 }
        }}
      >
      {productData.title}
      </Typography>
      }
      <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            // overflow: "hidden", // Ensure that content does not overflow the container
          }}
      >
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
              xaxis: { title: "Date" },
              yaxis: { title: "Price in Euro" },
              autosize: true, // Makes the plot responsive
              width: "100%", // Ensure plot adapts to the container
            }}
            style={{ width: "100%", maxWidth: "90vw", height: "400px" }} // Set maxWidth to limit the overflow
            config={{ responsive: true }} // Enable responsive configuration
        />
      <InfoTable title={productData.title} minPrice={Math.min(...data.price)} maxPrice={Math.max(...data.price)} discount={productData.discount} current_price={productData.current_price}/>
      </Container>
      {sentiment && (
        <>
          <h2>Sentiment pie</h2>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    // overflow: "hidden", // Ensure that content does not overflow the container
                }}
            >
                <Plot
                data={[
                  {
                    labels: Object.keys(sentiment),
                    values: Object.values(sentiment),
                    type: "pie",
                    mode: "lines+markers",
                    marker: { color: "blue" },
                    name: "GDP per Capita",
                  },
                ]}
                layout={{
                  title: "Feedback sentiment",
                  xaxis: { title: "Country" },
                    autosize: true, // Makes the plot responsive
                    width: "100%", // Ensure plot adapts to the container
                }}
                config={{ staticPlot: false }}
            />
          </Container>
        </>
      )}
      <Container>
        {relatedProducts &&

            <ProductCategory elevation={1} title={"Related products"} productArr={relatedProducts} handleClick={() => {}} />
        }
      </Container>
    </>
  );
}
