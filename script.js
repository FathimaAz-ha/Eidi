const wishes = [
  "Eid Mubarak. May your days be filled with gratitude and laughter.",
  "Wishing your family peace, prosperity, and countless blessings this Eid.",
  "May every prayer of your heart be answered this beautiful Eid.",
  "Eid Mubarak. May your home always shine with love and barakah."
];

const wishBtn = document.getElementById("wishBtn");
const dynamicWish = document.getElementById("dynamicWish");
const wishForm = document.getElementById("wishForm");
const sendStatus = document.getElementById("sendStatus");
const copyLinkBtn = document.getElementById("copyLinkBtn");
function buildCleanUrl() {
  const cleanUrl = new URL(window.location.href);
  cleanUrl.search = "";
  cleanUrl.hash = "";
  return cleanUrl.toString();
}

function buildWhatsappSendLink() {
  const cleanUrl = buildCleanUrl();
  return `https://wa.me/?text=${encodeURIComponent(cleanUrl)}`;
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "absolute";
  helper.style.left = "-9999px";
  document.body.appendChild(helper);
  helper.select();
  document.execCommand("copy");
  document.body.removeChild(helper);
}

wishBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * wishes.length);
  dynamicWish.textContent = wishes[randomIndex];

  wishBtn.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(0.97)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 260,
      easing: "ease-out"
    }
  );
});

wishForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const recipientName = document.getElementById("recipientName").value.trim();
  const senderName = document.getElementById("senderName").value.trim();
  const wishMessage = document.getElementById("wishMessage").value.trim();

  if (!senderName || !wishMessage) {
    sendStatus.textContent = "Please complete all required fields before sending.";
    return;
  }

  const cleanUrl = buildCleanUrl();

  const messageLines = [
    recipientName ? `Dear ${recipientName},` : "Assalamu Alaikum,",
    "",
    wishMessage,
    "",
    `View your Eid wish card: ${cleanUrl}`,
    "",
    `Warm regards,`,
    senderName
  ];

  const whatsappText = encodeURIComponent(messageLines.join("\n"));
  const whatsappUrl = `https://wa.me/?text=${whatsappText}`;

  sendStatus.textContent = "Opening WhatsApp with your Eid wish message.";
  window.open(whatsappUrl, "_blank", "noopener");
});

copyLinkBtn.addEventListener("click", async () => {
  const whatsappSendLink = buildWhatsappSendLink();

  try {
    await copyText(whatsappSendLink);
    sendStatus.textContent = "WhatsApp send link copied without message text in the URL.";
  } catch {
    sendStatus.textContent = "Unable to copy automatically. Please copy the link from the browser address bar.";
  }
});
