var cart = {};//корзина

function init() {
    var hash = window.location.hash.substring(1);
    console.log(hash);
    $.post(
        "admin/core.php",
        {
            "action": "loadSingleGoods",
            "id": hash
        },
        goodsOut
    );
}
function goodsOut(data) {//вывод на страницу
    //console.log(data);
    if (data != 0) {
        data = JSON.parse(data);//нужен только без файла goods.json на прямую из БД
        var out = "";
        out += '<div class="cart">';
        out += `<button class="later" data-id="${data.id}">&hearts;</button>`;
        out += `<p class="name">${data.name}</p>`;//тут обратный слэш
        out += `<img src="images/${data.img}" alt="pictures">`;//тут обратный слэш
        out += `<div class="cost">${data.cost}</div>`;//тут обратный слэш
        out += `<button class="add-to-cart" data-id="${data.id}">Купить</button>`;//в data-id получаем key товара//тут обратный слэш
        out += '</div>';
        $('.goods-out').html(out);
        $('.add-to-cart').on('click', addToCart);
        $('.later').on('click', addToLater);
    }
    else{
        $('.goods-out').html("Такого товара нет!");
    }
}
function addToLater() {//добавляем товар в "желания" в localStorage
    var later = {};
    if (localStorage.getItem('later')) {
        later = JSON.parse(localStorage.getItem('later'));
    }
    alert('Добавлено в желания');
    var id = $(this).attr('data-id');//id- товара по которому кликнул пользователь
    later[id] = 1;
    localStorage.setItem('later', JSON.stringify(later))
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