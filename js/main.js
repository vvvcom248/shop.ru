
var cart = {};//корзина

function init() {
    $.getJSON("goods.json", goodsOut)//читаем фаил goods.json
}
function goodsOut(data) {//вывод на страницу
    //console.log(data);
    var out = "";
    for (var key in data) {
        /*
        ------ES5
        out += '<div class="cart">';
        out += '<p class="name">' + data[key].name + '</p>';
        out += '<img src="images/' + data[key].img + '" alt="pictures">';
        out += '<div class="cost">' + data[key].cost + '</div>';
        out += '<buuton class="add-to-cart">Купить</buuton>';
        out += '</div>';
        */
        //------ES6
        out += '<div class="cart">';
        out += `<p class="name">${data[key].name}</p>`;//тут обратный слэш
        out += `<img src="images/${data[key].img}" alt="pictures">`;//тут обратный слэш
        out += `<div class="cost">${data[key].cost}</div>`;//тут обратный слэш
        out += `<buuton class="add-to-cart" data-id="${key}">Купить</buuton>`;//в data-id получаем key товара//тут обратный слэш
        out += '</div>';
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
}
function addToCart() {//добавляем товар в корзину
    var id = $(this).attr('data-id');//в переменную id ложим data-id тоара
    //console.log(id);//проверяем id  в консоли
    if (cart[id] == undefined) {
        cart[id] = 1;
    }
    else {
        cart[id]++;
    }
    //console.log(cart);
    showMiniCart();
    saveCart();
}
//--------------- тут сохраняем корзину в localStorage --------------
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
/////////////////////////////////////////////////////////////////
function showMiniCart() {//показать мини корзину
    var out = "";
    for (var key in cart) {
        out += key + '----' + cart[key] + '<br>';    
    }
    $('.mini-cart').html(out);//выводим на страницу в mini-cart
}
//-----------проверяем что в localStorade----------------------------
function loadCart() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }

}

$(document).ready(function () {
    init();
    loadCart();
});