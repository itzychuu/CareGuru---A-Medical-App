// This file handles ALL AI communication
// You will ONLY change the API KEY later

const API_KEY = import.meta.env.VITE_AI_API_KEY;

// Example: OpenAI-style endpoint (can change provider later)
export async function getAIResponse(userMessage) {
  // If no API key, fallback to dummy response
  if (!API_KEY) {
    return `This is a demo AI response for: "${userMessage}". 
Please consult a medical professional for accurate advice.`;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // safe + fast
        messages: [
          {
            role: "system",
            content:
              "You are a helpful medical assistant. Do not give diagnoses. Provide general wellness guidance only.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    });

    const data = await response.json();

    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error);
    return "Sorry, I am unable to respond right now.";
  }
}
