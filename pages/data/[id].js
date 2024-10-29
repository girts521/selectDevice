import * as React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import InfoTable from "./infoTable"
import ProductCategory from "../../components/ProductCard/productCategory"
import Image from "next/image";
import { LanguageContext } from "../../context/LanguageContext";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import {fetchPriceHIstory, fetchSentimentData, fetchProductData, fetchRelatedProducts} from "./fetchData"
import Box from "@mui/material/Box";
// import {margin} from "plotly.js/src/plots/layout_attributes";

export default function ProductDashboard() {
  const router = useRouter();
  let productId = router.query;
  const [data, setData] = React.useState({ price: [], date: [] });
  const [sentiment, setSentiment] = React.useState(null);
  const [relatedProdArray, setRelatedProdArray] = React.useState([]);
  const [productData, setProductData] = React.useState({});
  const [relatedProducts, setRelatedProducts] = React.useState([]);
  const { lang, setLang } = React.useContext(LanguageContext);

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
    const langCheck = localStorage.getItem("lang");
    setLang(langCheck);
  }, [relatedProdArray])

  const handleClick = (e, url) => {
    e.preventDefault();
    router.push(url);
  };


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
                padding: {xs: 2, sm: 4}, // Add padding for mobile
                overflow: "hidden",
                marginBottom: 15,
            }}
        >
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15
            }}>
                <InfoTable title={productData.title} minPrice={Math.min(...data.price)}
                           maxPrice={Math.max(...data.price)} discount={productData.discount}
                           current_price={productData.current_price}/>
            </Box>

            <h2 style={{
                textAlign: "center",
                marginBottom: 7
            }}>
              {lang === "EN" && "Price history"}  
              {lang === "DE" && "Preisverlauf"}
              {lang === "VN" && "Lịch sử giá"}
              </h2>
            <Plot
                data={[{
                    x: data.date,
                    y: data.price,
                    type: "scatter",
                    mode: "lines+markers",
                    marker: {color: "blue"},
                    name: "GDP per Capita"
                }]}
                layout={{
                    xaxis: {title: "Date"},
                    yaxis: {title: "Price in Euro"},
                    autosize: true,
                    margin: {l: 40, r: 20, t: 40, b: 50}, // Adjust margins for better mobile view
                }}
                style={{width: "100%", maxWidth: "100%", height: "300px"}} // Adjust height for mobile
                config={{responsive: true}}
            />
            <Typography  sx={{
                textAlign: "center",
                marginTop: 5
            }}>
              {lang === "EN" && "Information is collected daily from amazon, but only the products that currently have a discount are viewed. Thus, in the graph above the price is displayed \
              from days when the product was viewed and had a discount."}  
              {lang === "DE" && "Informationen werden täglich von Amazon gesammelt, jedoch werden nur Produkte betrachtet, \
              die aktuell einen Rabatt haben. Daher zeigt das obige Diagramm den Preis an den Tagen an, an denen das Produkt mit Rabatt betrachtet wurde."}
              {lang === "VN" && "Thông tin được thu thập hàng ngày từ Amazon, nhưng chỉ những sản phẩm đang giảm giá mới được xem xét. Do đó, trên biểu đồ \
              trên, giá hiển thị là từ những ngày sản phẩm được xem và có giảm giá."}
            </Typography>
        </Container>
        {sentiment && (
            <>
                <h2 style={{
                    textAlign: "center",
                    marginBottom: 7
          }}>
             {lang === "EN" && "Customer sentiment"}  
             {lang === "DE" && "Kundenstimmung"}  
             {lang === "VN" && "Phân Tích Cảm Xúc Khách Hàng"}  
          </h2>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    padding: { xs: 2, sm: 4 }, // Add padding for better spacing
                    overflow: "hidden", // Ensure no overflow
                    marginBottom: 15
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
                        autosize: true,
                        margin: { l: 10, r: 10, t: 40, b: 10 }, // Smaller margins for mobile
                        height: 300, // Reduced height for mobile-friendly view
                    }}
                    config={{ responsive: true, staticPlot: true }}
                    style={{ width: "100%", maxWidth: "100%", height: "auto" }} // Ensure responsive scaling
                />
                <Typography  sx={{
                    textAlign: "center",
                    marginTop: 5
                }}>
                  {lang === "EN" && "Sentiment is based on the feedback provided by the customers on amazon product page. The sentiment of each comment is analyzed using a special AI model, that provides the score from 5 to 1, where \
                    5 means very positive and 1 very negative. The actual feedback is not collected, you can view it on amazon."}  
                  {lang === "DE" && "Die Stimmung basiert auf dem Feedback der Kunden auf der Amazon-Produktseite. Die Stimmung jedes Kommentars wird mit einem speziellen KI-Modell analysiert, das eine Bewertung von 5 bis 1 vergibt, \
                  wobei 5 für sehr positiv und 1 für sehr negativ steht. Das eigentliche Feedback wird nicht erfasst; Sie können es auf Amazon einsehen."}  
                  {lang === "VN" && "Cảm xúc được dựa trên phản hồi của khách hàng trên trang sản phẩm Amazon. Cảm xúc của mỗi nhận xét được phân tích bằng một mô hình AI đặc biệt, cung cấp điểm từ 5 đến 1, trong đó 5 là rất tích \
                  cực và 1 là rất tiêu cực. Phản hồi thực tế không được thu thập; bạn có thể xem nó trên Amazon."}  
                </Typography>
            </Container>
        </>
      )}
      <Container>
        {relatedProducts.length > 1 &&
            <>
                <h2 style={{
                    textAlign: "center",
                    marginBottom: 25
                }}>
              {lang === "EN" && "Similar products"}  
             {lang === "DE" && "Ähnliche Produkte"}  
             {lang === "VN" && "Sản phẩm Tương tự"}  
                </h2>
            <ProductCategory elevation={1} title={"Related products"} productArr={relatedProducts} handleClick={handleClick} />
            </>
        }
      </Container>
    </>
  );
}
