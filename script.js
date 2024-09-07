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
        element.addEventListener("dragleave", removeHover);
        element.addEventListener("drop", dropHandler);
    }
})

let elRows = Array.from(document.querySelectorAll(".row"));


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
    if (e.target.children.length === 0) {
        e.target.classList.add('hover');
    }
}

function removeHover(e) {
    e.target.classList.remove('hover');
}

function dropHandler(e) {
    e.preventDefault();
    let pieceId = e.dataTransfer.getData("text/html");
    let piece = document.getElementById(pieceId);
    let piecesOnTile = this.children.length;
    let tile = e.target;
    if (legalityChecker(piecesOnTile, piece, tile)) {
        e.target.appendChild(piece);
        turnChange();   
    }
    removeHover(e);
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

function legalityChecker(piecesOnTile, currPiece, targetTile) {
    let currTile = currPiece.parentElement;
    let currTileRow = (currTile.parentElement);
    let targetTileRow = (targetTile.parentElement);
    if (currPiece.classList.contains('light')) {
        if (elRows.indexOf(currTileRow) - elRows.indexOf(targetTileRow) !== 1) { // means they aren't adjacent rows
            return false;
        }
    } else if (currPiece.classList.contains('dark')) {
        if (elRows.indexOf(targetTileRow) - elRows.indexOf(currTileRow) !== 1) {
            return false;
        }
    }
    let currTileIndex = Array.from(currTileRow.children).indexOf(currTile);
    let targetTileIndex = Array.from(targetTileRow.children).indexOf(targetTile);
    console.log(currTileIndex);
    console.log(targetTileIndex);

    if (currTileIndex - targetTileIndex !== 1 && targetTileIndex - currTileIndex !== 1) {
        return false;
    }
    
    if (piecesOnTile > 0) {
        return false;
    }
    return true;
}