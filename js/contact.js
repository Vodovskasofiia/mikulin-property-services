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
