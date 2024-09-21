import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import { LanguageContext } from "../../context/LanguageContext";

let steps = ["Budget", "Use case", "Portability", "Operating system"];

// TODO:
// Clean this mess!!! Maybe separate components for each language. 
export default function PhoneHorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [budget, setBudget] = React.useState(0);
  const [useCase, setUseCase] = React.useState(["basic"]);
  const [portability, setPortability] = React.useState(0);
  const [os, setOS] = React.useState(null);

  const nextRef = React.useRef();
  const router = useRouter();
  const { lang, setLang } = React.useContext(LanguageContext);

  function valuetext(value) {
    return `${value}$`;
  }

  // TODO:
  // Actually implement functionality for optional steps
  const isStepOptional = (step) => {
    return false;
  };

  const osChangeHandler = (e) => {
    setOS(e.target.value);
  };

  const portabilityChangeHandler = (e) => {
    setPortability(e.target.value);
  };

  const useCaseOnChangeHandler = (e) => {
    setUseCase((prev = []) => {
      if (e.target.checked === true) {
        return [...prev, e.target.value];
      } else {
        const index = prev.findIndex((item) => item === e.target.value);
        if (index !== -1) {
          const updatedPrev = [...prev];
          updatedPrev.splice(index, 1);
          return updatedPrev;
        }
      }
    });
  };

  const setBudgetClickHandler = () => {
    setBudget(600);
  };

  const budgetOnChangeHandler = (e) => {
    setBudget(parseInt(e.target.value));
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const stepsEN = ["Budget", "Use case", "Screen size", "Apple / Android"];
  const stepsDE = [
    "Budget",
    "Anwendungsfall",
    "Bildschirmgröße",
    "Apple / Android",
  ];
  const stepsVN = [
    "Ngân sách",
    "Mục đích sử dụng",
    "Kích thước màn hình",
    "Apple / Android",
  ];

  React.useEffect(() => {
    const langCheck = localStorage.getItem("lang");
    setLang(langCheck);
  }, []);

  React.useEffect(() => {
    if (activeStep === steps.length) {
      const newParams = {};
      if (budget > 0) newParams.budget = budget;
      if (portability != 1) {
        console.log("portability: ", portability)
        newParams.portability = portability;
      }
      if (os) newParams.os = os;
      if (useCase) {
        newParams.useCase = useCase;
        useCase.map((el) => {
          if (el === "basic") {
            newParams.ram = [4, 6, 8];
            newParams.memory = null;
            newParams.gaming = false
          }
          if (el === "photos") {
            newParams.ram = [8, 12];
            newParams.memory = ["256GB", "512GB"];
            newParams.gaming = false
            newParams.photos = true
          }
          if (el === "productivity") {
            newParams.ram = [8, 12];
            newParams.memory = ["256GB", "512GB"];
            newParams.gaming = false
            newParams.productivity = true
          }
          if (el === "gaming") {
            newParams.ram = [8, 12];
            newParams.memory = ["256GB", "512GB"];
            newParams.gaming = true
          }
        });
      }
      localStorage.setItem("params", JSON.stringify(newParams));
      router.push("/phone-result");
    }
  }, [activeStep]);

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: "1200px", margin: "auto", mt: 10, wordBreak:"break-word" }}>
        <Stepper alternativeLabel activeStep={activeStep}>
          {lang === "EN" &&
            stepsEN.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}

          {lang === "DE" &&
            stepsDE.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}

          {lang === "VN" &&
            stepsVN.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <Box
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
                    textAlign: "center",
                    fontSize: "clamp(1.5rem, 10vw, 2.5rem)",
                    color: (theme) =>
                      theme.palette.mode === "light"
                        ? "primary.main"
                        : "primary.light",
                  }}
                >
                  {lang === "EN" && "Do you have a maximum budget?"}
                  {lang === "DE" && "Haben Sie ein maximales Budget?"}
                  {lang === "VN" && "Bạn có một ngân sách tối đa không?"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    // alignItems: "center",
                    pt: { xs: 5, sm: 7 },
                    pb: { xs: 5, sm: 12 },
                  }}
                >
                  <Button
                    onClick={setBudgetClickHandler}
                    sx={{ marginRight: 7 }}
                    variant="contained"
                  >
                    {lang === "EN" && "Yes"}
                    {lang === "DE" && "Ja"}
                    {lang === "VN" && "Vâng"}
                  </Button>
                  <Button
                    onClick={() => {
                      setBudget(0);
                      nextRef.current.click();
                    }}
                    variant="contained"
                  >
                    {lang === "EN" && "No"}
                    {lang === "DE" && "Nein"}
                    {lang === "VN" && "Không"}
                  </Button>
                </Box>
                {budget > 0 && (
                  <>
                    <h1>{`${budget}$`}</h1>
                    <Box sx={{ width: 300 }}>
                      <Slider
                        aria-label="Budget"
                        defaultValue={600}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        shiftStep={100}
                        step={20}
                        min={200}
                        max={3000}
                        onChange={budgetOnChangeHandler}
                      />
                    </Box>
                  </>
                )}
              </Box>
            )}
            {activeStep === 1 && (
              <>
                <Box
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
                      textAlign: "center",
                      fontSize: "clamp(1.5rem, 10vw, 2.5rem)",
                      color: (theme) =>
                        theme.palette.mode === "light"
                          ? "primary.main"
                          : "primary.light",
                    }}
                  >
                    {lang === "EN" && "What you will mostly use it for?"}
                    {lang === "DE" &&
                      "Wofür werden Sie es hauptsächlich verwenden?"}
                    {lang === "VN" && "Bạn sẽ sử dụng nó chủ yếu để làm gì?"}
                  </Typography>
                  <Box>
                    <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"basic"}
                              checked
                            />
                          }
                          label={lang === "EN" ? "General web browsing, videos." : lang === "DE" ? "Allgemeines Surfen im Internet, Videos." : lang === "VN" ? "Duyệt web chung, xem video." : ""}
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"photos"}
                            />
                          }
                          label={lang === "EN" ? "Photos, Photos, Photos" : lang === "DE" ? "Fotos, Fotos, Fotos" : lang === "VN" ? "Ảnh, Ảnh, Ảnh" : ""}
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"productivity"}
                            />
                          }
                          label={lang === "EN" ? "Productivity." : lang === "DE" ? "Produktivität." : lang === "VN" ? "Năng suất." : ""}
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"gaming"}
                            />
                          }
                          label={lang === "EN" ? "Gaming." : lang === "DE" ? "Gaming." : lang === "VN" ? "Chơi game." : ""}
                        />
                    </FormGroup>
                  </Box>
                </Box>
              </>
            )}
            {activeStep === 2 && (
              <>
                <Box
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
                      textAlign: "center",
                      fontSize: "clamp(1.5rem, 10vw, 2.5rem)",
                      color: (theme) =>
                        theme.palette.mode === "light"
                          ? "primary.main"
                          : "primary.light",
                    }}
                  >
                    {lang === "EN" && "How important is the screen size for you?"}
                    {lang === "DE" && "Wie wichtig ist die Bildschirmgröße für Sie?"}
                    {lang === "VN" &&
                      "Kích thước màn hình quan trọng như thế nào đối với bạn?"}
                  </Typography>
                  <Box>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="portability-question-label-group"
                        defaultValue={1}
                        name="portability-buttons-group"
                      >
                          <FormControlLabel
                            value={1}
                            control={
                              <Radio onChange={portabilityChangeHandler} />
                            }
                            label={lang === "EN" ? "Not important at all." : lang === "DE" ? "Überhaupt nicht wichtig." : lang === "VN" ? "Không quan trọng lắm." : ""}
                          />


                          <FormControlLabel
                            value={"small"}
                            control={
                              <Radio onChange={portabilityChangeHandler} />
                            }
                            label={lang === "EN" ? "Smaller is better!" : lang === "DE" ? "Kleiner ist besser!" : lang === "VN" ? "Nhỏ hơn thì tốt hơn!" : ""}
                          />

                          <FormControlLabel
                            value={"large"}
                            control={
                              <Radio onChange={portabilityChangeHandler} />
                            }
                            label={lang === "EN" ? "Larger is better!" : lang === "DE" ? "Größer ist besser!" : lang === "VN" ? "Lớn hơn thì tốt hơn!" : ""}
                          />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Box>
              </>
            )}
            {activeStep === 3 && (
              <>
                <Box
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
                      textAlign: "center",
                      fontSize: "clamp(1.5rem, 10vw, 2.5rem)",
                      color: (theme) =>
                        theme.palette.mode === "light"
                          ? "primary.main"
                          : "primary.light",
                    }}
                  >
                    {lang === "EN" &&
                      "Do you have any operating system preference?"}
                    {lang === "DE" && "Haben Sie eine Betriebssystem-Vorliebe?"}
                    {lang === "VN" &&
                      "Bạn có thích hệ điều hành nào đặc biệt không?"}
                  </Typography>
                  <Box>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="os-radio-buttons-group-label"
                        defaultValue={0}
                        name="OSradio-buttons-group"
                      >
                          <FormControlLabel
                            value={"Android"}
                            control={<Radio onChange={osChangeHandler} />}
                            label={lang === "EN" ? "Yes!" : lang === "DE" ? "Ja!" : lang === "VN" ? "Vâng!" : ""}
                          />

                        {os && (
                          <FormControl
                            sx={{ marginTop: 2, marginBottom: 2 }}
                            fullWidth
                          >
                            <InputLabel id="demo-simple-select-label">
                              OS
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={os}
                              label="Operating system"
                              onChange={osChangeHandler}
                            >
                              <MenuItem value={"Android"}>Android</MenuItem>
                              <MenuItem value={"iOS"}>Apple</MenuItem>
                            </Select>
                          </FormControl>
                        )}
                          <>
                            <FormControlLabel
                              value={1}
                              control={<Radio />}
                              label={lang === "EN" ? "Not really." : lang === "DE" ? "Nicht wirklich." : lang === "VN" ? "Không quá." : ""}
                            />

                            <FormControlLabel
                              value={0}
                              control={<Radio />}
                              label={lang === "EN" ? "I am not sure." : lang === "DE" ? "Ich bin mir nicht sicher." : lang === "VN" ? "Tôi chưa chắc." : ""}
                            />
                          </>
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Box>
              </>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                {lang === "EN" && "Back"}
                {lang === "DE" && "Zurück"}
                {lang === "VN" && "Quay lại"}
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button ref={nextRef} onClick={handleNext}>
                {lang === "EN" && activeStep === steps.length - 1 && "Finish"}
                {lang === "EN" && activeStep != steps.length - 1 && "Next"}
                {lang === "DE" &&
                  activeStep === steps.length - 1 &&
                  "Fertigstellen"}
                {lang === "DE" && activeStep != steps.length - 1 && "Weiter"}
                {lang === "VN" &&
                  activeStep === steps.length - 1 &&
                  "Hoàn thành"}
                {lang === "VN" && activeStep != steps.length - 1 && "Tiếp theo"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </>
  );
}
