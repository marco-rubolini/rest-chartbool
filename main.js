// var ctx = $('#myChart')[0].getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });

$.ajax({
    url: 'http://157.230.17.132:4023/sales',
    method: 'GET',
    success : function (data) {
        console.log(data);;

        // Oggetto che conterrà il totale di vendite raggruppate per mese

        var vendite_mensili = {};
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
            var importo_vendita = vendite_azienda.amount;
            console.log('Importo vendita: ' + importo_vendita);
            // Recupero il nome del venditore
            var venditore = vendite_azienda.salesman;
            console.log('Venditore: ' + venditore);
            // Calcolo il fatturato totale dato dalla somma di ogni vendita
            fatturato_totale += importo_vendita
            console.log('Fatturato Totale: ' + fatturato_totale);

            // Verifico se l'oggetto vendite mensili contiene già la chiave del mese
            if (!vendite_mensili.hasOwnProperty(mese_alfanumerico)) {
                // il mese corrente non è presente nell'oggetto dei mesi
                // creo una nuova chiave con il mese corrente
                // e assegno il valore con l'importo della vendita corrente
                vendite_mensili[mese_alfanumerico] = importo_vendita
            } else {
                // la chiave corrispondente a questo mese esiste già!
                // il mese corrente è già stato incontrato in qualche iterazione precedente
                // incremento il totale salvato per il mese corrente con l'importo della vendita corrente
                vendite_mensili[mese_alfanumerico] += importo_vendita
            }


            // Verifico se l'oggetto contributo venditore contiene già la chiave del venditore
            if (!contributo_venditore.hasOwnProperty(venditore)) {
                // il venditore corrente non è presente nell'oggetto contributo venditori
                // creo una nuova chiave con il venditore corrente
                // e assegno il valore con l'importo della vendita corrente
                contributo_venditore[venditore] = importo_vendita;
                console.log('Contributo del venditore: ' + contributo_venditore[venditore]);
            } else {
                // la chiave corrispondente a questo venditore esiste già!
                // il venditore corrente è già stato incontrato in qualche iterazione precedente
                // incremento il totale salvato per il venditore corrente con l'importo della vendita corrente
                contributo_venditore[venditore] += importo_vendita;
                console.log('Contributo del venditore: ' + contributo_venditore[venditore]);
            }


            // var percentuale = contributo_venditore[venditore] / fatturato_totale * 100;
            // console.log('percentuale' + percentuale);
        }

            // Estraggo le chiavi dell'oggetto vendite mensili
            // Queste corrispondono ai nomi dei mesi
            var chiavi = Object.keys(vendite_mensili);
            console.log(chiavi);
            // Estraggo i valori dell'oggetto vendite mensili
            // Queste corrispondono agli importi delle vendite nel mese
            var valori = Object.values(vendite_mensili);
            console.log(valori);

            var ctx = $('#myChart')[0].getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chiavi,
                    datasets: [{
                        label: 'Vendite mensili',
                        data: valori,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            // 'rgba(54, 162, 235, 0.2)',
                            // 'rgba(255, 206, 86, 0.2)',
                            // 'rgba(75, 192, 192, 0.2)',
                            // 'rgba(153, 102, 255, 0.2)',
                            // 'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            // 'rgba(54, 162, 235, 1)',
                            // 'rgba(255, 206, 86, 1)',
                            // 'rgba(75, 192, 192, 1)',
                            // 'rgba(153, 102, 255, 1)',
                            // 'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
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

            // Estraggo le chiavi dell'oggetto contributo venditore
            // Queste corrispondono ai nomi dei venditori
            var chiavi = Object.keys(contributo_venditore);
            console.log(chiavi);
            // Estraggo i valori dell'oggetto vendite contributo venditore
            // Queste corrispondono alle vendite totali di ciascun venditore
            var valori = Object.values(contributo_venditore);
            console.log(valori);

            var contributo = [];
            for (var i = 0; i < valori.length; i++) {
                var percentuale = (valori[i]/fatturato_totale*100).toFixed(2);
                // percentuale.toFixed(2);
                console.log(percentuale);
                contributo.push(percentuale)
            }
            console.log(contributo);




            var ctx = $('#myChart2')[0].getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: chiavi,
                    datasets: [{
                        label: 'Vendite mensili',
                        data: contributo,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            // 'rgba(153, 102, 255, 0.2)',
                            // 'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            // 'rgba(153, 102, 255, 1)',
                            // 'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
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



    },
    error : function () {
        alert("E' avvenuto un errore. "+errore);
}
})
