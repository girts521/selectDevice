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
              padding: { xs: 2, sm: 4 }, // Add padding for mobile
              overflow: "hidden",
          }}
      >
          <Plot
              data={[{ x: data.date, y: data.price, type: "scatter", mode: "lines+markers", marker: { color: "blue" }, name: "GDP per Capita" }]}
              layout={{
                  title: "Price History",
                  xaxis: { title: "Date" },
                  yaxis: { title: "Price in Euro" },
                  autosize: true,
                  margin: { l: 40, r: 20, t: 40, b: 50 }, // Adjust margins for better mobile view
              }}
              style={{ width: "90%", maxWidth: "100%", height: "300px" }} // Adjust height for mobile
              config={{ responsive: true }}
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
                    padding: { xs: 2, sm: 4 }, // Add padding for better spacing
                    overflow: "hidden", // Ensure no overflow
                }}
            >
                <Plot
                    data={[
                        {
                            labels: Object.keys(sentiment),
                            values: Object.values(sentiment),
                            type: "pie",
                            marker: { colors: ["#1f77b4", "#ff7f0e", "#2ca02c"] }, // Example color customization
                        },
                    ]}
                    layout={{
                        title: "Feedback Sentiment",
                        autosize: true,
                        margin: { l: 10, r: 10, t: 40, b: 10 }, // Smaller margins for mobile
                        height: 300, // Reduced height for mobile-friendly view
                    }}
                    config={{ responsive: true, staticPlot: true }}
                    style={{ width: "90%", maxWidth: "100%", height: "auto" }} // Ensure responsive scaling
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
