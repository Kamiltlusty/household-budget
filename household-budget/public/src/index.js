import {createShoppingFormComponent} from "./components/shopping-form-component.js";
import {createHTMLOpenButton, openForm} from "./buttons/formOpenButton.js";
import {createHTMLSaveButton, saveFormData} from "./buttons/formSaveButton.js";
import {createHTMLCloseButton, closeForm} from "./buttons/formCloseButton.js";
import {createHtmlOpenHistoryButton, openHistoryPage} from "./buttons/historyOpenButton.js";

const header = document.createElement("header");
header.className = "top-bar"

const shoppingMenu = document.createElement("div");
shoppingMenu.className = "shopping-menu";

const openBtn = createHTMLOpenButton();
const saveBtn = createHTMLSaveButton();
const closeBtn = createHTMLCloseButton();
const openHistoryButton = createHtmlOpenHistoryButton();

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
