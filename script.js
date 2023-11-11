const outputElement = document.createElement("p");
outputElement.classList.add("summary");
document.querySelector(".main-container").appendChild(outputElement);

const czas = document.createElement("p");
czas.classList.add("date-n-hour");
document.querySelector(".main-container").appendChild(czas);

const amountInput = document.getElementById("amount");

const ownedSelect = document.getElementById("owned");
const wantedSelect = document.getElementById("wanted");

const converterForm = document.querySelector(".converter-form");

converterForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const ownedValue = ownedSelect.value;
  const wantedValue = wantedSelect.value;
  const amountValue = amountInput.value;

  if (ownedValue !== wantedValue && !isNaN(amountValue) && amountValue > 0) {
    if (ownedValue === "PLN") {
      const outputValue = (amountValue / CurrenciesArray[wantedValue]).toFixed(
        2
      );
      outputElement.textContent = `${outputValue} ${wantedValue}`;
    } else if (wantedValue === "PLN") {
      const outputValue = (amountValue * CurrenciesArray[ownedValue]).toFixed(
        2
      );
      outputElement.textContent = `${outputValue} ${wantedValue}`;
    } else {
      const outputValue = (
        (amountValue * CurrenciesArray[ownedValue]) /
        CurrenciesArray[wantedValue]
      ).toFixed(2);
      outputElement.textContent = `${outputValue} ${wantedValue}`;
    }
  } else if (!isNaN(amountValue) && amountValue > 0) {
    outputElement.textContent = `${amountValue} ${wantedValue}`;
  }
});

function updateDateTime() {
  const now = new Date();
  const formattedDate = now.toLocaleString("pl-PL");

  czas.textContent = `Aktualna data i godzina: ${formattedDate}`;
}
let CurrenciesArray = {};

function GetCurrencies() {
  fetch("https://api.nbp.pl/api/exchangerates/tables/a/")
    .then((response) => response.json())
    .then((data) => {
      const currencies = data[0].rates;
      currencies.forEach((currency) => {
        CurrenciesArray[currency.code] = currency.mid;
        insertSelectOptions(ownedSelect, currency.code);
        insertSelectOptions(wantedSelect, currency.code);
      });
    })
    .catch((error) => {
      console.error("Waluty nie działają :c", error);
    });
}
function GetCurrencies2() {
  fetch("https://api.nbp.pl/api/exchangerates/tables/b/")
    .then((response) => response.json())
    .then((data) => {
      const currencies = data[0].rates;
      currencies.forEach((currency) => {
        CurrenciesArray[currency.code] = currency.mid;
        insertSelectOptions(ownedSelect, currency.code);
        insertSelectOptions(wantedSelect, currency.code);
      });
    })
    .catch((error) => {
      console.error("Waluty nie działają :c", error);
    });
}

function insertSelectOptions(selectElement, currencyCode) {
  const selectOption = document.createElement("option");
  selectOption.value = currencyCode;
  selectOption.textContent = currencyCode;
  selectElement.appendChild(selectOption);
}

console.log(CurrenciesArray);
GetCurrencies();
GetCurrencies2();

setInterval(updateDateTime, 1000);
updateDateTime();
