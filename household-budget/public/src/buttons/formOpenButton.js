/**
 *
 * @returns {HTMLButtonElement}
 */
export function createHTMLOpenButton() {
    const htmlOpenButton = document.createElement("button");
    htmlOpenButton.className = "open-button";

    const plusImg = document.createElement("img");
    plusImg.className = "plus";
    plusImg.alt = "plus";
    plusImg.src = "src/assets/plus24Green.png";


    htmlOpenButton.appendChild(plusImg);
    return htmlOpenButton;
}

/**
 *
 * @param openBtn
 * @param shoppingFormComponent
 */
export function openForm(openBtn, shoppingFormComponent) {
    openBtn.addEventListener("click", () => {
        document.body.appendChild(shoppingFormComponent);
    });
}