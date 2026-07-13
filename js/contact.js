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
});

document.querySelector(".minus").addEventListener("click", () => {
    if (adults > 1) {
        adults--;
        adultsValue.textContent = adults;
    }
});

// Дети
document.querySelector(".plus-child").addEventListener("click", () => {
    children++;
    childrenValue.textContent = children;
});

document.querySelector(".minus-child").addEventListener("click", () => {
    if (children > 0) {
        children--;
        childrenValue.textContent = children;
    }
});
