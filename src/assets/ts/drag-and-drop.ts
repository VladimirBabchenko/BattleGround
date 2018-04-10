import Squad from "./squad";
import MilitaryResource from "./military-resource";
// var dragTarget;
// var parentElem;
export function drag(event) {
    document.querySelector(".money-justice").innerHTML
    var target = event.target;
    // dragTarget=target;
    // parentElem = dragTarget.parentNode;
    var img = target.closest(".draggable");
    if (img.classList.contains("temporary")) img.classList.remove("temporary");
    if (!img) return;
    if ((Number(document.querySelector(".money-justice").innerHTML.split(/\s/)[1]) - warriorPrice) < 0) return;
    if ((Number(document.querySelector(".money-evil").innerHTML.split(/\s/)[1]) - warriorPrice) < 0) return;
    img.classList.add("temporary");
    event.dataTransfer.setData("text", target.className);
    var warriorPrice = Number(target.closest(".warrior").querySelector(".price").innerHTML.split(/\s/)[1]);
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
    var warriorPrice = Number(elem.querySelector(".price").innerHTML.split(/\s/)[1]);
    if ((Number(document.querySelector(".money-justice").innerHTML.split(/\s/)[1]) - warriorPrice) < 0) return;
    if ((Number(document.querySelector(".money-evil").innerHTML.split(/\s/)[1]) - warriorPrice) < 0) return;
    li.appendChild(elem);
    
    console.log(warriorPrice);
    elem.getAttribute("data-side") === "justice"?
    document.querySelector(".money-justice").innerHTML = "Money<br> " + (Number(document.querySelector(".money-justice").innerHTML.split(/\s/)[1]) - warriorPrice).toString() :
    document.querySelector(".money-evil").innerHTML = "Money<br> " +(Number(document.querySelector(".money-evil").innerHTML.split(/\s/)[1]) - warriorPrice).toString();
    // parentElem.appendChild(dragTarget.cloneNode(true))
}

