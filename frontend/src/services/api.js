export async function sendMessageToBot(message) {
  const res = await fetch("https://ai-movie-backend-zhqi.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) throw new Error("API Error");
  return res.json();
}
