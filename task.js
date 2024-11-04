function goBack() {
    window.location.href = "index.html";
}

function handleChannelJoin() {
    if (localStorage.getItem("channelJoined") === "true") {
        document.getElementById("checkJoinButton").style.display = "block";
        showMessage("برای بررسی عضویت، روی 'بررسی عضویت' کلیک کنید.");
    } else {
        openModal();
    }
}

function openChannelLink() {
    const channelLink = "https://t.me/kolookh";
    window.open(channelLink, "_blank");
}

function closeModal() {
    document.getElementById("channelModal").style.display = "none";
}

function openModal() {
    document.getElementById("channelModal").style.display = "flex";
}

function checkChannelJoin() {
    if (localStorage.getItem("channelJoined") === "true") {
        showMessage("شما قبلاً در این تسک شرکت کرده‌اید و امتیاز گرفته‌اید.");
    } else {
        let score = parseInt(localStorage.getItem("score")) || 0;
        score += 10000;
        localStorage.setItem("score", score);
        localStorage.setItem("channelJoined", "true");
        showMessage("عضویت شما تایید شد و 10,000 امتیاز دریافت کردید!");
    }
}

function enterCode() {
    if (localStorage.getItem("codeEntered") === "true") {
        showMessage("شما قبلاً این کد را وارد کرده‌اید.");
        return;
    }

    const code = prompt("کد خود را وارد کنید:");
    if (code === "NOZOHOORBS") {
        let score = parseInt(localStorage.getItem("score")) || 0;
        score += 100000000;
        localStorage.setItem("score", score);
        localStorage.setItem("codeEntered", "true");
        showMessage("کد صحیح است! شما 100 میلیون سکه دریافت کردید!");
    } else {
        showMessage("کد نادرست است. لطفاً دوباره تلاش کنید.");
    }
}

function showMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
}
