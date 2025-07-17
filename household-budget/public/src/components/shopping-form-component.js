export function createShoppingFormComponent(shops) {
    /**
     * function serves months in pl
     * @returns {string}
     */
    function getPolishMonth(date) {
        const months = [
            "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
            "Lipiec", "Sierpień", "Wrześień", "Październik", "Listopad", "Grudzień"
        ];
        return months[date.getMonth()];
    }

    const currentDate = new Date();
    const sDate = currentDate.getDate() + " " + getPolishMonth(currentDate) + " " + currentDate.getFullYear();

    const shoppingFormComponent = document.createElement("section")
    shoppingFormComponent.className = "middle-bar"
    shoppingFormComponent.innerHTML = `
    <div class="shopping-form">
    <h2 class="shopping-date">${sDate}</h2>
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

    const shopsSection = shoppingFormComponent.querySelector(".shops");
    printShopsWithCheckboxes();

    /**
     * function generates checkboxes and spans to list shops
     */
    function printShopsWithCheckboxes() {
        for (let i = 0; i < shops.length; i++) {
            const cb = document.createElement("input");
            cb.className = "shop-checkbox"
            cb.value = i;
            cb.type = "checkbox";
            const text = document.createElement("span");
            text.className = "shop-span"
            text.innerText = shops[i];
            shopsSection.appendChild(cb);
            shopsSection.appendChild(text);
        }
    }

    const checkboxes = shoppingFormComponent.querySelectorAll(".shop-checkbox");
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

    const ul = shoppingFormComponent.querySelector(".list");
    ul.addEventListener("input", addNewProductInputIfNeeded);
    ul.addEventListener("input", removeEmptyInputs);

    function addNewProductInputIfNeeded() {
        const productsList = shoppingFormComponent.querySelector(".products-list")
        const productNameInputs = shoppingFormComponent.querySelectorAll(".product-name");
        const lastInput = productNameInputs[productNameInputs.length - 1];
        const maxHeightOfProductsList = 160

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
        const inputs = shoppingFormComponent.querySelectorAll(".product-name");
        const li = shoppingFormComponent.querySelectorAll(".list-element");
        inputs.forEach((product, index) => {
            if (product.value === "" && index !== inputs.length - 1) {
                li[index].remove();
            }
        });
    }

    const fileInput = shoppingFormComponent.querySelector("input[type=file]");
    fileInput.addEventListener("change", createPopupWithReceipt);

    function createPopupWithReceipt() {
        const receiptSection = shoppingFormComponent.querySelector(".receipt-section");
        const popupForImage = document.createElement("div");
        popupForImage.className = "popup-section";

        const closeButtonContainer = document.createElement("div");
        closeButtonContainer.className = "class-button-container";

        const closeButton = document.createElement("button");
        closeButton.className = "popup-close-btn";

        const closeButtonImage = document.createElement("input");
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
                receiptImage.src = reader.result;
                // reset file value so it can be loaded again
                fileInput.value = "";
            },
            false,
        );

        if (file) {
            reader.readAsDataURL(file);
        }

        // close popup with x button
        closeButton.addEventListener("click", () => {
            popupForImage.remove();
        })

        closeButtonContainer.appendChild(closeButton);
        popupForImage.appendChild(closeButtonContainer);
        popupForImage.appendChild(receiptImage);
        receiptSection.appendChild(popupForImage);
    }

    return shoppingFormComponent;
}