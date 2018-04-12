import Squad from "./squad";
import MilitaryResource from "./military-resource";
var dragTarget,
    dragParent,
    dragPrevSibling,
    dragNextSibling;

function checkPriceAndStopDrag(warriorPrice) {
    if (((Number(document.querySelector(".money-justice").innerHTML.split(/\s/)[1]) - warriorPrice) < 0) && dragTarget.dataset.side === "justice") return false;
    if (((Number(document.querySelector(".money-evil").innerHTML.split(/\s/)[1]) - warriorPrice) < 0) && dragTarget.dataset.side === "evil") return false;
    return true;
}

function checkAmountAndClone() {
    var clonedDragElem = dragTarget.cloneNode(true);
    dragPrevSibling || dragParent.prepend(clonedDragElem);
    dragNextSibling || dragParent.append(clonedDragElem);
    dragNextSibling && dragPrevSibling && dragParent.insertBefore(clonedDragElem, dragNextSibling)
}

export function drag(event) {
    dragTarget = dragParent = dragPrevSibling = dragNextSibling = null;
    var target = event.target;
    dragTarget = target.closest(".warrior");
    dragParent = dragTarget.parentNode;
    dragPrevSibling = dragTarget.previousElementSibling;
    dragNextSibling = dragTarget.nextElementSibling;
    var img = target.closest(".draggable");
    if (img.classList.contains("temporary")) img.classList.remove("temporary");
    if (!img) return;
    var warriorPrice = Number(dragTarget.querySelector(".price").innerHTML.split(/\s/)[1]);
    if (!checkPriceAndStopDrag(warriorPrice)) return;
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
    var warriorPrice = Number(elem.querySelector(".price").innerHTML.split(/\s/)[1]);
    li.appendChild(elem);
    checkAmountAndClone()

    elem.getAttribute("data-side") === "justice" ?
        document.querySelector(".money-justice").innerHTML = "Money<br> " + (Number(document.querySelector(".money-justice").innerHTML.split(/\s/)[1]) - warriorPrice).toString() :
        document.querySelector(".money-evil").innerHTML = "Money<br> " + (Number(document.querySelector(".money-evil").innerHTML.split(/\s/)[1]) - warriorPrice).toString();
}

