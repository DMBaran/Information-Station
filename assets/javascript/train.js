$(document).ready(function() {
    var config = {
        apiKey: "AIzaSyAQ3m-DFYch4HL5we0xr7X3HyaL7fzw4vQ",
        authDomain: "information-station-efcb7.firebaseapp.com",
        databaseURL: "https://information-station-efcb7.firebaseio.com",
        projectId: "information-station-efcb7",
        storageBucket: "information-station-efcb7.appspot.com",
        messagingSenderId: "276745583387"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $('#submit').on('click', function(){
        
        var name = $('#train-name').val();
        var destination = $('#destination').val();
        var firstTrainTime = $('#time').val();
        var frequency = $('#frequency').val();

        var train = {
            Name: name,
            Destination: destination,
            FirstTrainTime: firstTrainTime,
            Frequency: frequency,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };

        database.ref().push(train);

    });

    database.ref().on("child_added", function (childSnapshot) {

        Name = childSnapshot.val().Name;
        Destination = childSnapshot.val().Destination;
        FirstTrainTime = childSnapshot.val().FirstTrainTime;
        Frequency = childSnapshot.val().Frequency;
        var timeStamp = childSnapshot.val().timestamp;

        var diffTime = moment().diff(moment.unix(FirstTrainTime), "minutes");
        var timeRemainder = moment().diff(moment.unix(FirstTrainTime), "minutes") % Frequency;
        var minutes = Frequency - timeRemainder;

        var nextTrainArrival = moment().add(minutes, "m").format("LT");

        $(".table > tbody").append("<tr><td>" + Name + "</td><td>" + Destination + "</td><td>" + FirstTrainTime + "</td><td>" + Frequency + " mins" + "</td><td>" + timeStamp + "</td><td>" + minutes + "</td></tr>");

    });
});

