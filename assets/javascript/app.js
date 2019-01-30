$(document).ready(function () {


    var topics = ["Scarface", "Pulp Fiction", "Reservoir Dogs", "A ClockWork Orange", "The Shining"];



    function createButton() {
 
        $("#button").empty();

        for (var i = 0; i < topics.length; i++) {
            var sOption = $("<button>")
            sOption.addClass("movie");
            sOption.attr("data-name", topics[i]);
            sOption.text(topics[i]);
            $("#button").append(sOption);
        }

    }


    function showGifs() {
        $('#images').empty();
        var film = $(this).attr("data-name");
        var apiKey = "BBG4zCbvgNOAu3ZBYsTcPzKNCUSXDF8h";
        var limitOf = 10;
        var fullUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + film + "&limit=" + limitOf + "&offset=0&lang=en";

        $.ajax({
            url: fullUrl,
            method: 'GET'
        }).done(function (response) {
            console.log(response.data);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class=movies>");
                var showMovie = $("<img>");
                showMovie.attr('src', results[i].images.fixed_height_still.url);
                showMovie.attr("data-still", results[i].images.fixed_height_still.url);
                showMovie.attr('data-animate', results[i].images.fixed_height.url);
                showMovie.attr("data-state", "still");
                showMovie.addClass('gif');
                gifDiv.append(showMovie)

                var rating = results[i].rating;
                var gifRating = $("<p>").text("Rating: " + rating);
                gifDiv.append(gifRating)

                $("#images").prepend(gifDiv);

            }
        })

    }

    $(document).on('click', '.gif', function () {

        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    })


    $("#submitButton").on("click", function () {
        var film = $("#userinput").val().trim();
        topics.push(film)
        form.reset();
        createButton()

        return false;
    })


    //PROCESSES 
    //_________________________________________________

    //calling the functions on click

    $(document).on("click", ".movie", showGifs);


    createButton()


})
