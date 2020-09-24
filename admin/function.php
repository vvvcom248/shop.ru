<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "eshop";

function connect()
{
    $conn = mysqli_connect("localhost", "root", "", "eshop");
    if (!$conn) {
        die("Connection failed:" . mysqli_connect_error());
    }
    mysqli_set_charset($conn, "utf8");
    return $conn;
}
function init()
{
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT id,name FROM goods";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}
function selectOneGoods()
{
    $conn = connect();
    $id = $_POST['gid'];
    $sql = "SELECT * FROM goods WHERE id='$id'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function updateGoods()
{
    $conn = connect(); //подключаемся к базе данных
    $id = $_POST['id'];
    $name = $_POST['gname']; //gname- имя в базе данных в mysql
    $cost = $_POST['gcost'];
    $descr = $_POST['gdescr'];
    $ord = $_POST['gorder'];
    $img = $_POST['gimg'];
    //goods - имя базы данных в mysql
    $sql = "UPDATE goods SET name='$name',cost='$cost',description='$descr',ord='$ord',img='$img' WHERE id='$id'";
    if (mysqli_query($conn, $sql)) {
        echo "1";
    } else {
        echo "Error" . mysqli_error($conn);
    }

    mysqli_close($conn);
    writeJSON();
}

//////////////////////////////////////////////////////
function newGoods() //создаем новый товар
{
    $conn = connect(); //подключаемся к базе данных
    $name = $_POST['gname']; //gname- имя в базе данных в mysql
    $cost = $_POST['gcost'];
    $descr = $_POST['gdescr'];
    $ord = $_POST['gorder'];
    $img = $_POST['gimg'];
    //goods - имя базы данных в mysql
    $sql = "INSERT INTO goods(name, cost, description, ord, img) 
    VALUES ('$name','$cost','$descr','$ord','$img')";

    if (mysqli_query($conn, $sql)) {
        echo "1";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
    writeJSON();
}

function writeJSON(){
    $conn = connect();
    $sql = "SELECT * FROM goods";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        file_put_contents('../goods.json', json_encode($out));
    } else {
        echo "0";
    }
    mysqli_close($conn);
    

}