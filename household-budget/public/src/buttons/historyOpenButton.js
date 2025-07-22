export function createHtmlOpenHistoryButton() {
    const htmlOpenHistoryButton = document.createElement("button");
    htmlOpenHistoryButton.className = "open-history-btn";

    const historyImg = document.createElement("img");
    historyImg.className = "history-image"
    historyImg.alt = "history image"
    historyImg.src = "src/assets/history24.png"

    htmlOpenHistoryButton.appendChild(historyImg);
    return htmlOpenHistoryButton;
}

export function openHistoryPage(openHistoryBtn) {
    const handleOpenHistoryPage = () => {
        window.location.href = "src/history.html";
    }
    openHistoryBtn.addEventListener('click', handleOpenHistoryPage);
}