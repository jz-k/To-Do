// Check off to-dos by clicking
// We can only add a jQuery listener to elements that exist when code is run the first time (so we cannot target li directly --
// it would not apply this listener to newly created li elements).
// Following event type to listen for, direct listener to specific element type you want it to watch for
$("ul").on("click", "li", function () {
    $(this).toggleClass("completed");
});

// Click on X to delete to-do
$("ul").on("click", "span", function (event) {
    // "x" is passed in as "event"
    // jQuery method stopPropagation() prevents event bubbling,
    // so only the span containing x is triggered, and the event does not bubble up to parent elements
    event.stopPropagation();
    // Fade out the parent li,
    // then remove it from the DOM
    $(this).parent().fadeOut(500, function () {
        // "this" below refers to the li, not the span -- it is "this" parent element passed from above!
        $(this).remove();
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
        // Appends given string to whatever element is selected
        $("ul").append("<li><span><i class=\"fas fa-trash-alt\"></i></span> " + newTodo + "</li>");
    }
})

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