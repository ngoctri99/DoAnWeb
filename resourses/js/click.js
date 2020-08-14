function changeicon(x) {
    x.classList.toggle("change");
}
var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 2 seconds
}

// function showedit() {
//     var x = document.getElementById("ttchinh");
//     var y = document.getElementById("chinhsua");
//     if (x.style.display === "none" || y.style.display === "block") {
//         x.style.display = "block";
//         y.style.display = "none";
//     } else {
//         x.style.display = "none";
//         y.style.display = "block";
//     }
// }

function showedit() {
    document.getElementById("ttchinh").style.display = "none";
    document.getElementById("chinhsua").style.display = "block";
}

function close() {
    // var a = document.getElementById("ttchinh");
    // var b = document.getElementById("chinhsua");
    // if (a.style.display === "none" || b.style.display === "block") {
    //     a.style.display = "block";
    //     b.style.display = "none";
    // } else {
    //     a.style.display = "none";
    //     b.style.display = "block";

    document.getElementById("ttchinh").style.display = "block";
    document.getElementById("chinhsua").style.display = "none";
}
$(document).ready(function() {
    $(".logo-user").click(function() {
        $(".sub-logo").addClass("show");

    })
})