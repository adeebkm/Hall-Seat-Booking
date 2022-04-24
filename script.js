const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count= document.getElementById('count');
const total= document.getElementById('total');
const hallSelect= document.getElementById('hall');

populateUI();

let ticketPrice= +hallSelect.value;

function setHallData(hallIndex,hallPrice){
    localStorage.setItem('selectedHallIndex',hallIndex);
    localStorage.setItem('selectedHallPrice',hallPrice);
}

function updateSelectedCount(){
    const selectedSeats=document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat=> [...seats].indexOf(seat));    

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    
    const selectedSeatsCount=selectedSeats.length;

    count.innerText=selectedSeatsCount;
    total.innerText=selectedSeatsCount*ticketPrice;
}


function populateUI(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats!==null &&selectedSeats.length>0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        })
    }
    const selectedHallIndex=localStorage.getItem('selectedHallIndex');
    if(selectedHallIndex!== null){
        hallSelect.selectedIndex=selectedHallIndex;
    }
}


hallSelect.addEventListener('change', e=>{
    ticketPrice= +e.target.value;
    setHallData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();
});

container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

updateSelectedCount();