const container = document.getElementById('seatContainer');
const count = document.getElementById('count');
const price = document.getElementById('price');
const select = document.getElementById('movieOptions');
const allSeats = document.querySelectorAll('.seat')
let option = localStorage.getItem('defaultMovieIndex') ? select.options[localStorage.getItem('defaultMovieIndex')].value : select.options[select.selectedIndex].value;
select.selectedIndex = localStorage.getItem('defaultMovieIndex') || 0;
let moviePrice = parseInt(localStorage.getItem('totalTicketPrice')) || 0;
let ticketCount = parseInt(localStorage.getItem('totalTicketCount')) || 0;
count.innerText = ticketCount;
price.innerText = moviePrice;
defaultSelectedSeat();
function onChangeMovie(){
    option = select.options[select.selectedIndex].value;
    localStorage.setItem('defaultMovieIndex',select.selectedIndex);
    calculatePrice();
}
function defaultSelectedSeat(){
    const selectedSeat = JSON.parse(localStorage.getItem('totalSelectedSeat')) || '';
    if(selectedSeat){
        selectedSeat.map((seat) => {
            allSeats[seat].classList.add('selected');
        })
    }
}
function calculatePrice(){
    moviePrice =option * ticketCount;
    localStorage.setItem('totalTicketPrice',moviePrice);
    count.innerText = localStorage.getItem('totalTicketCount') || 0;
    price.innerText = localStorage.getItem('totalTicketPrice');
}
function updateSelectedSeat(){
    const selectedSeat = document.querySelectorAll('.row .selected')
    const seatIndex = [...selectedSeat].map((seat) => [...allSeats].indexOf(seat))
    localStorage.setItem('totalSelectedSeat',JSON.stringify(seatIndex));

}
container.addEventListener('click',function(event){
    const seat = event.target.classList.contains('seat');
    const selectedSeat = event.target.classList.contains('selected');
    const occupiedSeat = event.target.classList.contains('occupied');
    if(selectedSeat && seat){
        event.target.classList.remove('selected');
        ticketCount -= 1;
        localStorage.setItem('totalTicketCount',ticketCount);
    }
    else if(!occupiedSeat && seat){
        event.target.classList.add('selected');
        ticketCount += 1;
        localStorage.setItem('totalTicketCount',ticketCount);
    }
    calculatePrice();
    updateSelectedSeat();
})