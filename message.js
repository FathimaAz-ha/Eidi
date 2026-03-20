function decodePayload(token) {
  const padded = token.replace(/-/g, "+").replace(/_/g, "/");
  const neededPadding = (4 - (padded.length % 4)) % 4;
  const normalized = padded + "=".repeat(neededPadding);
  const decoded = atob(normalized);
  return JSON.parse(decodeURIComponent(decoded));
}

const messageRecipient = document.getElementById("messageRecipient");
const messageWish = document.getElementById("messageWish");
const messageSender = document.getElementById("messageSender");

const hashData = new URLSearchParams(window.location.hash.replace(/^#/, ""));
const token = hashData.get("d");

if (!token) {
  messageRecipient.textContent = "Your Eid message is ready to be created.";
  messageWish.textContent = "Open the main page and create a wish card for your loved one.";
  messageSender.textContent = "";
} else {
  try {
    const payload = decodePayload(token);
    const recipient = (payload.r || "").trim();
    const sender = (payload.s || "").trim();
    const wish = (payload.w || "").trim();

    messageRecipient.textContent = recipient ? `For ${recipient}` : "For You";
    messageWish.textContent = wish || "Eid Mubarak. Wishing you peace, joy, and blessings.";
    messageSender.textContent = sender ? `From ${sender}` : "";
  } catch {
    messageRecipient.textContent = "This link is invalid or expired.";
    messageWish.textContent = "Please request a new message link.";
    messageSender.textContent = "";
  }
}
