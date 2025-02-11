let totalSeats = 20;
let seatsLeft = totalSeats;
const reservationForm = document.getElementById("reservationForm");
const seatsLeftSpan = document.getElementById("seatsLeft");
const reservationTable = document.getElementById("reservationTable");

reservationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let guestCount = parseInt(document.getElementById("guestCount").value);

    if (guestCount > seatsLeft) {
        alert("Not enough seats available!");
        return;
    }

    let checkInTime = new Date().toLocaleTimeString();
    let row = reservationTable.insertRow();
    row.innerHTML = `
        <td>${name}</td>
        <td>${phone}</td>
        <td>${guestCount}</td>
        <td>${checkInTime}</td>
        <td id="checkout-${name}">-</td>
        <td>
            <button onclick="checkout('${name}', ${guestCount})">Checkout</button>
            <button onclick="deleteReservation(this, '${name}', ${guestCount})">Delete</button>
        </td>
    `;

    seatsLeft -= guestCount;
    seatsLeftSpan.textContent = seatsLeft;
    reservationForm.reset();
});

function checkout(name, guestCount) {
    let checkoutCell = document.getElementById(`checkout-${name}`);
    if (checkoutCell.textContent === "-") {
        checkoutCell.textContent = new Date().toLocaleTimeString();
    }
}

function deleteReservation(button, name, guestCount) {
    let checkoutTime = document.getElementById(`checkout-${name}`).textContent;
    
    if (checkoutTime === "-") {
        seatsLeft += guestCount;
    }
    
    button.parentElement.parentElement.remove();
    seatsLeftSpan.textContent = seatsLeft;
}
