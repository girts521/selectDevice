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
// REFACTOR!!! Very similar to phone stepper.
export default function HorizontalLinearStepper() {
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

  const isStepOptional = (step) => {
    return false;
  };

  const osChangeHandler = (e) => {
    setOS(e.target.value);
  };

  const portabilityChangeHandler = (e) => {
    setPortability(parseInt(e.target.value));
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

  const stepsEN = ["Budget", "Use case", "Portability", "Operating system"];
  const stepsDE = [
    "Budget",
    "Anwendungsfall",
    "Portabilität",
    "Betriebssystem",
  ];
  const stepsVN = [
    "Ngân sách",
    "Mục đích sử dụng",
    "Khả năng mang theo",
    "Hệ điều hành",
  ];

  React.useEffect(() => {
    const langCheck = localStorage.getItem("lang");
    setLang(langCheck);
  }, []);

  React.useEffect(() => {
    if (activeStep === steps.length) {
      const newParams = {};
      if (budget > 0) newParams.budget = budget;
      if (portability > 0) newParams.portability = portability;
      if (os) newParams.os = os;
      if (useCase) {
        newParams.useCase = useCase;
        useCase.map((el) => {
          if (el === "basic") {
            newParams.ram = [8];
            newParams.display = null;
            newParams.memory = null;
            newParams.gpu = null;
            newParams.cpu = [3, 5];
          }
          if (el === "office") {
            newParams.ram = [8, 16];
            newParams.display = null;
            newParams.memory = ["256GB", "512GB", "1TB", "2TB"];
            newParams.gpu = null;
            newParams.cpu = [3, 5];
          }
          if (el === "design") {
            newParams.ram = [16, 32];
            newParams.display = 2;
            newParams.memory = ["512GB", "1TB", "2TB", "4TB", "6TB"];
            newParams.gpu = null;
            newParams.cpu = [5, 7];
          }
          if (el === "programming") {
            newParams.ram = [16, 32];
            newParams.display = null;
            newParams.memory = ["1TB", "2TB", "4TB", "6TB"];
            newParams.gpu = null;
            newParams.cpu = [5, 7, 9];
          }

          if (el === "gaming") {
            newParams.ram = [32, 64];
            newParams.display = 1;
            newParams.memory = ["1TB", "2TB", "3TB", "4TB", "5TB"];
            newParams.gpu = [3060, 3080, 3090, 4070, 4080, 4090];
            newParams.cpu = [5, 7, 9];
            newParams.os = "Windows";
          }
        });
      }
      localStorage.setItem("params", JSON.stringify(newParams));
      router.push("/result");
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
                        step={100}
                        min={200}
                        max={6000}
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
                      {lang === "EN" && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"basic"}
                              checked
                            />
                          }
                          label="General web browsing, videos."
                        />
                      )}

                      {lang === "DE" && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"basic"}
                              checked
                            />
                          }
                          label="Allgemeines Surfen im Internet, Videos."
                        />
                      )}

                      {lang === "VN" && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"basic"}
                              checked
                            />
                          }
                          label="Duyệt web chung, xem video."
                        />
                      )}

                      {lang === "EN" && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"office"}
                            />
                          }
                          label="Office work, documents, presentations."
                        />
                      )}

                      {lang === "DE" && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"office"}
                            />
                          }
                          label="Büroarbeit, Dokumente, Präsentationen."
                        />
                      )}

                      {lang === "VN" && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"office"}
                            />
                          }
                          label="Công việc văn phòng, tài liệu, trình chiếu."
                        />
                      )}

                      {lang === "EN" && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"design"}
                            />
                          }
                          label="Design or graphical work."
                        />
                      )}

                      {lang === "DE" && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"design"}
                            />
                          }
                          label="Design- oder Grafikarbeiten."
                        />
                      )}

                      {lang === "VN" && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"design"}
                            />
                          }
                          label="Thiết kế hoặc thiết kế đồ họa."
                        />
                      )}

                      {lang === "EN" && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"programming"}
                            />
                          }
                          label="Programming."
                        />
                      )}

                      {lang === "DE" && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"programming"}
                            />
                          }
                          label="Programmierung."
                        />
                      )}

                      {lang === "VN" && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"programming"}
                            />
                          }
                          label="Lập trình."
                        />
                      )}

                      {lang === "EN" && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"gaming"}
                            />
                          }
                          label="Gaming."
                        />
                      )}

                      {lang === "DE" && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"gaming"}
                            />
                          }
                          label="Gaming."
                        />
                      )}

                      {lang === "VN" && (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={useCaseOnChangeHandler}
                              value={"gaming"}
                            />
                          }
                          label="Chơi game."
                        />
                      )}
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
                    {lang === "EN" && "How important is portability for you?"}
                    {lang === "DE" && "Wie wichtig ist Mobilität für Sie?"}
                    {lang === "VN" &&
                      "Bạn nghĩ khả năng mang theo quan trọng như thế nào đối với bạn?"}
                  </Typography>
                  <Box>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="portability-question-label-group"
                        defaultValue={1}
                        name="portability-buttons-group"
                      >
                        {lang === "EN" && (
                          <FormControlLabel
                            value={1}
                            control={
                              <Radio onChange={portabilityChangeHandler} />
                            }
                            label="Not important at all. I will mostly work from one location."
                          />
                        )}

                        {lang === "DE" && (
                          <FormControlLabel
                            value={1}
                            control={
                              <Radio onChange={portabilityChangeHandler} />
                            }
                            label="Überhaupt nicht wichtig. Ich werde hauptsächlich von einem Standort aus arbeiten."
                          />
                        )}

                        {lang === "VN" && (
                          <FormControlLabel
                            value={1}
                            control={
                              <Radio onChange={portabilityChangeHandler} />
                            }
                            label="Không quan trọng lắm. Tôi sẽ chủ yếu làm việc từ một vị trí."
                          />
                        )}
                        {lang === "EN" && (
                          <FormControlLabel
                            value={2}
                            control={
                              <Radio onChange={portabilityChangeHandler} />
                            }
                            label="Somewhat important. Will have to travel with it sometimes."
                          />
                        )}

                        {lang === "DE" && (
                          <FormControlLabel
                            value={2}
                            control={
                              <Radio onChange={portabilityChangeHandler} />
                            }
                            label="Etwas wichtig. Ich werde manchmal damit reisen müssen."
                          />
                        )}

                        {lang === "VN" && (
                          <FormControlLabel
                            value={2}
                            control={
                              <Radio onChange={portabilityChangeHandler} />
                            }
                            label="Có ý nghĩa một chút. Tôi sẽ phải đi du lịch với nó một vài lần."
                          />
                        )}
                        {lang === "EN" && (
                          <FormControlLabel
                            value={3}
                            control={
                              <Radio onChange={portabilityChangeHandler} />
                            }
                            label="Very important. Will have to travel with it daily and work from different locations."
                          />
                        )}

                        {lang === "DE" && (
                          <FormControlLabel
                            value={3}
                            control={
                              <Radio onChange={portabilityChangeHandler} />
                            }
                            label="Sehr wichtig. Ich werde täglich damit reisen und von verschiedenen Standorten aus arbeiten müssen."
                          />
                        )}

                        {lang === "VN" && (
                          <FormControlLabel
                            value={3}
                            control={
                              <Radio onChange={portabilityChangeHandler} />
                            }
                            label="Rất quan trọng. Tôi sẽ phải đi lại với nó hàng ngày và làm việc từ nhiều vị trí khác nhau."
                          />
                        )}
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
                        {lang === "EN" && (
                          <FormControlLabel
                            value={"Windows"}
                            control={<Radio onChange={osChangeHandler} />}
                            label="Yes!"
                          />
                        )}

                        {lang === "DE" && (
                          <FormControlLabel
                            value={"Windows"}
                            control={<Radio onChange={osChangeHandler} />}
                            label="Ja!"
                          />
                        )}

                        {lang === "VN" && (
                          <FormControlLabel
                            value={"Windows"}
                            control={<Radio onChange={osChangeHandler} />}
                            label="Vâng!"
                          />
                        )}
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
                              <MenuItem value={"Windows"}>Windows</MenuItem>
                              <MenuItem value={"MacOS"}>MacOS</MenuItem>
                              <MenuItem value={"Linux"}>Linux</MenuItem>
                              {lang === "EN" && (
                                <MenuItem value={"Other"}>Other</MenuItem>
                              )}

                              {lang === "DE" && (
                                <MenuItem value={"Other"}>Andere</MenuItem>
                              )}

                              {lang === "VN" && (
                                <MenuItem value={"Other"}>Khác</MenuItem>
                              )}
                            </Select>
                          </FormControl>
                        )}
                        {lang === "EN" && (
                          <>
                            <FormControlLabel
                              value={1}
                              control={<Radio />}
                              label="Not really."
                            />

                            <FormControlLabel
                              value={0}
                              control={<Radio />}
                              label="I am not sure."
                            />
                          </>
                        )}

                        {lang === "DE" && (
                          <>
                            <FormControlLabel
                              value={1}
                              control={<Radio />}
                              label="Nicht wirklich."
                            />

                            <FormControlLabel
                              value={0}
                              control={<Radio />}
                              label="Ich bin mir nicht sicher."
                            />
                          </>
                        )}

                        {lang === "VN" && (
                          <>
                            <FormControlLabel
                              value={1}
                              control={<Radio />}
                              label="Không quá."
                            />

                            <FormControlLabel
                              value={0}
                              control={<Radio />}
                              label="Tôi chưa chắc."
                            />
                          </>
                        )}
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
