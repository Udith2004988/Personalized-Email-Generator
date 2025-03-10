import React, { useState } from "react";
import { generateEmail } from "../utils/openaiService";

const EmailGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [email, setEmail] = useState("");

  const handleGenerate = async () => {
    const generatedEmail = await generateEmail(prompt);
    setEmail(generatedEmail);
  };

  return (
    <div>
      <h2>AI-Powered Email Generator</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt..."
      />
      <button onClick={handleGenerate}>Generate Email</button>
      <div>
        <h3>Generated Email:</h3>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default EmailGenerator;
