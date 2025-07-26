export function createHTMLShoppingHistoryBar() {

    const shoppingHistoryBar = document.createElement("div");
    shoppingHistoryBar.className = "shopping-history-bar";

    const date = document.createElement("span");
    date.className = "history-date";
    date.innerText = "15.02.2025";

    const name = document.createElement("span");
    name.className = "history-name";
    name.innerText = "Kamil";

    const totalSum = document.createElement("span");
    totalSum.className = "history-sum";
    totalSum.innerText = "15zl";

    shoppingHistoryBar.addEventListener("click", () => {
        alert("kliknięto!")
    })

    shoppingHistoryBar.appendChild(date);
    shoppingHistoryBar.appendChild(name);
    shoppingHistoryBar.appendChild(totalSum);
    return shoppingHistoryBar;
}
