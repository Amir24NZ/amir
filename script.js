const scoreElement = document.getElementById("score");
const batteryBar = document.getElementById("battery-bar");
const batteryValue = document.getElementById("battery-value");
const messageDiv = document.getElementById("message");
const coin = document.getElementById("coin");

document.getElementById("coin").addEventListener("touchstart", function(event) {
    event.preventDefault();
    const coinRect = this.getBoundingClientRect();
    const centerX = coinRect.left + coinRect.width / 2;
    const centerY = coinRect.top + coinRect.height / 2;

    for (let touch of event.touches) {
        const deltaX = touch.clientX - centerX;
        const deltaY = touch.clientY - centerY;
        this.style.transform = `rotateX(${deltaY / 10}deg) rotateY(${-deltaX / 10}deg)`;
        
        // Call the increaseScore function but check battery level before updating score
        if (batteryLevel >= 15) {
            increaseScore(touch.clientX, touch.clientY);
        }
    }

    setTimeout(() => {
        this.style.transform = "rotateX(0) rotateY(0)";
    }, 100);
});

let score = parseInt(localStorage.getItem("score")) || 0;
let boostLevel = Math.min(parseInt(localStorage.getItem("boostLevel")) || 1, 8);
let batteryMax = 1000 * boostLevel;
const clickValues = [1, 2, 3, 4, 5, 6, 7, 8];
let batteryLevel = parseInt(localStorage.getItem("batteryLevel")) || batteryMax;
let lastUpdateTime = parseInt(localStorage.getItem("lastUpdateTime")) || Date.now();

scoreElement.textContent = formatScore(score); // Format the score when displaying

// Function to initialize the game
function initialize() {
    updateLeague(); // Update league
    calculateBatteryLevel(); // Update battery level
}

function getLeague(score) {
    if (score < 5000) return "😐 گدا";
    else if (score < 10000) return "👨 آقا";
    else if (score < 20000) return "👷‍♂️ کارگر";
    else if (score < 30000) return "👨‍🌾 کشاورز";
    else if (score < 50000) return "🏃‍♂️ ورزشکار";
    else if (score < 80000) return "👨‍🏫 استاد";
    else if (score < 100000) return "🤵‍♂️ رییس";
    else if (score < 500000) return "👨‍⚕️ دکتر";
    else if (score < 1000000) return "👨‍💻 مهندس";
    return "👨‍🔬 دانشمند";
}

function updateLeague() {
    const currentLeague = getLeague(score);
    document.getElementById("league").textContent = `لیگ: ${currentLeague}`;
}

function calculateBatteryLevel() {
    const currentTime = Date.now();
    const timeElapsed = (currentTime - lastUpdateTime) / 1000;
    batteryLevel = Math.min(batteryLevel + timeElapsed * (batteryMax / 900), batteryMax);
    lastUpdateTime = currentTime;

    localStorage.setItem("batteryLevel", batteryLevel);
    localStorage.setItem("lastUpdateTime", lastUpdateTime);
    batteryBar.style.width = `${(batteryLevel / batteryMax) * 100}%`;

    batteryValue.textContent = `${Math.round(batteryLevel)} / ${batteryMax}`;
}

function increaseScore(x, y) {
    if (batteryLevel < 15) {
        return; // Exit the function without doing anything
    }

    const floatScore = document.createElement("div");
    floatScore.className = "float-score";
    floatScore.style.left = `${x}px`;
    floatScore.style.top = `${y}px`;
    floatScore.textContent = `+${clickValues[boostLevel - 1]}`;
    document.body.appendChild(floatScore);

    setTimeout(() => floatScore.remove(), 1000);

    score += clickValues[boostLevel - 1];
    scoreElement.textContent = formatScore(score); // Format the score when updating
    updateLeague();

    batteryLevel = Math.max(0, batteryLevel - 10);
    batteryBar.style.width = `${(batteryLevel / batteryMax) * 100}%`;

    batteryValue.textContent = `${Math.round(batteryLevel)} / ${batteryMax}`;
    localStorage.setItem("score", score);
    localStorage.setItem("batteryLevel", batteryLevel);
}

function formatScore(value) {
    if (value >= 1e9) {
        return (value / 1e9).toFixed(1) + ' T'; // Billion
    } else if (value >= 1e6) {
        return (value / 1e6).toFixed(1) + ' M'; // Million
    } else if (value >= 1e3) {
        return (value / 1e3).toFixed(1) + ' K'; // Thousand
    }
    return value.toString(); // Less than 1000
}

// Execute the initialize function on page load
initialize();

setInterval(calculateBatteryLevel, 1000);
