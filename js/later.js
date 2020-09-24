
function init() {
    // $.getJSON("goods.json", goodsOut)//читаем фаил goods.json
    $.post(
        "admin/core.php", {
        "action": "loadGoods"
    },
        goodsOut
    );
}
function goodsOut(data) {//вывод на страницу
    //console.log(data);
    data = JSON.parse(data);//нужен только без файла goods.json на прямую из БД
    var out = "";
    var later = {};
    ///////////////////
    if (localStorage.getItem('later')) {
        later = JSON.parse(localStorage.getItem('later'));
        for (var key in later) {
            out += '<div class="cart">';

            out += `<p class="name">${data[key].name}</p>`;//тут обратный слэш
            out += `<img src="images/${data[key].img}" alt="pictures">`;//тут обратный слэш
            out += `<div class="cost">${data[key].cost}</div>`;//тут обратный слэш
            out += `<a href="goods.html#${key}">Просмотреть</a>`
           // out += `<button class="add-to-cart" data-id="${key}">Просмотреть</button>`;//в data-id получаем key товара//тут обратный слэш
            out += '</div>';
        }
        $('.goods-out').html(out);
    }
    else {
        $('.goods-out').html('Добавьте товар.');
    }
}

$(document).ready(function () {
    init();
});