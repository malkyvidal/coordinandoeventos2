
const { fromEvent } = require('rxjs');
const { map, takeUntil, switchMap,tap } = require('rxjs/operators');

let draggable = document.getElementById('todo-item');
let mouseDown$ = fromEvent(draggable, 'mousedown');
let mouseMove$ = fromEvent(document, 'mousemove')
let mouseUp$ = fromEvent(document, 'mouseup').pipe(
    tap(()=>draggable.style.backgroundColor="#F44336"),
);

let movimiento$ = mouseMove$
    .pipe(
            
        map(event => {
            event.preventDefault();
            
            return {
                x: event.clientX,
                y: event.clientY
            };
        }),
        takeUntil(mouseUp$)
    );

mouseDown$.pipe(
    tap(()=>draggable.style.backgroundColor="#E57373"),
    switchMap(() => movimiento$)
).subscribe(pos => {
    // Draggable is absolutely positioned
    
    draggable.style.left = pos.x + 'px';
    draggable.style.top = pos.y + 'px';
});





/* 
 let isMouseDown = false;
let itemsContainer = document.getElementById("items-container");
mouseOffset = {x:0,y:0};

let todosContainer = document.getElementById("todos-container");

let item = document.getElementById("todo-item");


    
    item.addEventListener("mousedown", (e) => { onMouseDown(e, item); });
    
    document.body.addEventListener("mousemove", (e) => {
        onMouseMove(e, item);
    });
    
    item.addEventListener("mouseup", (e) => {
      onMouseUp(e, item);
    });


  
function onMouseDown(e, item) {
    
  isMouseDown = true;

  mouseOffset = {x: item.offsetLeft - e.clientX, y: item.offsetTop - e.clientY};

  item.style.backgroundColor = "#E57373";
}

function onMouseUp(e, item) {
    
  isMouseDown = false;
  item.style.backgroundColor = "#F44336";
}

function onMouseMove(e, item) {
    console.log('mouse moviendose')
    e.preventDefault(); 
    if(isMouseDown) {
     
      item.style.left = e.clientX + mouseOffset.x + "px";
      item.style.top = e.clientY + mouseOffset.y + "px";
    
    }
  }  */