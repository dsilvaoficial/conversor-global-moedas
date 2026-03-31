const moedas = {
    // América
    USD: "Estados Unidos - Dólar",
    BRL: "Brasil - Real",
    ARS: "Argentina - Peso",
    CLP: "Chile - Peso",
    COP: "Colômbia - Peso",
    MXN: "México - Peso",
    CAD: "Canadá - Dólar",
    PEN: "Peru - Sol",
    UYU: "Uruguai - Peso",

    // Europa
    EUR: "União Europeia - Euro",
    GBP: "Reino Unido - Libra",
    CHF: "Suíça - Franco",
    SEK: "Suécia - Coroa",
    NOK: "Noruega - Coroa",
    DKK: "Dinamarca - Coroa",
    PLN: "Polônia - Zloty",

    // Ásia
    JPY: "Japão - Iene",
    CNY: "China - Yuan",
    INR: "Índia - Rúpia",
    KRW: "Coreia do Sul - Won",
    SGD: "Singapura - Dólar",
    THB: "Tailândia - Baht",
    MYR: "Malásia - Ringgit",
    IDR: "Indonésia - Rupia",
    PHP: "Filipinas - Peso",
    AED: "Emirados Árabes - Dirham",
    SAR: "Arábia Saudita - Riyal",

    // África
    ZAR: "África do Sul - Rand",
    EGP: "Egito - Libra",
    NGN: "Nigéria - Naira",
    KES: "Quênia - Xelim",
    MAD: "Marrocos - Dirham",
    GHS: "Gana - Cedi",

    // Oceania
    AUD: "Austrália - Dólar",
    NZD: "Nova Zelândia - Dólar"
};

const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");

function carregarMoedas() {
    for (let codigo in moedas) {
        let option1 = document.createElement("option");
        option1.value = codigo;
        option1.textContent = `${codigo} - ${moedas[codigo]}`;

        let option2 = option1.cloneNode(true);

        fromSelect.appendChild(option1);
        toSelect.appendChild(option2);
    }

    fromSelect.value = "USD";
    toSelect.value = "BRL";
}

async function converter() {
    let valor = document.getElementById("valor").value;
    let from = fromSelect.value;
    let to = toSelect.value;
    let resultado = document.getElementById("resultado");

    if (!valor || valor <= 0) {
        resultado.innerHTML = "Digite um valor válido.";
        return;
    }

    try {
        let response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        let data = await response.json();

        if (data.result === "success") {
            let taxa = data.rates[to];
            let convertido = valor * taxa;

            resultado.innerHTML = `${valor} ${from} = ${convertido.toFixed(2)} ${to}`;
        } else {
            resultado.innerHTML = "Erro ao buscar dados.";
        }
    } catch (error) {
        resultado.innerHTML = "Erro ao conectar com a API.";
    }
}

document.getElementById("invert").addEventListener("click", () => {
    let temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
});

carregarMoedas();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/conversor-global-moedas/sw.js")
    .then(() => console.log("Service Worker registrado"));
}
