import { Configuration, OpenAIApi } from "openai";

export async function POST(request) {
  const { prompt } = await request.json();

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Use your ability to analyze images to accept an image URL, and then assist the user with their prompt.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return new Response(JSON.stringify({ response: response.data.choices[0] }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }));
  }
}
