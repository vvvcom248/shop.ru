//мой

var cart = {};
//----1)-----проверяю что в localStorage----------
function loadCart() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        showCart()
    }
    else {
        $('.main-cart').html('Корзина пуста!')
    }
}
function showCart() {
    if (!isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста!')
    }
    else {
        //вытаскиваем товар из файла goods.json
        $.getJSON('goods.json', function (data) {
            //и помещаем в переменую goods
            var goods = data;
            var out = '';
            //запускаем перебор корзины
            for (var id in cart) {
                out += ` <button data-id="${id}" class="del-goods">X</button>`;
                out += ` <img src="images/${goods[id].img}" alt="">`;
                out += ` ${goods[id].name}`;
                out += ` <button data-id="${id}" class="minus-goods">-</button>`;
                out += ` ${cart[id]}`;//колличество товара
                out += ` <button data-id="${id}" class="plus-goods">+</button>`;
                out += ` Сумма: ${cart[id]*goods[id].cost}`;//колличество умножаем на цену
                out += ` <br>`;
            }
            //теперь отресуем на странице
            $('.main-cart').html(out);
            $('.del-goods').on('click', delGoods);//при клике на кнопку выполняется функция delGoods
            $('.minus-goods').on('click', minusGoods)//событие на нажатие кнопки "-"вызываем функцию minusGoods()
            $('.plus-goods').on('click', plusGoods)
        });
    }
}
//удаление товара из корзины
function delGoods() {
    var id = $(this).attr('data-id');//в id получаем кнопку по которой кликнули
    delete cart[id];//удаляем товар 
    saveCart();//сохраняем в localStorag
    showCart();//перерисовываем корзину
}
/////////////////
function minusGoods() {
    var id = $(this).attr('data-id');//в id получаем кнопку по которой кликнули
    if (cart[id] == 1) {
        delete cart[id];
    }
    else {
        cart[id]--;
    }
    saveCart();//сохраняем в localStorag
    showCart();//перерисовываем корзину
}
/////////////////
function plusGoods() {
    var id = $(this).attr('data-id');//в id получаем кнопку по которой кликнули
    cart[id]++;
    saveCart();//сохраняем в localStorag
    showCart();//перерисовываем корзину
}
//--------------- тут сохраняем корзину в localStorage --------------
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
//функция проверки корзины на пустоту
function isEmpty(object) {
    for (var key in object)
        if (object.hasOwnProperty(key)) return true;
    return false;
}
//////////////
$(document).ready(function () {
    loadCart();
});