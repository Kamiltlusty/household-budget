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

const saveBtn = header.querySelector(".save-btn")
saveBtn.addEventListener('click', event => {
    const today = new Date();

    const form = {
        date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`,
        buyer_name: shoppingFormComponent.querySelector(".buyer-text-field")?.value ?? "",
        total_sum: Number(shoppingFormComponent.querySelector(".sum")?.value ?? 0)
    }

    const cb = shoppingFormComponent.querySelectorAll(".shop-checkbox");
    const span = shoppingFormComponent.querySelectorAll(".shop-span");
    for (let i = 0; i < cb.length; i++) {
        if (cb[i].checked) {
            form.store = { name: span[i]?.innerText ?? "store" };
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

    saveFormData(fd);
})


async function saveFormData(fd) {
    const url = "http://localhost:8080/form";
    try {
        const response = await fetch(url, {
            method: "POST",
            body: fd
        });

    } catch (error) {
        console.error(error.message);
    }
}

