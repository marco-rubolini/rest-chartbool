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

        for (var i = 0; i < data.length; i++) {
            // Recupero l'elemento corrente che corrisponde ad un oggetto
            // Questo gogetto rappresenta le diverse vendite dell'azienda
            var vendite_azienda = data[i];
            console.log(vendite_azienda);
            // Recupero la data ddi ogni singola vendita
            var data_vendita = vendite_azienda.date;
            console.log(data_vendita);
            // Estraggo il mese dalla data di vendita
            // var mese = moment(data_vendita); errore
            var mese = moment(data_vendita, "DD/MM/YYYY").format('MMMM')
            console.log(mese);
            // Recupero l'importo di ogni singola vendita
            var importo_vendita = vendite_azienda.amount;
            console.log(importo_vendita);

            if (!vendite_mensili.hasOwnProperty(mese)) {
                vendite_mensili[mese] = importo_vendita
            } else {
                vendite_mensili[mese] += importo_vendita
            }
            console.log(vendite_mensili);

        }

            var chiavi = Object.keys(vendite_mensili);
            console.log(chiavi);

            var valori = Object.values(vendite_mensili);
            console.log(valori);

            var ctx = $('#myChart')[0].getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chiavi,
                    datasets: [{
                        label: '# of Votes',
                        data: valori,
                        backgroundColor: [
                            // 'rgba(255, 99, 132, 0.2)',
                            // 'rgba(54, 162, 235, 0.2)',
                            // 'rgba(255, 206, 86, 0.2)',
                            // 'rgba(75, 192, 192, 0.2)',
                            // 'rgba(153, 102, 255, 0.2)',
                            // 'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            // 'rgba(255, 99, 132, 1)',
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


    },
    error : function () {
        alert("E' avvenuto un errore. "+errore);
}
})
