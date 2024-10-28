
export const fetchPriceHIstory = async (setData, productId) => {
    console.log("product id: ", productId);
    const response = await fetch(
      `https://api.mytechfinder.info/data?id=${productId}`,
      // `http://localhost:5000/data?id=${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    const price = responseData.map((item) => item[3]);
    const date = responseData.map((item) => item[2]);
    console.log("data: ", date);
    setData({ price: price, date: date });
  };

  export const fetchSentimentData = async (setSentiment, productId) => {
    const response = await fetch(
      `https://api.mytechfinder.info/data/get_sentiment?id=${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status != 404) {
      const responseData = await response.json();
      console.log("res: ", responseData);
      const sentimentArray = responseData.map((item) => item.label);
      const sentimentCounts = sentimentArray.reduce((acc, sentiment) => {
        acc[sentiment] = (acc[sentiment] || 0) + 1;
        return acc;
      }, {});
      setSentiment(sentimentCounts);
    }
  };

  export const fetchRelatedProducts = async (setRelatedProdArray, productId) => {
    const response = await fetch(
      `https://api.mytechfinder.info/data/get_related_products?id=${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status != 404) {
      const responseData = await response.json();
      console.log("res: ", responseData);
      setRelatedProdArray(responseData);
    }
  };

  export const fetchProductData = async (setProductData, productId) => {
    const response = await fetch(
      `https://api.mytechfinder.info/data/get_product_info?id=${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status != 404) {
      const responseData = await response.json();
      // console.log("response from product: ", responseData.title);
      setProductData({
        title: responseData.title,
        current_price: responseData.current_price,
        discount: responseData.discount,
        image: responseData.image,
        date_last_update: responseData.date_last_update,
        brand: responseData.brand,
        search_term: responseData.search_term,
        rating: responseData.rating,
        review_count: responseData.review_count,
        sentiment: responseData.sentiment,
      });
      return responseData;
    }
  };