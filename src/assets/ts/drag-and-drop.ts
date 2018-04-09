import Squad from "./squad";
import MilitaryResource from "./military-resource";

export function drag(event) {
    var target = event.target;
    var img = target.closest(".draggable");
    if (img.classList.contains("temporary")) img.classList.remove("temporary");
    if (!img) return;
    img.classList.add("temporary");
    event.dataTransfer.setData("text", target.className);
}

export function allowDrop(event) {
    event.preventDefault();
    var target = event.target;
    var li = target.closest(".field-cell");
    if (!li) return;
}

export function drop(event) {
    event.preventDefault();
    var target = event.target;
    var li = target.closest(".field-cell");
    if (!li) return;
    var data = event.dataTransfer.getData("text").match(/temporary/);
    if (!data) return;
    var elem = document.querySelector(`.${data}`);
    elem.classList.remove("temporary");
    li.appendChild(elem);
    var warriorPrice = Number(elem.querySelector(".price").innerHTML.split(/\s/)[1]);
    elem.getAttribute("data-side") === "justice"?
    document.querySelector(".money-justice").innerHTML = "Money<br> " + (Number(document.querySelector(".money-justice").innerHTML.split(/\s/)[1]) - warriorPrice).toString() :
    document.querySelector(".money-evil").innerHTML = "Money<br> " +(Number(document.querySelector(".money-evil").innerHTML.split(/\s/)[1]) - warriorPrice).toString()
}

