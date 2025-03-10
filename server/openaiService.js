export const generateEmail = async (prompt) => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,  // Use REACT_APP_ prefix
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "system", content: "You are an AI email assistant." }, { role: "user", content: prompt }]
        })
      });
  
      const data = await response.json();
      return data.choices[0]?.message?.content || "No response";
    } catch (error) {
      console.error("Error fetching OpenAI API:", error);
      return "Error generating email";
    }
  };
  