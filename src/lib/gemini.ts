import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateEmailTemplate = async (prompt: string) => {
  if (!ai) throw new Error("Gemini API key not configured");

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are an expert cold email copywriter. Generate a highly effective email template based on this goal: "${prompt}". 
    Return the response in JSON format with the following structure:
    {
      "name": "A short descriptive name for the template",
      "subject": "A compelling subject line",
      "body": "The email body with placeholders like [Name], [Company], [Role] where appropriate"
    }`,
    config: {
      responseMimeType: "application/json"
    }
  });

  return JSON.parse(response.text);
};

export const generatePersonalizedEmail = async (details: {
  leadName: string;
  leadRole: string;
  companyName: string;
  industry: string;
  companyDescription: string;
  goal: string;
  tone: string;
  userName: string;
}) => {
  if (!ai) throw new Error("Gemini API key not configured");

  const prompt = `
    Generate a highly personalized cold email for a lead with the following details:
    - Lead Name: ${details.leadName || 'there'}
    - Lead Role: ${details.leadRole || 'Professional'}
    - Company Name: ${details.companyName || 'your company'}
    - Industry: ${details.industry || 'your industry'}
    - Company Description: ${details.companyDescription || 'N/A'}
    - Campaign Goal: ${details.goal}
    - Tone: ${details.tone}
    - Sender Name: ${details.userName || 'Sender'}

    The email should be concise, engaging, and focused on the goal.
    Use the provided Sender Name instead of [Your Name] in the signature.
    Return the response in JSON format with the following structure:
    {
      "subject": "A compelling subject line",
      "body": "The personalized email body"
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json"
    }
  });

  return JSON.parse(response.text);
};

export const improveEmailContent = async (body: string, improvementType: string) => {
  if (!ai) throw new Error("Gemini API key not configured");

  const prompt = `
    Improve the following email body based on this objective: "${improvementType}".
    
    Email Body:
    "${body}"

    Return the response in JSON format with the following structure:
    {
      "body": "The improved email body"
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json"
    }
  });

  return JSON.parse(response.text);
};
