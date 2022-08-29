window.onscroll = function() {
    scroll()
}
/* CABEÇALHO E BOTÃO BACK-TO-TOP */

document.querySelector('.footer--copy input').style.bottom = '-200px'

function scroll() {
    
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        document.querySelector('header').style.top = '-100px'
        document.querySelector('.footer--copy input').style.bottom = '6px'
    } else {
        document.querySelector('header').style.top = '0'
        document.querySelector('.footer--copy input').style.bottom = '-200px'
    }
}

function homeSite() {
    document.querySelector(".footer--copy input").addEventListener("click", function() {
    window.scrollTo(0, 0);
});
}