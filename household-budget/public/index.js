import {createShoppingFormComponent} from "./src/components/shopping-form-component.js";
import {createHTMLOpenButton, openForm} from "./src/buttons/formOpenButton.js";
import {createHTMLSaveButton, saveFormData} from "./src/buttons/formSaveButton.js";
import {createHTMLCloseButton, closeForm} from "./src/buttons/formCloseButton.js";
import {createHtmlOpenHistoryButton, openHistoryPage} from "./src/buttons/historyOpenButton.js";

const header = document.createElement("header");
header.className = "top-bar"

const shoppingMenu = document.createElement("div");
shoppingMenu.className = "shopping-menu";

const openBtn = createHTMLOpenButton();
const saveBtn = createHTMLSaveButton();
const closeBtn = createHTMLCloseButton();
export const openHistoryButton = createHtmlOpenHistoryButton();

shoppingMenu.appendChild(openBtn);
shoppingMenu.appendChild(saveBtn);
shoppingMenu.appendChild(closeBtn)
shoppingMenu.appendChild(openHistoryButton);
header.appendChild(shoppingMenu);
document.body.appendChild(header);

openForm(openBtn, createShoppingFormComponent());
saveFormData(saveBtn);
closeForm(closeBtn);
openHistoryPage(openHistoryButton);
openFormWithFetchedData()

function openFormWithFetchedData() {
    const handleOpenForm = async () => {
        let params = new URLSearchParams(document.location.search);
        let formId = params.get("formId");
        if (formId != null) {
            console.log("formId: " + formId);
            const formData = await fetchDataById(formId);
            openFormAndFillData(formData);
        }
    }
    document.addEventListener("DOMContentLoaded", handleOpenForm);
}

function openFormAndFillData(formData) {
    document.body.appendChild(createShoppingFormComponent(formData));
}

async function fetchDataById(formId) {
    const url = `http://localhost:8080/form/history-form/${formId}`;
    try {
        const response = await fetch(url, {
            method: "GET",
        });

        return await response.json();
    } catch (error) {
        console.log(error.message);
        return null;
    }
}



