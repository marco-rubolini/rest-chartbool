$(document).ready(function(){

var url_api = 'http://157.230.17.132:4023/sales';

moment.locale('it');

visualizza_dati();

// Intercetto il click sul pulsante

$('#invio-dati').click(function(){

    // Leggo il valore dell'option nella select venditori
    var venditore_selezionato = $('.venditori').val();
    // Leggo il valore dell'option nella select mese
    var mese_selezionato = $('.mese').val();
    // recupero di nuovo la data corretta dalla stringa del mese con moment.js
    mese_selezionato = moment(mese_selezionato, "MMMM");

    mese_selezionato = mese_selezionato.format("01/MM/2017");
    // Leggo l'importo inserito nell'input dall'utente
    var importo_inserito = $('.importo-vendita-aggiunta').val();

    // Verifico che tutti i campi siano compilati
    if (importo_inserito <= 0 || mese_selezionato == 'Invalid date' || venditore_selezionato == '')  {
        // se almeno uno di questi campi non è compilato
        alert('Devi riempire tutti i campi')
    }   else {
        // se tutti i campi sono compilati
        // faccio partire la chiamata ajax con metodo post ed inserisco i nuovi dati
            $.ajax({
                url: 'http://157.230.17.132:4023/sales',
                method: 'POST',
                data: {
                    salesman: venditore_selezionato,
                    amount: importo_inserito,
                    date: mese_selezionato
                },
                success: function (){
                    // Visualizzo i grafici aggiornati
                    visualizza_dati();
                }

                ,
                error : function () {
                    alert("E' avvenuto un errore. "+errore);
                }
            })
        }



    // $.ajax({
    //     url: url_api,
    //     method: 'POST',
    //     data: {
    //         salesman: venditore_selezionato,
    //         amount: importo_inserito,
    //         date: mese_selezionato
    //     },
    //     success: function (vendite) {
    //     // ---------------- Grafico vendite vendite_mensili--------------------------
    //
    //         // Costruisco un oggetto che mappa i mesi con i dati delle vendite
    //         var dati_vendite_mensili = genera_vendite_mensili(vendite);
    //
    //         // Estraggo le chiavi dell'oggetto vendite mensili che saranno le etichette del grafico
    //         // Queste corrispondono ai nomi dei mesi
    //         var mesi = Object.keys(dati_vendite_mensili);
    //         console.log(mesi);
    //
    //         // Estraggo i valori dell'oggetto vendite mensili che saranno i dati del grafico
    //         // Queste corrispondono agli importi delle vendite nel mese
    //         var dati_mesi = Object.values(dati_vendite_mensili);
    //         console.log(dati_mesi);
    //         // Disegno il grafico passando le etichette e i dati
    //         disegna_grafico_vendite_mensili(mesi, dati_mesi)
    //
    //     // ---------------- Grafico vendite venditore--------------------------
    //
    //         // Costruisco un oggetto che mappa i venditori con il totale delle vendite
    //         var dati_vendite_venditore = genera_vendite_venditori(vendite);
    //
    //         // Estraggo le chiavi dell'oggetto dati_vendite_venditore
    //         // Queste corrispondono ai nomi dei venditori
    //         var nomi_venditori = Object.keys(dati_vendite_venditore);
    //         console.log(nomi_venditori);
    //         // Estraggo i valori dell'oggetto vendite contributo venditore
    //         // Queste corrispondono alle vendite totali di ciascun venditore
    //         var dati_venditori = Object.values(dati_vendite_venditore);
    //         console.log(dati_venditori);
    //         // Disegno il grafico passando le etichette e i dati
    //         disegna_grafico_vendite_venditori(nomi_venditori, dati_venditori)
    //
    //     },
    //     error : function () {
    //         alert("E' avvenuto un errore. "+errore);
    //     }
    // })
})

function genera_vendite_mensili (data){

    // Oggetto che conterrà il totale di vendite raggruppate per mese
    var vendite_mensili = {
        'gennaio': 0,
        'febbraio': 0,
        'marzo': 0,
        'aprile': 0,
        'maggio': 0,
        'giugno': 0,
        'luglio': 0,
        'agosto': 0,
        'settembre': 0,
        'ottobre': 0,
        'novembre': 0,
        'dicembre': 0,
    };

    var contributo_venditore = {}
    var fatturato_totale = 0;

    for (var i = 0; i < data.length; i++) {
        // Recupero l'elemento corrente che corrisponde ad un oggetto
        // Questo gogetto rappresenta le diverse vendite dell'azienda
        var vendite_azienda = data[i];
        console.log(vendite_azienda);
        // Recupero la data ddi ogni singola vendita
        var data_vendita = vendite_azienda.date;
        console.log('data di vendita: ' + data_vendita);
        // Estraggo il numero del mese dalla data di vendita
        // var mese = moment(data_vendita); errore
        var mese_numerico = moment(data_vendita, "DD/MM/YYYY").format('MM');
        console.log('Numero del mese corrispondente:' + mese_numerico);
        // Estraggo il nome del mese dalla data di vendita
        var mese_alfanumerico = moment(data_vendita, "DD/MM/YYYY").format('MMMM')
        console.log('Mese della vendita: ' + mese_alfanumerico);
        // Recupero l'importo di ogni singola vendita
        var importo_vendita = parseInt(vendite_azienda.amount);
        console.log('Importo vendita: ' + importo_vendita);
        // // Recupero il nome del venditore
        // var venditore = vendite_azienda.salesman;
        // console.log('Venditore: ' + venditore);
        // // Calcolo il fatturato totale dato dalla somma di ogni vendita
        // fatturato_totale += importo_vendita
        // console.log('Fatturato Totale: ' + fatturato_totale);

        vendite_mensili[mese_alfanumerico] += importo_vendita;

    }

    return vendite_mensili

};

function genera_vendite_venditori(data){

    var vendite_venditore = {};

    var totale_vendite = 0;

    for (var i = 0; i < data.length; i++) {
        // /recupero la vendita corrente
        var vendite_azienda = data[i];
        // Recupero l'importo di ogni singola vendita
        var importo_vendita = parseInt(vendite_azienda.amount);
        // Recupero il nome del venditore
        var venditore = vendite_azienda.salesman;
        // Verifico se non esiste questo venditore nelle iterazioni precedenti
        if (!vendite_venditore.hasOwnProperty(venditore)) {
            // Se non ho incontrato questo venditore la chiave con il suo nome non esiste
            // La definisco con il suo nome e gli assegno il valore della vendita corrente
            vendite_venditore[venditore] = importo_vendita;
        } else {
            // Altrimenti incremento l'importo alle sue vendite
            vendite_venditore[venditore] += importo_vendita;
        }
        // Incremento il totale delle vendite aziendali con l'importo corrente
        totale_vendite += importo_vendita;
    }
    console.log(totale_vendite);

    for (var venditore in vendite_venditore) {
        console.log(vendite_venditore[venditore]);
        var importo_venditore = vendite_venditore[venditore];
        var percentuale_venditore = (importo_venditore * 100 / totale_vendite).toFixed(1);
        vendite_venditore[venditore] = percentuale_venditore;
    }

    return vendite_venditore;


}

function disegna_grafico_vendite_mensili (labels, dati){

    var grafico_vendite_mensili = new Chart($('#grafico_vendite_mensili')[0].getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Vendite mensili 2017',
                data: dati,
                backgroundColor:'rgba(255, 99, 132, 1)',
                pointBorderColor: 'rgba(255, 99, 132, 1)',
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
                fill: false,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

function disegna_grafico_vendite_venditori ( labels, dati) {

    var grafico_vendite_venditori = new Chart($('#grafico_vendite_venditori')[0].getContext('2d'), {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Importi vendite',
                data: dati,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
    });

}

function visualizza_dati (){

    $.ajax({
        url: url_api,
        method: 'GET',
        success : function (vendite) {
        // ---------------- Grafico vendite vendite_mensili--------------------------

            // Costruisco un oggetto che mappa i mesi con i dati delle vendite
            var dati_vendite_mensili = genera_vendite_mensili(vendite);
            console.log(dati_vendite_mensili);

            // Estraggo le chiavi dell'oggetto vendite mensili che saranno le etichette del grafico
            // Queste corrispondono ai nomi dei mesi
            var mesi = Object.keys(dati_vendite_mensili);
            console.log(mesi);

            // Estraggo i valori dell'oggetto vendite mensili che saranno i dati del grafico
            // Queste corrispondono agli importi delle vendite nel mese
            var dati_mesi = Object.values(dati_vendite_mensili);
            console.log(dati_mesi);
            // Disegno il grafico passando le etichette e i dati
            disegna_grafico_vendite_mensili(mesi, dati_mesi)

        // ---------------- Grafico vendite venditore--------------------------

            // Costruisco un oggetto che mappa i venditori con il totale delle vendite
            var dati_vendite_venditore = genera_vendite_venditori(vendite);

            // Estraggo le chiavi dell'oggetto dati_vendite_venditore
            // Queste corrispondono ai nomi dei venditori
            var nomi_venditori = Object.keys(dati_vendite_venditore);
            console.log(nomi_venditori);
            // Estraggo i valori dell'oggetto vendite contributo venditore
            // Queste corrispondono alle vendite totali di ciascun venditore
            var dati_venditori = Object.values(dati_vendite_venditore);
            console.log(dati_venditori);
            // Disegno il grafico passando le etichette e i dati
            disegna_grafico_vendite_venditori(nomi_venditori, dati_venditori)

        },
        error : function () {
            alert("E' avvenuto un errore. "+errore);
    }
    })

}


});
