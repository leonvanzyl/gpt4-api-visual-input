const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { prompt } = await request.json();
  console.log("Prompt in API", prompt);

  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "512x512",
  });

  console.log("Response", response.data.data[0].url);

  return new Response(JSON.stringify({ url: response.data.data[0].url }));
}
