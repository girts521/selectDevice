import * as React from "react";
import MistralClient from "@mistralai/mistralai";
import data from "../../static/laptops.json";
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
import { useRouter } from 'next/router'

export default function Result() {
  const [params, setParams] = React.useState({});
  const [filteredResult, setFilteredResult] = React.useState([]);
  const [answer, setAnswer] = React.useState("");
  const [isDisabled, setisDisabled] = React.useState(false);
  const [loading, setloading] = React.useState(false)

  const router = useRouter();

  React.useEffect(() => {
    const newParams = JSON.parse(localStorage.getItem("params"));
    if (newParams) {
      setParams(newParams);
    }
    
  }, []);

  React.useEffect(() => {
    function filterLaptops(laptops, params) {
      return laptops
        .filter((laptop) => {
          // Check if the laptop price is within the budget
          if (params.budget && laptop.price > params.budget) {
            return false;
          }

          // Check if the laptop OS matches the specified OS (assuming the OS is specified in the laptop name)
          if (params.os && !laptop.os.includes(params.os)) {
            return false;
          }

          // Check if the laptop RAM matches the specified RAM
          if (params.ram[0] && !laptop.ram.includes(params.ram[0])) {
            return false;
          }

          // Check if the laptop display size matches the specified display size
          //   const displaySize = parseFloat(laptop.display[0].split(' ')[0]);
          //   if (displaySize !== params.display) {
          //     return false;
          //   }

          // Check if the laptop memory matches the specified memory
          const laptopMemory = laptop.memory[0];
          if (params.memory && !params.memory.includes(laptopMemory)) {
            return false;
          }

          // Check if the laptop CPU matches the specified CPU

          if (laptop.os != "MacOS") {
            console.log("here");
            if (params.cpu && !params.cpu.includes(laptop.cpu[0])) {
              return false;
            }
          }

          // Check if portability matches
          if (params.portability && laptop.portability < params.portability) {
            console.log("port: ", laptop.portability);
            return false;
          }

          // If all checks pass, return true to include the laptop in the filtered list
          return true;
        })
        .slice(0, 5); // Limit the results to 5 laptops
    }
    if (Object.keys(params).length > 0) {
      console.log("params: ", params);
      const result = filterLaptops(data.laptops, params);

      if (result) {
        console.log("result: ", result);
        setFilteredResult(result);
      }
    }
  }, [params]);

  const handleClick = (url) => {
    router.push(url)
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filteredResult, params }),
    });
    
    const data = await response.json();
    setAnswer(data.answer);
    setloading(false)
  };

  return (
    <>
      <My_AppBar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
          }}
        >
          Any of these should work for you!&nbsp;
        </Typography>
        {filteredResult
          ? filteredResult.map((result) => {
              return (
                <>
                  <Card
                    onClick={() => {handleClick(result.url)}}
                    sx={{
                      width: "80%",
                      minWidth: 250,
                      cursor: "pointer",
                      marginBottom: 15,
                      p: 7,
                    }}
                  >
                    <img
                      src={result.img[0]}
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
                        Display: {result.display}
                      </Typography>
                      <Typography
                        component={"div"}
                        variant="body2"
                        color="text.secondary"
                      >
                        Ram: {result.ram}
                      </Typography>
                      <Typography
                        component={"div"}
                        variant="body2"
                        color="text.secondary"
                      >
                        Storage: {result.memory}
                      </Typography>
                      {result.gpu && (
                        <Typography
                          component={"div"}
                          variant="body2"
                          color="text.secondary"
                        >
                          Graphics card: {result.gpu}
                        </Typography>
                      )}
                      <Typography
                        component={"div"}
                        variant="body2"
                        color="text.secondary"
                      >
                        Processor unit:{" "}
                        {!isNaN(result.cpu)
                          ? `Intel i${result.cpu}`
                          : `Apple ${result.cpu}`}
                      </Typography>
                      <Typography
                        component={"div"}
                        variant="body2"
                        color="text.secondary"
                      >
                        Portability score (higher is better):{" "}
                        {result.portability}
                      </Typography>
                      <Typography
                        component={"div"}
                        variant="body2"
                        color="text.secondary"
                      >
                        Operating system:{" "}
                        {result.os.map((os) => {
                          if (result.os.indexOf(os) === result.os.length - 1) {
                            return `${os}.`;
                          } else {
                            return `${os}, `;
                          }
                        })}
                      </Typography>
                      <Typography
                        component={"div"}
                        variant="body1"
                        color="text.primary"
                      >
                        Price: {`${result.price}€`}
                      </Typography>
                      <Link href={result.url}>Check it out on Amazon</Link>
                    </CardContent>
                  </Card>
                </>
              );
            })
          : "Loading..."}
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
          Still a bit lost?&nbsp;
        </Typography>
        <Typography
          textAlign="center"
          color="text.primary"
          sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" }, pb: 7 }}
        >
          If you are still not sure about which one will be better and why, then
          you can let our AI narrow it down and explain a bit more.
        </Typography>
        <Button
          onClick={getAnswer}
          disabled={isDisabled}
          variant="contained"
          size="large"
        >
          HELP ME!
        </Button>
        {answer && (
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              m: { xs: 8, sm: 12 },
              p: 7,
            }}
          >
            {" "}
            <ul style={{ listStyleType: "none" }}>{formatText(answer)}</ul>
          </Paper>
        )}
        {loading && (
          <Box sx={{ display: "flex", m: 7}}>
            <CircularProgress />
          </Box>
        )}
      </Container>
      <Footer />
    </>
  );
}
