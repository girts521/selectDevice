import * as React from "react";
import MistralClient from "@mistralai/mistralai";
import data from "../../static/laptops.json";

const apiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;
console.log("data: ", data);

const client = new MistralClient(apiKey);

export default function Result() {
  const [params, setParams] = React.useState({});
  const [filteredResult, setFilteredResult] = React.useState([]);

  React.useEffect(() => {
    const newParams = JSON.parse(localStorage.getItem("params"));
    if (newParams) {
      setParams(newParams);
    }

    const context = `Always provide information only using this information (never suggest anything thats not in this file, do not provide information if its not in this file): ${JSON.stringify(
      data.laptops
    )}`;

    const callChat = async () => {
      const chatResponse = await client.chat({
        model: "open-mistral-7b",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: context },
          {
            role: "user",
            content:
              "What is the best laptop for general use? Should be cheap without gpu and with 8GB of ram. Respond only with a json object with exactly the same format as in the provided file, sort it based on the price. Dont include anything except json in your response.",
          },
        ],
      });
      console.log("Chat:", chatResponse.choices[0].message.content);
    };
    // callChat()
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

  return (
    <>
      <h1>result</h1>
    </>
  );
}
