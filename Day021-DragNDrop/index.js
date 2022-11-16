const fill = document.querySelector('.fill'),
      boxes = document.querySelectorAll('.box');

fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

for (const box of boxes) {
    console.log('ite');
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragenter', dragEnter);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', dragDrop);
}

function dragStart(){
    console.log('dragStart');
    this.className += ' hold';
    setTimeout(() => this.className = 'invisible', 0)
}

function dragEnd(){
    this.className = 'fill';
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
    this.className += ' hovered'
}

function dragLeave(){
    this.className = 'box'
}

function dragDrop(){
    this.className = 'box'
    this.append(fill)
}