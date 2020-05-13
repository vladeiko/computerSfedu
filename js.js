window.onload = function () {
    var j = 0;
    var image = document.getElementsByTagName("img");
    var mass = [];
    var test = ["img/i1.jpg", "img/i2.jpg", "img/i3.jpg", "img/i4.jpg", "img/i5.jpg"];
    for (var i = 0; i < image.length; i++) {
        var newArray = image[i].getAttribute("src");
        if (newArray === test[j]) {
            mass[j] = image[i];
            j++;
        }
    }
    setInterval(okey, 6000, image, mass);
};

function okey(image, mass) {
    for (var i = 0; i < mass.length; i++) {
        var noneImg = mass[i];
        console.log(noneImg);
        var srcName = noneImg.getAttribute("src");
        var time = Math.ceil(Math.random() * 5);
        console.log(time * 1000);
        setTimeout(inviz, time * 500, noneImg);
        setTimeout(view, time * 1000, noneImg, srcName);
    }
}

function inviz(eventObj) {
    eventObj.src = "";
    console.log(eventObj.src = "");
}

function view(eventObj, srcName) {
    eventObj.src = srcName;
    console.log(eventObj.src = srcName);
}
var slideIndex = 1;
showSlides(slideIndex);
// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}
// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
var btn = $('#button');
$(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    }
    else {
        btn.removeClass('show');
    }
});
btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, '300');
});

 $(document).ready(function(){
    $("#menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
    });
});
