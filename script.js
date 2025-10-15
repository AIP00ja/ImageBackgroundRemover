const addCard = document.getElementById("addCard");
const displayCard = document.getElementById("displayCard");
const downloadCard = document.getElementById("downloadCard");
const fileInput = document.getElementById("fileInput");
const displayImg = document.getElementById("display-img");
const startBtn = document.getElementById("startBtn");
const imageBefore = document.querySelector(".image-before");
const imageAfter = document.querySelector(".image-after");
const downloadHref = document.getElementById("downloadHref");
const newImageBtn = document.getElementById("newImageBtn");

let file = null;

// Replace this with your valid Remove.bg API key
const API_KEY = "eXcYeeSNVuSPksy88mVDH85L";
const API_URL = "https://api.remove.bg/v1.0/removebg";

function showScreen(screen) {
  addCard.style.display = "none";
  displayCard.style.display = "none";
  downloadCard.style.display = "none";
  screen.style.display = "block";
}

// Start with upload card
showScreen(addCard);

fileInput.addEventListener("change", () => {
  file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      displayImg.src = reader.result;
      imageBefore.src = reader.result;
      showScreen(displayCard);
    };
    reader.readAsDataURL(file);
  }
});

startBtn.addEventListener("click", async () => {
  if (!file) return alert("Please upload an image first!");

  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("size", "auto");

  startBtn.textContent = "Removing...";
  startBtn.classList.add("loading");
  startBtn.disabled = true;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "X-Api-Key": API_KEY },
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to remove background!");

    const blob = await response.blob();
    const reader = new FileReader();
    reader.onloadend = () => {
      imageAfter.src = reader.result;
      downloadHref.href = reader.result;
      showScreen(downloadCard);
    };
    reader.readAsDataURL(blob);
  } catch (err) {
    alert("Error: " + err.message);
  } finally {
    startBtn.textContent = "Remove Background";
    startBtn.classList.remove("loading");
    startBtn.disabled = false;
  }
});


newImageBtn.addEventListener("click", () => {
  fileInput.value = "";
  file = null;
  showScreen(addCard);
});
