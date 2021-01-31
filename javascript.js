
/* firebase */
var firebaseConfig = {
    apiKey: // YOUR API KEY
    authDomain: 
    databaseURL: 
    projectId: 
    storageBucket: 
    messagingSenderId: 
    appId: 
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function sendAnswer() {
    var vastaus = document.querySelector('input[name = hire]:checked').value;

    db.collection("vastaukset")
        .add({
            vastaus: vastaus,
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

    $("#thankyouModal").modal();

    showAnswers()
}

/* vastausten määrän haku */
var vastaukset = [];

function showAnswers() {
    db.collection("vastaukset")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                vastaukset.push(doc.data());
                console.log(vastaukset);

                var vastausYES = 0;
                var vastausNO = 0;
                for (var i = 0; i < vastaukset.length; i++) {
                    console.log(vastaukset.length)
                    if (vastaukset[i].vastaus == "yes") {
                        vastausYES++;
                    } else if (vastaukset[i].vastaus == "no") {
                        vastausNO++;
                    }
                }
                document.getElementById("total").innerHTML = vastausYES + " from " + vastaukset.length + " would hire me!";

            })
        });
}
/* firebase end */

/* galleria, 
https://codepen.io/nsom/pen/VbqLew */
$(document).on("click", '[data-toggle="lightbox"]', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

/* galleria end */

/* sää haku */
function findCity() {
    var city = document.getElementById("city").value;

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=YOUR API KEY", function (data) {

        var items = [];

        items.push("<h4>" + city.toUpperCase() + "</h4>");

        items.push("<p>current weather: " + data.weather[0].description + "</p>");

        items.push("<p>temperature: " + data.main.temp + " &#8451;</p>");

        items.push("<p>wind speed: " + data.wind.speed + " m/s </p>");

        var kuva = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
        items.push("<img src=" + kuva + ">");

        $("#weather").append(items.join(""));
    });

    document.getElementById("city").value = "";

}
/* sää haku end */
