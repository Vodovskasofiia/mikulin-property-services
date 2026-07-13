// ===============================
// MPS CONTACT FORM
// ===============================

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const nights = document.getElementById("nights");

// сегодняшняя дата
const today = new Date().toISOString().split("T")[0];

// запрещаем выбирать прошедшие даты
checkin.min = today;
checkout.min = today;


// когда меняется дата заезда
checkin.addEventListener("change", () => {

    // дата выезда не может быть раньше
    checkout.min = checkin.value;

    calculateNights();

});


// когда меняется дата выезда
checkout.addEventListener("change", calculateNights);


// подсчет ночей
function calculateNights(){

    if(checkin.value && checkout.value){

        const start = new Date(checkin.value);
        const end = new Date(checkout.value);

        const diff = end - start;

        const total = diff / (1000 * 60 * 60 * 24);

        if(total > 0){

            nights.value = total;

        }else{

            nights.value = "";

        }

    }

}

// ===============================
// Gästezähler
// ===============================

let adults = 2;
let children = 0;

const adultsValue = document.getElementById("adults");
const childrenValue = document.getElementById("children");

// Взрослые
document.querySelector(".plus").addEventListener("click", () => {
    adults++;
    adultsValue.textContent = adults;
    updateGuestInputs();
});

document.querySelector(".minus").addEventListener("click", () => {
    if (adults > 1) {
        adults--;
        adultsValue.textContent = adults;
        updateGuestInputs();
    }
});

// Дети
document.querySelector(".plus-child").addEventListener("click", () => {
    children++;
    childrenValue.textContent = children;
    updateGuestInputs();
});

document.querySelector(".minus-child").addEventListener("click", () => {
    if (children > 0) {
        children--;
        childrenValue.textContent = children;
        updateGuestInputs();
    }
});
// ===============================
// Hidden Inputs für Web3Forms
// ===============================

function updateGuestInputs() {

    document.getElementById("adultsInput").value = adults;
    document.getElementById("childrenInput").value = children;
    document.getElementById("totalGuestsInput").value = adults + children;

}

// Заполняем при загрузке страницы
updateGuestInputs();

// ===============================
// Web3Forms Submit
// ===============================

const form = document.getElementById("bookingForm");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    updateGuestInputs();

    submitBtn.disabled = true;
    submitBtn.textContent = "Wird gesendet...";

    const formData = new FormData(form);

    try {

        const response = await fetch("https://api.web3forms.com/submit", {

            method: "POST",

            body: formData

        });

        const data = await response.json();

        if (data.success) {

            result.style.color = "#2e7d32";
            result.innerHTML =
                "✅ Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet.";

            form.reset();

            adults = 2;
            children = 0;

            adultsValue.textContent = adults;
            childrenValue.textContent = children;

            nights.value = "";

            updateGuestInputs();

        } else {

            result.style.color = "red";
            result.innerHTML = "❌ Fehler: " + data.message;

        }

    } catch (error) {

        result.style.color = "red";
        result.innerHTML =
            "❌ Verbindung zum Server fehlgeschlagen.";

    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Anfrage senden";

});
