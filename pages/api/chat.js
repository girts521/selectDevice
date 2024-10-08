import MistralClient from "@mistralai/mistralai";

export default async function handler(req, res) {
  const apiKey = process.env.MISTRAL_API_KEY;
  const client = new MistralClient(apiKey);

  if (req.method === "POST") {
    const { filteredResult, params, lang } = req.body;
    let type = "laptops"

    if(params.photos) {
      type = "smartphones"
    }

    try {
      const chatResponse = await client.chat({
        model: "open-mistral-7b",
        messages: [
          { role: "system", content: JSON.stringify(filteredResult) },
          {
            role: "user",
            content: `It is very important that you answer only in language: ${lang}. From the ${type} provided in the json object, suggest which will be best for these use cases: ${params.useCase.map(
              (el) => {
                return `${el} `;
              }
            )}. Also explain the reasons why in some detail. But it has to be easy to understand for anyone not very familiar with  ${type}.`,
          },
        ],
      });
      res.status(200).json({ answer: chatResponse.choices[0].message.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while processing the request." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
