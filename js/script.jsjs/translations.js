const translations = {

    de:{

        "hero-title":"Ihr zuverlässiger Partner für Immobilienbetreuung in Bern",

        "contact-button":"Kontakt aufnehmen"

    },

    en:{

        "hero-title":"Your reliable partner for property management in Bern",

        "contact-button":"Contact us"

    }

};

function changeLanguage(language){

    document.querySelectorAll("[data-key]").forEach(element=>{

        const key=element.dataset.key;

        element.innerHTML=translations[language][key];

    });

}
