const header = document.createElement("header");
header.className = "top-bar"
header.innerHTML = `
    <div class="shopping-menu">
        <button class="add-btn">
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

/**
 * function serves months in pl
 * @returns {string}
 */
Date.prototype.myMonth = function () {
    const months = [
        "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
        "Lipiec", "Sierpień", "Wrześień", "Październik", "Listopad", "Grudzień"
    ];
    return months[this.getMonth()];
};

const shops = [
    "Lidl", "Biedronka", "Żabka", "Auchan", "Carrefour", "Putka", "Dino"
];

function shop(snum) {
    return shops[snum];
}

const currentDate = new Date();
const dateTime = currentDate.getDate() + " " + currentDate.myMonth() + " " + currentDate.getFullYear();

const section = document.createElement("section")
section.className = "middle-bar"
section.innerHTML = `
    <div class="shopping-form">
    <h2 class="shopping-date">${dateTime}</h2>
    <h2 class="buyer">Kupujący: <input class="buyer-text-field" type="text" placeholder="Imię"></h2>    
    <section class="shops"></section>    
    <h2 class="shopping-list-header">Lista zakupów:</h2>
    <section class="products-list" >
    <ul class="list"><li class="list-element"><input class="product-name" type="text" placeholder="wpisz produkt"></li></ul>
    </section>
    <section class="receipt-section">
    <input type="file" class="file-chooser">
    </section>   
    <h2 class="sum-header">Suma: <input type="number" class="sum" placeholder="koszt"></h2>
    </div>
    `
document.body.appendChild(section);

const shopsSection = document.querySelector(".shops");
printShopsWithCheckboxes();

/**
 * function generates checkboxes and spans to list shops
 */
function printShopsWithCheckboxes() {
    for (i = 0; i < shops.length; i++) {
        const cb = document.createElement("input");
        cb.className = "checkbox"
        cb.value = i;
        cb.type = "checkbox";
        const text = document.createElement("span");
        text.innerText = shop(i);
        shopsSection.appendChild(cb);
        shopsSection.appendChild(text);
    }
}

const checkboxes = document.querySelectorAll(".checkbox");
/**
 * function ensures that only one checkbox is checked at the time
 */
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("click", function (event) {
        let el = event.target.value;
        checkboxes.forEach(cb => {
            if (cb.value !== el) {
                cb.checked = false;
            }
        })
    });
})

const ul = document.querySelector(".list");
ul.addEventListener("input", addNewProductInputIfNeeded);
ul.addEventListener("input", removeEmptyInputs);

function addNewProductInputIfNeeded() {
    const productsList = document.querySelector(".products-list")
    const productNameInputs = document.querySelectorAll(".product-name");
    const lastInput = productNameInputs[productNameInputs.length - 1];
    const maxHeightOfProductsList =160

    if (lastInput && lastInput !== "" && productsList.getBoundingClientRect().height < maxHeightOfProductsList) {
        let productName = document.createElement("input");
        productName.className = "product-name";
        productName.placeholder = "wpisz produkt";
        let listItem = document.createElement("li");
        listItem.className = "list-element";

        listItem.appendChild(productName);
        ul.appendChild(listItem);
    }

}

function removeEmptyInputs() {
    const inputs = document.querySelectorAll(".product-name");
    const li = document.querySelectorAll(".list-element");
    inputs.forEach((product, index) => {
        if (product.value === "" && index !== inputs.length - 1) {
            li[index].remove();
        }
    });
}

const fileInput = document.querySelector("input[type=file]");
fileInput.addEventListener("change", createPopupWithReceipt);

function createPopupWithReceipt() {
    const receiptSection = document.querySelector(".receipt-section");
    const popupForImage= document.createElement("div");
    popupForImage.className = "popup-section";

    const closeButtonContainer = document.createElement("div");
    closeButtonContainer.className = "class-button-container";

    const closeButton = document.createElement("button");
    closeButton.className = "popup-close-btn";

    const closeButtonImage= document.createElement("input");
    closeButtonImage.className = "close-button-image";
    closeButtonImage.type = "image";
    closeButtonImage.alt = "close";
    closeButtonImage.src = "src/assets/closeRed24.png";
    closeButton.appendChild(closeButtonImage);


    const file = fileInput.files[0];
    const reader = new FileReader();

    const receiptImage = document.createElement("img");
    receiptImage.className = "receipt-image";

    reader.addEventListener(
        "load",
        () => {
            // convert image file to base64 string
            receiptImage.src = reader.result;
        },
        false,
    );

    if (file) {
        reader.readAsDataURL(file);
    }

    closeButtonContainer.appendChild(closeButton);
    popupForImage.appendChild(closeButtonContainer);
    popupForImage.appendChild(receiptImage);
    receiptSection.appendChild(popupForImage);
}



