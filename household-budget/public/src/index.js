import {createShoppingFormComponent} from "./components/shopping-form-component.js";

const header = document.createElement("header");
header.className = "top-bar"
header.innerHTML = `
    <div class="shopping-menu">
        <button class="open-btn">
            <input class="plus" type="image" alt="plus" src="src/assets/plus24Green.png"/>
        </button>
        <button class="save-btn">
            <input class="save" type="image" alt="save" src="src/assets/save24.png"/>
        </button>
        <button class="close-btn">
            <input class="close" type="image" alt="close" src="src/assets/close24.png"/>
        </button>
    </div>
    `
document.body.appendChild(header);

const shops = [
    "Lidl", "Biedronka", "Żabka", "Auchan", "Carrefour", "Putka", "Dino"
];

const shoppingFormComponent = createShoppingFormComponent(shops);

const openBtn = header.querySelector(".open-btn");
openBtn.addEventListener("click", () => {
   document.body.appendChild(shoppingFormComponent);
});

const closeBtn = header.querySelector(".close-btn");
closeBtn.addEventListener("click", () => {
    shoppingFormComponent.remove();
})

