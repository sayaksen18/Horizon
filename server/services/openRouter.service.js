import axios from "axios";
export const askAI = async (messages) => {
    try{
        if(!messages || !Array.isArray(messages) || messages.length === 0){
            throw new Error("Messages array is empty");
        }
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",{
            model : "openai/gpt-4o-mini",
            messages
        },
        {
            headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            }
        });
        const content = response?.data?.choices[0]?.message?.content;
        if(!content){
            throw new Error("No content in AI response");
        }
        return content;
    } catch (error) {
        console.error("OpenRouter Error:",error.response?.data || error.message || error);
        throw new Error("Failed to get response from OpenRouter");
    }
}