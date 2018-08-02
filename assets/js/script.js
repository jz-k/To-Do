let todoList = [];

// If we have some local storage,
if (typeof (Storage) !== "undefined") {
    // Our array of todos is parsed from that local storage
    todoList = JSON.parse(localStorage.getItem("ToDos"));
}

// List our todos, pulled from local storage
listTodos();

addToolTips();

// If we have an array of to-dos, list each one
function listTodos() {
    if (todoList) {
        todoList.forEach(function (todo) {
            if (todo.length > 50) {
                $("ul").append("<li class=\"truncate\"><span class=\"delete\"><i class=\"fas fa-trash-alt\"></i></span>" + todo + "<span class=\"tooltiptext\">" + todo + "</span></li>");
            } else {
                $("ul").append("<li class=\"truncate\"><span class=\"delete\"><i class=\"fas fa-trash-alt\"></i></span>" + todo + "</li>");
            }
        });
    }
}

// Show the most recently added to-do
function updateTodos() {
    if (todoList[0].length > 50) {
        $("ul").prepend("<li class=\"truncate\"><span class=\"delete\"><i class=\"fas fa-trash-alt\"></i></span>" + todoList[0] + "<span class=\"tooltiptext\">" + todoList[0] + "</span></li>");
        addToolTips();
    } else {
        $("ul").prepend("<li class=\"truncate\"><span class=\"delete\"><i class=\"fas fa-trash-alt\"></i></span>" + todoList[0] + "</li>");
    }
}

// Check off to-dos by clicking
// We can only add a jQuery listener to elements that exist when code is run the first time (so we cannot target li directly --
// it would not apply this listener to newly created li elements).
// Following event type to listen for, direct listener to specific element type you want it to watch for
$("ul").on("click", "li", function () {
    $(this).toggleClass("completed");
});

// Click on trash icon to delete to-do
$("ul").on("click", ".delete", function (event) {
    // "span" is passed in as "event"
    // jQuery method stopPropagation() prevents event bubbling,
    // so only the span containing x is triggered, and the event does not bubble up to parent elements
    event.stopPropagation();
    // Fade out the parent li,
    // then remove it from the DOM
    $(this).parent().fadeOut(500, function () {

        // "this" below refers to the li, not the span -- it is "this" parent element passed from above!

        // Get the index of a to-do array element which shares content with the to-do item which has been selected
        // We use jQuery to get the contents only of the second child (by index) of the list element selected --- 
        // we don't want to also pull tooltip text
        let innerContent = $($(this).contents()[1]).text();
        // Get the index of item to remove from todoList
        let index = todoList.indexOf(innerContent);

        if (index > -1) {
            // Cut selected to-do from our array
            todoList.splice(index, 1);
        }
        // Remove the selected list item
        $(this).remove();

        // Update our local storage with the new list of to-dos
        localStorage.setItem("ToDos", JSON.stringify(todoList));
    });
})

// if "event" (again, an arbitrary name for the element that is activated by the action we have specified) is the enter key,
// add a new to-do
$("input[type='text']").keypress(function (event) {
    if (event.which === 13) {
        // Grab new to-do text from input
        let newTodo = $(this).val();
        // Clear text input by using val() as setter
        $(this).val("");
        // Create new to-do
        if (typeof (Storage) !== "undefined") {
            // Store
            if (todoList) {
                // Add new to-do to beginning of our to-do list
                todoList.unshift(newTodo);
            }
            else {
                todoList = [newTodo];
            }
            localStorage.setItem("ToDos", JSON.stringify(todoList));
            // Retrieve
            // newTodo = JSON.parse((localStorage.getItem("ToDos")));
            updateTodos();
        } else {
            $(this).innerHTML = "Sorry, your browser does not support Web Storage...";
        }
        // Appends given string to whatever element is selected
        // $("ul").append("<li class=\"truncate\"><span><i class=\"fas fa-trash-alt\"></i></span> " + newTodo + "</li>");
    }
})

// Slides our text input field in and out
// Updates the icon at top right
$("h1").on("click", ".far", function () {
    if ($("h1").html() === "To-do List <i class=\"far fa-minus-square\"></i>") {
        $(this).replaceWith("<i class=\"far fa-plus-square\"></i>");
        $("input[type='text']").val("");
        $("input[type='text']").slideToggle(300);
    }
    else {
        $(".far").replaceWith("<i class=\"far fa-minus-square\"></i>");
        $("input[type='text']").slideToggle(300);
    }
})

// My intention with the below code was to apply the mousemove to the ul, so that every new
// tooltip would be bound to mouse position immediately, without having to explicitly call addToolTips()... but it doesn't work

// If you can fix this, let me know

// $("ul").on("window.onmousemove", ".tooltiptext", function (event) {
// })

function addToolTips() {

    let tooltips = document.querySelectorAll('.tooltiptext');

    window.onmousemove = function (event) {
        var x = (event.clientX + 20) + 'px',
            y = (event.clientY + 20) + 'px';
        for (var i = 0; i < tooltips.length; i++) {
            tooltips[i].style.top = y;
            tooltips[i].style.left = x;
        }
    }
};