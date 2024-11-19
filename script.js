const puzzle = document.getElementById('puzzle');
let pieces = Array.from({ length: 9 }, (_, i) => i); 


function initializePuzzle() {
    shufflePuzzle(); 
    renderPuzzle(); 
}

function shufflePuzzle() {
    pieces.sort(() => Math.random() - 0.5);
}

function renderPuzzle() {
    puzzle.innerHTML = ''; 
    pieces.forEach((piece, index) => {
        const tile = document.createElement('div');
        tile.classList.add('piece');
        tile.style.backgroundPosition = `${-(piece % 3) * 100}px ${-Math.floor(piece / 3) * 100}px`;
        tile.draggable = true;
        tile.addEventListener('dragstart', (e) => dragStart(e, index));
        tile.addEventListener('dragover', dragOver);
        tile.addEventListener('drop', (e) => drop(e, index));
        
        puzzle.appendChild(tile);
    });
}

function dragStart(e, index) {
    e.dataTransfer.setData('text/plain', index); 
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e, targetIndex) {
    const draggedIndex = e.dataTransfer.getData('text'); 
    if (draggedIndex !== targetIndex) {
        
        [pieces[draggedIndex], pieces[targetIndex]] = [pieces[targetIndex], pieces[draggedIndex]];
        renderPuzzle();
        checkWin(); 
    }
}

function checkWin() {
    const isWin = pieces.every((piece, index) => piece === index);
    if (isWin) alert('Parabéns! Você completou o quebra-cabeça!');
}

initializePuzzle();