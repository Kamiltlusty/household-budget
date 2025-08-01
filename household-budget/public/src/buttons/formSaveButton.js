/**
 *
 * @returns {HTMLButtonElement}
 */
export function createHTMLSaveButton() {
    const htmlSaveBtn = document.createElement("button");
    htmlSaveBtn.className = "save-btn";

    const saveImg = document.createElement("img");
    saveImg.className = "save";
    saveImg.alt = "save";
    saveImg.src = "src/assets/save24.png";

    htmlSaveBtn.appendChild(saveImg);
    return htmlSaveBtn;
}

/**
 *
 * @param saveBtn
 */
export function saveFormData(saveBtn) {
    saveBtn.addEventListener('click', async event => {
        const shoppingFormComponent = document.querySelector(".middle-bar");
        if (!shoppingFormComponent) {
            console.log("Form is not open.")
            return;
        }

        const isFormReady = await checkIfAllDataIsFilled(shoppingFormComponent);
        if (!isFormReady) {
            return;
        }
        const today = new Date();

        const form = {
            date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`,
            buyerName: shoppingFormComponent.querySelector(".buyer-text-field")?.value ?? "",
            totalSum: Number(shoppingFormComponent.querySelector(".sum")?.value ?? 0)
        }

        const cb = shoppingFormComponent.querySelectorAll(".shop-checkbox");
        const span = shoppingFormComponent.querySelectorAll(".shop-span");
        for (let i = 0; i < cb.length; i++) {
            if (cb[i].checked) {
                form.store = {name: span[i]?.innerText ?? "store"};
                break;
            }
        }

        const products = shoppingFormComponent.querySelectorAll(".product-name");
        products.forEach((el, i) => {
            form[`product${i + 1}`] = el.value ?? "brak produktów";
        })

        const receiptImg = shoppingFormComponent.querySelector("input[type=file]");
        const file = receiptImg.files[0];

        const fd = new FormData();
        const jsonBlob = new Blob([JSON.stringify(form)], {type: "application/json"})

        fd.append("form", jsonBlob);
        fd.append("receipt-img", file);

        save(fd);
    });
}

/**
 *
 * @param shoppingFormComponent
 * @returns {Promise<boolean>}
 */
async function checkIfAllDataIsFilled(shoppingFormComponent) {
    const areFormElementsAvailableArray = {
        isBuyer: ["Kupujący", false],
        isShop: ["Sklep", false],
        isTotalSum: ["Suma", false]
    }
    areFormElementsAvailableArray.isBuyer[1] =
        !!shoppingFormComponent.querySelector(".buyer-text-field").value;

    areFormElementsAvailableArray.isTotalSum[1] =
        !!shoppingFormComponent.querySelector(".sum").value;

    const checkboxes = await waitForCheckboxes(shoppingFormComponent);
    areFormElementsAvailableArray.isShop[1] =
        checkboxes.some((el) => el.checked);

    let warningString = ""
    let allDataIsValid = true;

    for (let key in areFormElementsAvailableArray) {
        const [label, isReady] = areFormElementsAvailableArray[key];
        if (!isReady) {
            warningString += label + ", ";
            allDataIsValid = false;
        }
    }

    if (!allDataIsValid) {
        console.log(warningString);
        shoppingFormComponent.querySelector(".warnings-string").
            innerText = warningString;
        shoppingFormComponent.querySelector(".insufficient-data-warning")
            .classList.remove("hidden");
    } else {
        shoppingFormComponent.querySelector(".insufficient-data-warning")
            .classList.add("hidden");
    }
    return allDataIsValid;
}

/**
 *
 * @param shoppingFormComponent
 * @param minCount
 * @param timeout
 * @returns {Promise<unknown>}
 */
async function waitForCheckboxes(shoppingFormComponent, minCount = 1, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const interval = 100;
        let elapsed = 0;

        const check = () => {
            const boxes = shoppingFormComponent.querySelectorAll(".shop-checkbox");
            if (boxes.length >= minCount) return resolve(Array.from(boxes));

            elapsed += interval;
            if (elapsed >= timeout) return reject(new Error("Checkboxy się nie pojawiły"));
            setTimeout(check, interval);
        };

        check();
    });
}

/**
 *
 * @param fd
 * @returns {Promise<void>}
 */
async function save(fd) {
    const url = "http://localhost:8080/form/save";
    try {
        const response = await fetch(url, {
            method: "POST",
            body: fd
        });

    } catch (error) {
        console.error(error.message);
    }
}

