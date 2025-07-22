export function createHTMLCloseButton() {
    const htmlCloseButton = document.createElement("button");
    htmlCloseButton.className = "close-btn";

    const closeImg = document.createElement("img");
    closeImg.className = "close";
    closeImg.alt = "close";
    closeImg.src = "src/assets/close24.png";

    htmlCloseButton.appendChild(closeImg);
    return htmlCloseButton;
}

export function closeForm(closeBtn) {
    closeBtn.addEventListener("click", () => {
        document.querySelector(".middle-bar")?.remove();
    })
}