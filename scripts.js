let score = +localStorage.getItem("score") || 0;
let boostLevel = +localStorage.getItem("boostLevel") || 1;
const boostPrices = [1000, 2000, 3000, 5000, 7000, 10000, 15000];

function updateBoostInfo() {
    document.getElementById("boostLevel").textContent = boostLevel;
    document.getElementById("boostPrice").textContent = boostPrices[boostLevel - 1] || "پایان";
}

function openModal() {
    document.getElementById("boostModal").style.display = "flex";
    updateBoostInfo();
}

function closeModal() {
    document.getElementById("boostModal").style.display = "none";
}

function buyBoost() {
    const currentPrice = boostPrices[boostLevel - 1];
    if (score >= currentPrice && boostLevel <= boostPrices.length) {
        score -= currentPrice;
        localStorage.setItem("score", score);
        localStorage.setItem("boostLevel", ++boostLevel);
        alert("بوست خریداری شد!");
        updateBoostInfo();
    } else {
        alert("کلوخ کافی ندارید!");
    }
    closeModal();
}

function goBack() {
    window.location.href = "index.html";
}

updateBoostInfo();
