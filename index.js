const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: "org-Ro5K7oFHglEcxE03B7n9dVA4",
  apiKey: "",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 1000,
      temperature: 0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    //   top_p: 1,
    //   stop: ["\n"],
    });

    response?.data?.choices?.length >= 0
      ? res.json({
          message: response.data.choices[0].text,
        })
      : res.json({
          message: "There are no choices",
        });
  } catch (error) {
    console.log("error: ", error.message);
    return res.json({
      message: "No ha sido posible obtener resultados para esta busqueda",
    });
  }
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});
