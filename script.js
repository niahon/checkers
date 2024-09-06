window.addEventListener ("DOMContentLoaded", () => {
    let elLightPieces = document.querySelectorAll('.piece.light');
    for (element of elLightPieces) {
        element.addEventListener("dragstart", dragstartHandler);
    }
    let elTile = document.querySelectorAll('.tile.dark');
    for (element of elTile) {
        element.addEventListener("dragover", dragoverHandler);
        element.addEventListener("drop", dropHandler);
    }
})

function dragstartHandler(e) {
    e.dataTransfer.setData("text/html", e.target.id)
    e.dataTransfer.effectAllowed = "move";
}

function dragoverHandler(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
}

function dropHandler(e) {
    e.preventDefault();
    let data = e.dataTransfer.getData("text/html");
    e.target.appendChild(document.getElementById(data));
}