export function createHTMLShoppingHistoryBar(formId, barDate, barName, barTotalSum) {
    const shoppingHistoryBar = document.createElement("div");
    shoppingHistoryBar.className = "shopping-history-bar";
    shoppingHistoryBar.dataset.formId = formId;

    const date = document.createElement("span");
    date.className = "history-date";
    date.innerText = barDate;

    const name = document.createElement("span");
    name.className = "history-name";
    name.innerText = barName;

    const totalSum = document.createElement("span");
    totalSum.className = "history-sum";
    totalSum.innerText = barTotalSum;

    shoppingHistoryBar.appendChild(date);
    shoppingHistoryBar.appendChild(name);
    shoppingHistoryBar.appendChild(totalSum);

    openMainPage(shoppingHistoryBar, formId);
    return shoppingHistoryBar;
}


function openMainPage(shoppingHistoryBar, formId){
    console.log("openMainPage" + formId);
    const handleOpenMainPage = () => {
        window.location.href = `../index.html?formId=${formId}`;
    }

    shoppingHistoryBar.addEventListener("click", handleOpenMainPage);
}