function init() {
    $.getJSON("goods.json", goodsOut)//читаем фаил goods.json
}
function goodsOut(data) {//вывод на страницу
    console.log(data);
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
        out += `<img src="images/${data[key].img}" alt="pictures">`;
        out += `<div class="cost">${data[key].cost}</div>`;
        out += '<buuton class="add-to-cart">Купить</buuton>';
        out += '</div>';
    }
    $('.goods-out').html(out);
}

$(document).ready(function () {
    init();
});