$('document').ready(function() {
    $('button').on('click', function() {

        var swimlaneHeader = prompt('New swimlane name');

        var newSwimlane = $('<div class="swimlane"></div>');


        newSwimlane.draggable({
            start: function() {
                $(this).css("zIndex", 100);
            }
        });
        newSwimlane.droppable({
            drop: function(event, ui) {
                var otherSwimlane = ui.draggable;
                var thisSwimlane = $(this);

                otherSwimlane.detach();
                otherSwimlane.insertAfter(thisSwimlane);
                otherSwimlane.css("zIndex", 0);

            }
        });

        newSwimlane.append('<div class="swimlaneHeader">' + swimlaneHeader + '</div>');

        var buttons = newSwimlane.append('<div class="buttons"><i class="fas fa-trash-alt icons"></i><i class="fas fa-pencil-alt icons"></i><i class="fas fa-plus icons"></i></div>');

        buttons.on('click', '.fa-trash-alt', function() {
            $(this).closest('.swimlane').remove();

        });

        buttons.on('click', '.fa-plus', function() {

            var cardHeader = prompt('New card name');

            var card = $('<div class="card"></div>');
            card.draggable();
            card.droppable({
                drop: function(event, ui) {
                    var otherCard = ui.draggable;
                    var thisCard = $(this);

                    otherCard.detach();
                    otherCard.insertBefore(thisCard);

                }
            });

            card.append('<div class="cardHeader">' + cardHeader + '</div>')
            var cardButtons = $('<div class="buttons"><i class="fas fa-trash-alt icons"></i><i class="fas fa-pencil-alt icons"></i></div>');
            card.append(cardButtons);
            newSwimlane.append(card);

            cardButtons.on('click', '.fa-trash-alt', function() {
                $(this).closest('.card').remove();

            });
            buttons.on('click', '.fa-pencil-alt', function() {
                var newName = prompt('New card name').value;
                $('this').closest(".cardHeader").remove();
                $('swimlane').append(newName);
            });
        })

        $('#swimlanes').append(newSwimlane);

        var swimlaneOrder = 0;

        var swimlane = {
            swimlaneHeader: swimlaneHeader,
            swimlaneOrder: swimlaneOrder
            }

        var swimlaneCard = {
        }

        $.ajax({
                method: "POST",
                url: "http://localhost:8080/swimlanes",
                data: swimlane
            })
            .done(function(swimlanes) {
                alert("Data Saved: " + swimlanes);
            });
        
        // $.ajax({
        //         method: "GET",
        //         url: "http://localhost:8080/swimlanes",

        //     })
        //     .done(function(swimlanes) {
        //         alert("Data Saved: " + swimlanes);
        //     });


    });
});