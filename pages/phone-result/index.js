import * as React from "react";
import MistralClient from "@mistralai/mistralai";
// import data from "../../static/phones.json";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import My_AppBar from "../../components/AppBar";
import Footer from "../../components/Footer";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { LanguageContext } from "../../context/LanguageContext";

export default function PhoneResult() {
  const [params, setParams] = React.useState({});
  const [filteredResult, setFilteredResult] = React.useState([]);
  const [answer, setAnswer] = React.useState("");
  const [isDisabled, setisDisabled] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const { lang, setLang } = React.useContext(LanguageContext);
  const [data, setData] = React.useState({});

  const router = useRouter();

  React.useEffect(() => {
    const newParams = JSON.parse(localStorage.getItem("params"));
    if (newParams) {
      setParams(newParams);
    }
    const langCheck = localStorage.getItem("lang");
    setLang(langCheck);

    const getData = async () => {
      const response = await fetch("/api/phones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log("phones: ", result)
      setData(result)
    };

    getData()

    }, []);

  React.useEffect(() => {
    console.log("params: ", params)
    if (Object.keys(params).length > 0 && Object.keys(data).length > 0) {
      function filterPhones(phones, params) {
        console.log("phones inside func: ", phones)
        return phones
          .filter((phone) => {
            // Check if the  price is within the budget
            if (params.budget && phone.price > params.budget) {
              return false;
            }
            
            if (!params.budget && phone.release_date && !phone.release_date.includes("2024")) {
              return false;
            }

            const year = parseInt(phone.release_date.split(" ")[2].replace(',',''))
            if (year < 2023) {
              return false;
            }
  
            // Check if the  OS matches the specified OS (assuming the OS is specified in the laptop name)
            // console.log(phone.os)
            // const os = JSON.parse(phone.os)
            if (params.os && !phone.os.includes(params.os)) {
              return false;
            }
  
            // Check if the  RAM matches the specified RAM
            const phoneRam = JSON.parse(phone.ram)
            let n = params.ram.length - 1
            const resultBool = []
            while(n >= 0){
              console.log("n: ", n)
              console.log("pramas of n: ",params.ram[n] )
              if (!phoneRam.includes(`${params.ram[n]}GB`)) {
                resultBool.push(false)
              } else {
                resultBool.push(true)
              }
              n = n -1;
              console.log("here: ", n)
            }
            console.log("resultBool: ",resultBool)
            if (!resultBool.includes(true)){
              return false;
            }
  
            // Check if the display size matches the specified display size
            //   const displaySize = parseFloat(laptop.display[0].split(' ')[0]);
            //   if (displaySize !== params.display) {
            //     return false;
            //   }
  
            // Check if the memory matches the specified memory
            const phoneMemory = JSON.parse(phone.memory);
            function checkMemory(memory, params) {
              return memory.some(item => params.includes(item));
            }
            if (params.memory) {
              const containsMemory = checkMemory(phoneMemory, params.memory)
              if (!containsMemory) {
                return false;
              }
            }

            const diasplaySize = parseFloat(phone.display_size.split(' ')[0])
            console.log("display: ", diasplaySize)
            if(params.portability === "large" && diasplaySize < 6.6) {
              return false;
            }
            if(params.portability === "small" && diasplaySize > 6.6) {
              return false;
            }
            
            console.log("gpu: ", phone.gpu)
            if(params.gaming === true && !phone.cpu.includes("Snapdragon 8")){
              return false;
            }
  
            // Check if portability matches
            // if (params.portability && phone.portability != params.portability) {
            //   return false;
            // }
  
            // If all checks pass, return true to include the laptop in the filtered list
            return true;
          })
          .slice(0, 10); // Limit the results to 5 laptops
      }

      const result = filterPhones(data.data, params);
      console.log("params: ", params)
      console.log("filtered: ", result)
      if (result) {
        setFilteredResult(result.sort((a, b) => b.price - a.price));
      }
    }
  }, [data,params]);

  const handleClick = (url) => {
    router.push(url);
  };

  function formatText(text) {
    const lines = text.split("\n");
    const formattedLines = lines.map((line) => {
      const match = line.match(/^(\d+)\.(.+)$/);
      if (match) {
        const index = match[1];
        const content = match[2];
        const boldMatch = content.match(/\*\*(.+?)\*\*/);
        if (boldMatch) {
          const boldContent = boldMatch[1];
          const beforeBold = content.slice(0, boldMatch.index);
          const afterBold = content.slice(
            boldMatch.index + boldMatch[0].length
          );
          return (
            <li key={index}>
              <Typography component="span" fontWeight="bold">
                {index}.
              </Typography>{" "}
              <Typography component="span">
                {beforeBold}
                <Typography component="span" fontWeight="bold">
                  {boldContent}
                </Typography>
                {afterBold}
              </Typography>
            </li>
          );
        }
        return (
          <li key={index}>
            <Typography component="span" fontWeight="bold">
              {index}.
            </Typography>{" "}
            <Typography component="span">{content}</Typography>
          </li>
        );
      }
      const boldMatch = line.match(/\*\*(.+?)\*\*/);
      if (boldMatch) {
        const boldContent = boldMatch[1];
        const beforeBold = line.slice(0, boldMatch.index);
        const afterBold = line.slice(boldMatch.index + boldMatch[0].length);
        return (
          <p key={line}>
            <Typography component="span">
              {beforeBold}
              <Typography component="span" fontWeight="bold">
                {boldContent}
              </Typography>
              {afterBold}
            </Typography>
          </p>
        );
      }
      return <p key={line}>{line}</p>;
    });
    return formattedLines;
  }

  const getAnswer = async () => {
    setisDisabled(true);
    setloading(true);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        
      },
      body: JSON.stringify({ filteredResult, params, lang}),
    });

    const data = await response.json();
    setAnswer(data.answer);
    setloading(false);
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pl: { xs: 0 },
          pr: { xs: 0 },
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignSelf: "center",
            fontSize: "clamp(3.5rem, 10vw, 4rem)",
            pb: { xs: 8, sm: 12 },
            textAlign: "center",
          }}
        >
          {lang === "EN" && "Any of these should work for you!"}
          {lang === "DE" &&
            "Jede dieser Optionen sollte für Sie geeignet sein!"}
          {lang === "VN" &&
            "Bất kỳ lựa chọn nào trong số này đều sẽ phù hợp với bạn! "}
        </Typography>
        {filteredResult ? (
          filteredResult.map((result) => {
            return (
              <>
                <Card
                  onClick={() => {
                    handleClick(result.url);
                  }}
                  sx={{
                    width: "80%",
                    minWidth: 250,
                    cursor: "pointer",
                    marginBottom: 15,
                    p: { xs: 0, md: 7 },
                  }}
                >
                  <img
                    src={result.img}
                    alt={result.name}
                    title={result.name}
                    style={{
                      width: "auto",
                      height: "auto",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {result.name}
                    </Typography>
                    <Typography
                      component={"div"}
                      variant="body2"
                      color="text.secondary"
                    >
                      {lang === "EN" && `Display: ${result.display}`}
                      {lang === "DE" && `Bildschirm: ${result.display}`}
                      {lang === "VN" && `Màn hình: ${result.display}`}
                    </Typography>
                    <Typography
                      component={"div"}
                      variant="body2"
                      color="text.secondary"
                    >
                      RAM: {result.ram.replace(/"/g, '').replace(/\[|\]/g, '').replace(/,/g, ' ')}
                    </Typography>
                    <Typography
                      component={"div"}
                      variant="body2"
                      color="text.secondary"
                    >
                      {lang === "EN" && `Storage: ${result.memory.replace(/"/g, '').replace(/\[|\]/g, '').replace(/,/g, ' ')}`}
                      {lang === "DE" && `Speicher: ${result.memory.replace(/"/g, '').replace(/\[|\]/g, '').replace(/,/g, ' ')}`}
                      {lang === "VN" && `Lưu trữ: ${result.memory.replace(/"/g, '').replace(/\[|\]/g, '').replace(/,/g, ' ')}`}
                    </Typography>
                    {result.gpu && (
                      <Typography
                        component={"div"}
                        variant="body2"
                        color="text.secondary"
                      >
                        {(lang === "EN") === `Graphics card: ${result.gpu}`}
                        {(lang === "DE") === `Grafikkarte: ${result.gpu}`}
                        {(lang === "VN") === `Card đồ họa: ${result.gpu}`}
                      </Typography>
                    )}
                    <Typography
                      component={"div"}
                      variant="body2"
                      color="text.secondary"
                    >
                      {lang === "EN" && "Processor unit: "}
                      {lang === "DE" && "Prozessor: "}
                      {lang === "VN" && "Đơn vị xử lý trung tâm: "}
                      {result.cpu}
                      {/* {!isNaN(result.cpu)
                        ? `Intel i${result.cpu}`
                        : `Apple ${result.cpu}`} */}
                    </Typography>
                    <Typography
                      component={"div"}
                      variant="body2"
                      color="text.secondary"
                    >
                      {lang === "EN" && "Screen size: "}
                      {lang === "DE" && "Bildschirmgröße: "}
                      {lang === "VN" && "Kích thước màn hình: "}
                      {result.display_size}
                    </Typography>
                    <Typography
                      component={"div"}
                      variant="body2"
                      color="text.secondary"
                    >
                      OS: {result.os.replace(/"/g, '').replace(/\[|\]/g, '').replace(/,/g, ' ')}
                      {/* {JSON.parse(result.os).map((os) => {
                        if (result.os.indexOf(os) === result.os.length - 1) {
                          return `${os}.`;
                        } else {
                          return `${os}, `;
                        }
                      })} */}
                    </Typography>
                    <Typography
                      component={"div"}
                      variant="body1"
                      color="text.primary"
                    >
                      {lang === "EN" && "Price: "}
                      {lang === "DE" && "Preis: "}
                      {lang === "VN" && "Giá: "}
                      {`${result.price}€`}
                    </Typography>
                    <Link href={result.url}>
                      {lang === "EN" && "Check it out on Amazon"}
                      {lang === "DE" && "Schau es dir auf Amazon an"}
                      {lang === "VN" && "Xem trên Amazon"}
                    </Link>
                  </CardContent>
                </Card>
              </>
            );
          })
        ) : (
          <Box sx={{ display: "flex", m: 7 }}>
            <CircularProgress />
          </Box>
        )}
        <Typography
          variant="h1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignSelf: "center",
            textAlign: "center",
            fontSize: "clamp(3.5rem, 10vw, 4rem)",
            pb: { xs: 8, sm: 12 },
          }}
        >
          {lang === "EN" && "Still a bit lost?\u00a0"}
          {lang === "DE" && "Noch etwas verwirrt?\u00a0"}
          {lang === "VN" && "Vẫn còn lúng túng chút?\u00a0"}
        </Typography>
        <Typography
          textAlign="center"
          color="text.primary"
          sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" }, pb: 7 }}
        >
          {lang === "EN" &&
            "If you are still not sure about which one will be better and why, then\n you can let our AI narrow it down and explain a bit more."}
          {lang === "DE" &&
            "Wenn Sie sich immer noch nicht sicher sind, welche Option besser ist und warum, dann können Sie unsere KI verwenden, um die Auswahl einzugrenzen und weitere Erklärungen zu geben."}
          {lang === "VN" &&
            "Nếu bạn vẫn chưa chắc chắn về sự lựa chọn nào tốt hơn và tại sao, thì bạn có thể để AI của chúng tôi giúp loại bỏ các lựa chọn và giải thích thêm."}
        </Typography>
        <Button
          onClick={getAnswer}
          disabled={isDisabled}
          variant="contained"
          size="large"
        >
          {lang === "EN" && "HELP ME!"}
          {lang === "DE" && "Hilf mir!"}
          {lang === "VN" && "Giúp tôi!"}
        </Button>
        {answer && (
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              m: { xs: 3, sm: 7 },
              p: { xs: 3, sm: 7 },
            }}
          >
            {" "}
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {formatText(answer)}
            </ul>
          </Paper>
        )}
        {loading && (
          <Box sx={{ display: "flex", m: 7 }}>
            <CircularProgress />
          </Box>
        )}
      </Container>
    </>
  );
}
