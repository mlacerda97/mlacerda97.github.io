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

/* MENU ANCORA DESCENDO NO CLIQUE */

const menuItens = document.querySelectorAll('.menu a')

menuItens.forEach(item => {
    item.addEventListener('click', scrollToIdOnClick)
})

function scrollToIdOnClick(event) {
    const to = getScrollTopByHref(event.target)

    window.scroll({
        top: to,
        behavior: "smooth",
    });
}

function getScrollTopByHref(element) {
    const id = element.getAttribute('href');
    return document.querySelector(id).offsetTop;
}

// LISTAGEM DOS PRODUTOS ABAIXO

let cart = [];
let modalQt = 1
let modalKey = 0

const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

cardapioJson.map((item, index) => { //Criei uma arrow function
    let cardapioItem = c('.models .frango-item').cloneNode(true); // Preencher as informações em frangoItem

    cardapioItem.setAttribute('data-key', index); // Foi criado um data-key dentro de cada pizza

    cardapioItem.querySelector('.frango-item--img img').src = item.img;  // Colocou as imagens no cardápio
    cardapioItem.querySelector('.frango-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`; // Colocou os preços no cardápio
    cardapioItem.querySelector('.frango-item--name').innerHTML = item.name; // Colocou os nomes no cardápio
    cardapioItem.querySelector('.frango-item--desc').innerHTML = item.description; // Colocou as descrições no cardápio

    cardapioItem.querySelector('a').addEventListener('click', (e) => { // Bloqueou a troca de link quando clica no item do cardápio
        e.preventDefault();

        let key = e.target.closest('.frango-item').getAttribute('data-key') // Clicarmos no item a procurar o elemento mais proximo que tenha pizza-item
        modalQt = 1;
        modalKey = key

        c('.frangoBig img').src = cardapioJson[key].img // Colocou as imagens no modal
        c('.frangoInfo h1').innerHTML = cardapioJson[key].name // Colocou os nomes no modal
        c('.frangoInfo--desc').innerHTML = cardapioJson[key].description // Colocou a descrição no modal
        c('.frangoInfo--actualPrice').innerHTML = `R$ ${cardapioJson[key].price.toFixed(2)}` //Colocou o preço no modal
        c('.frangoInfo--qt').innerHTML = modalQt //Sempre que abrir o modal, vai estar com o n° 1 na Quantidade

        c('.frangoWindowArea').style.opacity = 0; // Opacidade zerada
        c('.frangoWindowArea').style.display = 'flex'; // Modal aparece no click
        setTimeout(() => { // Espera um pouco pra rodar a animação que tá no CSS de 0.5 sec
            c('.frangoWindowArea').style.opacity = 1; // Opacidade cheia
        }, 200)
    });

    c('.frango-area').append(cardapioItem); // aparecer as pizzas no body
});

/* EVENTOS DO MODAL */

function closeModal() { //FECHAR MODAL ANIMAÇÃO
    c('.frangoWindowArea').style.opacity = 0; // Opacidade zerada
    setTimeout(() => { // Espera um pouco pra rodar a animação que tá no CSS de 0.5 sec
        c('.frangoWindowArea').style.display = 'none'; // Modal desaparece no click
    }, 200)
}

cs('.frangoInfo--cancelButton, .frangoInfo--cancelMobileButton').forEach((item) => { // FECHAR MODAL WEB E MOBILE PELOS BOTÕES
    item.addEventListener('click', closeModal);
});

c('.frangoInfo--qtmenos').addEventListener('click', () => { //Botão menos da quantidade
    if (modalQt > 1) { // Não pode abaixar mais de 1
        modalQt--;
        c('.frangoInfo--qt').innerHTML = modalQt;
    }
});

c('.frangoInfo--qtmais').addEventListener('click', () => {//Botão mais da quantidade
    modalQt++;
    c('.frangoInfo--qt').innerHTML = modalQt;
});

c('.frangoInfo--addButton').addEventListener('click', () => { // Botão do carrinho

    let identifier = cardapioJson[modalKey].id

    let key = cart.findIndex((item) => item.identifier == identifier); //Verificar se já tem o mesmo pedido e acrescentar em vez de duplicar array

    if (key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({ // Enviar dados do pedido p/ carrinho
            identifier,
            id: cardapioJson[modalKey].id,
            qt: modalQt
        });
    }
    updatedCart();
    closeModal();
});

c('.menu-openner').addEventListener('click', () => { //abrir o carrinho pelo botão
    if(cart.length > 0) {
        c('aside').style.left = '0';
    } 
});
c('.menu-closer').addEventListener('click', () => { //fechar o carrinho pelo x
    c('aside').style.left = '100vw';
});

function updatedCart() {
    if (cart.length > 0) {
        c('aside').style.display = 'block';
        c('aside').classList.add('show');
        c('main').style.width = '70vw'
        c('header').style.width = '70vw'
        c('footer').style.width = '70vw'
        c('footer').style.margin = '0'
        c('.frangoWindowBody').style.marginLeft = '-30vw'

        c('.cart').innerHTML = '';

        let total = 0;

        for (let i in cart) {
            let cardapioItem = cardapioJson.find((item) => item.id == cart[i].id);
            total += cardapioItem.price * cart[i].qt


            let cartItem = c('.models .cart--item').cloneNode(true);

            cartItem.querySelector('img').src = cardapioItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = cardapioItem.name
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1)
                }
                updatedCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updatedCart();
            });

            c('.cart').append(cartItem)
        }

        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`
    } else {
        c('aside').style.display = 'none';
        c('aside').classList.remove('show');
        c('main').style.width = '100vw'
        c('header').style.width = '100vw'
        c('footer').style.width = '100vw'
        c('footer').style.margin = 'auto'
        c('.frangoWindowBody').style.marginLeft = '0vw'
    }

    c('.menu-opener span').innerHTML = cart.length
}
