const dotenv = require("dotenv");


//dotenv
dotenv.config();

const API_KEY = process.env.API_KEY 

exports.searchController = async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Authorization":`Bearer ${API_KEY}`,
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages:[{role: "user", content: req.body.message}],
      max_tokens: 100,
    })

  }
  try {
    const reponse = await fetch('https://api.openai.com/v1/chat/completions', options)
    const data = await reponse.json()
    res.send(data)
  }catch (error) {
    console.log(error)
  }
};