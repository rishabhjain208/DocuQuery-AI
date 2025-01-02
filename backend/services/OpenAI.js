// OpenAI Integration
const axios = require("axios");

module.exports.ansByOpenAi = async (question) => {
  const options = {
    method: "POST",
    url: "https://chatgpt-42.p.rapidapi.com/conversationgpt4-2",
    headers: {
      "x-rapidapi-key": "8bc58c75e7msh5620eb1f87b65a2p130b14jsn72caa59289d6",
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      messages: [{ role: "user", content: question }],
    },
  };
  try {
    const response = await axios.request(options);
    const answer = response.data.result;

    return answer;
  } catch (error) {
    console.log(error);
    console.error(
      "Error from OpenAI API:",
      error.response ? error.response.data : error.message
    );
    return error;
  }
};
