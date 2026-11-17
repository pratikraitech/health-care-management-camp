// LIBRARY BOOKING SYSTEM
// COMPLETE JAVASCRIPT INTEGRATION

let selectedSeat = null;

let occupiedSeats = [
    2, 5, 8, 12, 15,
    19, 22, 26, 30, 35
];

let myBookings = JSON.parse(
    localStorage.getItem("myBookings") || "[]"
);


// GENERATE SEATS

function generateSeats() {

    const container = document.getElementById("seat-container");

    container.innerHTML = "";

    for (let i = 1; i <= 40; i++) {

        let seat = document.createElement("button");

        let seatName = "A" + String(i).padStart(2, "0");

        seat.innerText = seatName;

        seat.classList.add("seat");

        let alreadyBooked = myBookings.some(
            booking => booking.seat === seatName
        );

        if (occupiedSeats.includes(i) || alreadyBooked) {

            seat.classList.add("occupied");
            seat.disabled = true;

        }

        seat.onclick = function () {

            document.querySelectorAll(".seat")
                .forEach(s => s.classList.remove("selected"));

            seat.classList.add("selected");

            selectedSeat = seatName;

            document.getElementById("selected-seat").innerText =
                "Selected Seat: " + seatName;

        };

        container.appendChild(seat);

    }

}


// CONFIRM SEAT

function confirmSeat() {

    if (!selectedSeat) {

        alert("Please select a seat first!");
        return;

    }

    document.getElementById("seatNumber").value =
        selectedSeat;

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

}


// BOOKING FORM

document.getElementById("bookingForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("studentName").value;

    let studentID = document.getElementById("studentID").value;

    let seat = document.getElementById("seatNumber").value;

    let date = document.getElementById("bookingDate").value;

    let time = document.getElementById("timeSlot").value;

    let purpose = document.getElementById("purpose").value;

    if (!seat) {
        alert("Please select a seat!");
        return;
    }

    if (date < new Date().toISOString().slice(0, 10)) {
        alert("Please select today or a future date!");
        return;
    }

    let seatNumber = Number(seat.substring(1));

    if (occupiedSeats.includes(seatNumber) ||
        myBookings.some(b => b.seat === seat)) {

        alert("This seat is already booked!");
        return;

    }

    let booking = {
        name,
        studentID,
        seat,
        date,
        time,
        purpose
    };

    myBookings.push(booking);

    localStorage.setItem(
        "myBookings",
        JSON.stringify(myBookings)
    );

    alert("Booking Successful!");

    this.reset();

    selectedSeat = null;

    document.getElementById("selected-seat").innerText =
        "No Seat Selected";

    updateDashboard();

    generateSeats();

    displayHistory();

    updateAdminDashboard();

});


// DASHBOARD UPDATE

function updateDashboard() {

    let booked = myBookings.length;

    let occupied = occupiedSeats.length +
        myBookings.filter(b => !occupiedSeats.includes(
            Number(b.seat.substring(1))
        )).length;

    let available = 40 - occupied;

    document.getElementById("available").innerText =
        available;

    document.getElementById("occupied").innerText =
        occupied;

    document.getElementById("bookings").innerText =
        booked;

}


// BOOKING HISTORY

function displayHistory() {

    let table = document.getElementById("historyTable");

    table.innerHTML = "";

    if (myBookings.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6">No bookings found.</td>
            </tr>
        `;

        return;

    }

    myBookings.forEach(function(booking) {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${booking.name}</td>
            <td>${booking.studentID}</td>
            <td>${booking.seat}</td>
            <td>${booking.date}</td>
            <td>${booking.time}</td>
            <td><span class="status">Confirmed</span></td>
        `;

        table.appendChild(row);

    });

}


// ADMIN DASHBOARD

function updateAdminDashboard() {

    let booked = myBookings.length;

    let occupied = occupiedSeats.length +
        myBookings.filter(b => !occupiedSeats.includes(
            Number(b.seat.substring(1))
        )).length;

    document.getElementById("adminTotal").innerText = 40;

    document.getElementById("adminAvailable").innerText =
        40 - occupied;

    document.getElementById("adminOccupied").innerText =
        occupied;

    document.getElementById("adminBookings").innerText =
        booked;

    let table = document.getElementById("adminTable");

    table.innerHTML = "";

    myBookings.forEach(function(booking) {

        table.innerHTML += `
            <tr>
                <td>${booking.name}</td>
                <td>${booking.studentID}</td>
                <td>${booking.seat}</td>
                <td>${booking.date}</td>
            </tr>
        `;

    });

}


// NAVIGATION FUNCTIONS

function openSeats() {

    document.getElementById("seats").scrollIntoView({
        behavior: "smooth"
    });

}

function bookSeat() {

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

}

function viewHistory() {

    displayHistory();

    document.getElementById("history").scrollIntoView({
        behavior: "smooth"
    });

}


// RESOURCES

function resourceInfo(name) {
    alert(
        name + " details:\n\n" +
        "This facility is available in our library. " +
        "Please contact the library administration for more information."
    );
}


// SUPPORT

function contactSupport() {

    alert("Please contact your library administration.");

}


// INITIALIZE WEBSITE

generateSeats();

updateDashboard();

displayHistory();

updateAdminDashboard();