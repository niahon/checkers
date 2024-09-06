window.addEventListener ("DOMContentLoaded", () => {
    let elLightPieces = document.querySelectorAll('.piece.light');
    let elDarkPieces = document.querySelectorAll('.piece.dark');
    for (element of elLightPieces) {
        element.addEventListener("dragstart", lightdragstartHandler);
    }
    for (element of elDarkPieces) {
        element.addEventListener("dragstart", darkdragstartHandler);
    }
    let elTile = document.querySelectorAll('.tile.dark');
    for (element of elTile) {
        element.addEventListener("dragover", dragoverHandler);
        element.addEventListener("drop", dropHandler);
    }
})

let playCount = 0;

function lightdragstartHandler(e) {
    console.log(playCount);
    if (playCount % 2 === 0) {
        e.dataTransfer.setData(`text/html`, e.target.id)
        e.dataTransfer.effectAllowed = "move";
    }
    else {
        return;
    }
}

function darkdragstartHandler(e) {
    console.log(playCount);
    if (playCount % 2 === 1) {
        e.dataTransfer.setData(`text/html`, e.target.id)
        e.dataTransfer.effectAllowed = "move";
    }
    else {
        return;
    }
}

function dragoverHandler(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
}

function dropHandler(e) {
    e.preventDefault();
    if (this.children.length > 0) {
        return;
    }
    let data = e.dataTransfer.getData("text/html");
    e.target.appendChild(document.getElementById(data));

    turnChange();
}

function turnChange() {
    playCount ++;
    let turnText = document.getElementById('turn');
    if (playCount % 2 === 0) {
        turnText.textContent = "White's turn";
    } else {
        turnText.textContent = "Black's turn";
    }
}