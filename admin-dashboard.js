function showSection(sectionId) {
    const sections = ['homeSection', 'reservationSection', 'seatAvailabilitySection','scheduleSection', 'historySection'];
    sections.forEach(id => {
        document.getElementById(id).style.display = id === sectionId ? 'block' : 'none';
    });

    if (sectionId === 'reservationSection') {
        loadReservations();
    } else if (sectionId === 'historySection') {
        showVerifiedHistory();
    } else if (sectionId === 'seatAvailabilitySection') {
        loadSeatAvailability();
    } else if (sectionId === 'scheduleSection') {
        loadScheduleSection();
    }
}


    function addSchedule() {
    const busNumber = document.getElementById('busNumber').value;
    const scheduleTime = document.getElementById('scheduleTime').value;
    const driver = document.getElementById('driver').value;
    const conductor = document.getElementById('conductor').value;
    const route = document.getElementById('route').value;

    const newSchedule = { busNumber, scheduleTime, driver, conductor, route };
    let schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    schedules.push(newSchedule);
    localStorage.setItem('schedules', JSON.stringify(schedules));

    alert('Schedule added successfully!');
    document.getElementById('scheduleForm').reset();
    displaySchedules();
}

 // Display schedules
 function displaySchedules() {
    const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    const scheduleList = document.getElementById('scheduleList');
    scheduleList.innerHTML = '';

    schedules.forEach((schedule, index) => {
        scheduleList.innerHTML += `
            <tr>
                <td>${schedule.busNumber}</td>
                <td>${schedule.scheduleTime}</td>
                <td>${schedule.driver}</td>
                <td>${schedule.conductor}</td>
                <td>${schedule.route}</td>
                <td>
                    <button onclick="deleteSchedule(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

  function deleteSchedule(index) {
    let schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    schedules.splice(index, 1);
    localStorage.setItem('schedules', JSON.stringify(schedules));
    displaySchedules();
}

// Load schedules on page load
document.addEventListener('DOMContentLoaded', displaySchedules);

            function loadReservations() {
                const adminBookings = JSON.parse(localStorage.getItem('adminBookings')) || [];
                const reservationsList = document.getElementById('reservationsList');
                reservationsList.innerHTML = '';

                if (adminBookings.length === 0) {
                    reservationsList.innerHTML = '<tr><td colspan="11">No reservations to manage.</td></tr>';
                } else {
                    adminBookings.forEach((booking, index) => {
                        reservationsList.innerHTML += `<tr>
                            <td><input type="checkbox" id="booking-${index}"></td>
                            <td>${booking.busNumber}</td>
                            <td>${booking.driver}</td>
                            <td>${booking.conductor}</td>
                            <td>${booking.seatNo}</td>
                            <td>${booking.pickup}</td>
                            <td>${booking.dropoff}</td>
                            <td>${booking.time}</td>
                            <td>${booking.paymentStatus || "Unpaid"}</td> <!-- Show Payment Status -->
                            <td><span id="status-${index}">${booking.status}</span></td>
                            <td>
                                ${booking.status === 'Pending' ? 
                                    `<button onclick="verifyBooking(${index})">Verify</button>
                                    <button onclick="rejectBooking(${index})">Reject</button>` : 
                                    booking.status === 'Cancelled' ? '<p>Cancelled by User</p>' : 
                                    `<p>This booking has been ${booking.status}.</p>`}
                            </td>
                        </tr>`;
                    });
                }
            }

        function deleteSchedule(index) {
            let schedules = JSON.parse(localStorage.getItem('schedules')) || [];
            schedules.splice(index, 1); // Remove schedule at specified index
            localStorage.setItem('schedules', JSON.stringify(schedules)); // Save updated schedule list to local storage
            displaySchedules(); // Refresh the schedule table
            alert('Schedule deleted successfully.');
        }
        function loadScheduleSection() {
            displaySchedules(); // Display the schedules from local storage
        }

                function loadSeatAvailability() {
            const seats = document.querySelectorAll('#seatMap .seat');
            const seatAvailability = JSON.parse(localStorage.getItem('seatAvailability')) || {};

            seats.forEach(seat => {
                const seatNumber = seat.getAttribute('data-seat');
                if (seatAvailability[seatNumber] === 'unavailable') {
                    seat.classList.add('unavailable'); // Mark seat as unavailable
                } else {
                    seat.classList.remove('unavailable'); // Mark seat as available
                }

                // Toggle availability on click
                seat.onclick = () => {
                    seat.classList.toggle('unavailable');
                    seatAvailability[seatNumber] = seat.classList.contains('unavailable') ? 'unavailable' : 'available';
                    localStorage.setItem('seatAvailability', JSON.stringify(seatAvailability)); // Save on each toggle
                };
            });
        }

        function loadBusOptions() {
            const buses = JSON.parse(localStorage.getItem('schedules')) || [];
            const busSelection = document.getElementById('busSelection');
                
            busSelection.innerHTML = '<option value="" disabled selected>Select a bus</option>';
            buses.forEach(bus => {
                const option = document.createElement('option');
                option.value = bus.busNumber;
                option.textContent = `Bus ${bus.busNumber} - ${bus.scheduleTime}`;
                busSelection.appendChild(option);
            });
        }

        // Call this function when the page loads
        document.addEventListener('DOMContentLoaded', loadBusOptions);

        function loadSeatMapForAdmin() {
            const busNumber = document.getElementById('busSelection').value;
            const seatMaps = JSON.parse(localStorage.getItem('seatMaps')) || {};
            const seatMap = seatMaps[busNumber] || {};
                
            document.querySelectorAll('#seatMap .seat').forEach(seat => {
                const seatNumber = seat.getAttribute('data-seat');
                if (seatMap[seatNumber] === 'unavailable') {
                    seat.classList.add('unavailable');
                    seat.style.pointerEvents = 'none';
                } else {
                    seat.classList.remove('unavailable');
                    seat.style.pointerEvents = 'auto';
                }
            
                // Add click event to toggle seat availability for the admin
                seat.onclick = () => {
                    seat.classList.toggle('unavailable');
                    seatMap[seatNumber] = seat.classList.contains('unavailable') ? 'unavailable' : 'available';
                };
            });
        }

        function saveSeatMap() {
            const busNumber = document.getElementById('busSelection').value;
            const seatMap = {};
                
            document.querySelectorAll('#seatMap .seat').forEach(seat => {
                const seatNumber = seat.getAttribute('data-seat');
                seatMap[seatNumber] = seat.classList.contains('unavailable') ? 'unavailable' : 'available';
            });
        
            let seatMaps = JSON.parse(localStorage.getItem('seatMaps')) || {};
            seatMaps[busNumber] = seatMap;
            localStorage.setItem('seatMaps', JSON.stringify(seatMaps));
        
            alert(`Seat map for Bus ${busNumber} saved successfully.`);
        }
    


        function saveSeatAvailability() {
            // Save the current state of each seat's availability
            const seats = document.querySelectorAll('#seatMap .seat');
            const seatAvailability = {};

            seats.forEach(seat => {
                const seatNumber = seat.getAttribute('data-seat');
                seatAvailability[seatNumber] = seat.classList.contains('unavailable') ? 'unavailable' : 'available';
            });

            localStorage.setItem('seatAvailability', JSON.stringify(seatAvailability));
            alert('Seat availability updated.'); // Confirm to the admin
        }


        function setSeatToAvailable() {
            const seatNumber = document.getElementById('seatNumberInput').value;
            const seat = document.querySelector(`#seatMap .seat[data-seat="${seatNumber}"]`);

            if (seat) {
                if (seat.classList.contains('unavailable')) {
                    seat.classList.remove('unavailable'); // Make seat available
                    updateSeatAvailability(seatNumber, 'available');
                    alert(`Seat ${seatNumber} is now available.`);
                } else {
                    alert(`Seat ${seatNumber} is already available.`);
                }
            } else {
                alert(`Seat ${seatNumber} does not exist.`);
            }
        }

        function updateSeatAvailability(seatNumber, status) {
            const seatAvailability = JSON.parse(localStorage.getItem('seatAvailability')) || {};
            seatAvailability[seatNumber] = status;
            localStorage.setItem('seatAvailability', JSON.stringify(seatAvailability));
        }


        // Initial load of seat availability when the page loads
        window.onload = loadSeatAvailability;



        function showVerifiedHistory() {
            const adminBookings = getStoredData('adminBookings');
            const verifiedBookings = adminBookings.filter(booking => booking.status === 'Verified');
            const historyList = document.getElementById('historyList');

            historyList.innerHTML = verifiedBookings.length 
                ? verifiedBookings.map((booking, index) => `
                    <tr>
                        <td>${booking.referenceNumber}</td>
                        <td>${booking.seatNo}</td>
                        <td>${booking.pickup}</td>
                        <td>${booking.dropoff}</td>
                        <td>${booking.time}</td>
                        <td>${booking.status}</td>
                    </tr>`).join('')
                : '<tr><td colspan="6">No verified reservations.</td></tr>';
        }

        function verifyBooking(index) {
            let adminBookings = JSON.parse(localStorage.getItem('adminBookings')) || [];
            adminBookings[index].status = 'Verified';
            localStorage.setItem('adminBookings', JSON.stringify(adminBookings));

            let userBookings = JSON.parse(localStorage.getItem('history')) || [];
            userBookings.forEach(booking => {
                if (booking.busNumber === adminBookings[index].busNumber && booking.seatNo === adminBookings[index].seatNo) {
                    booking.status = 'Verified';
                }
            });
            localStorage.setItem('history', JSON.stringify(userBookings));

            document.getElementById(`status-${index}`).innerText = 'Verified';
            alert(`Booking ${index + 1} has been verified!`);
        }

        function rejectBooking(index) {
            let adminBookings = JSON.parse(localStorage.getItem('adminBookings')) || [];
            adminBookings[index].status = 'Rejected';
            localStorage.setItem('adminBookings', JSON.stringify(adminBookings));

            let userBookings = JSON.parse(localStorage.getItem('history')) || [];
            userBookings.forEach(booking => {
                if (booking.busNumber === adminBookings[index].busNumber && booking.seatNo === adminBookings[index].seatNo) {
                    booking.status = 'Rejected';
                }
            });
            localStorage.setItem('history', JSON.stringify(userBookings));

            document.getElementById(`status-${index}`).innerText = 'Rejected';
            alert(`Booking ${index + 1} has been rejected.`);
        }

        function deleteSelectedBookings() {
            const adminBookings = JSON.parse(localStorage.getItem('adminBookings')) || [];
            const updatedBookings = adminBookings.filter((_, index) => !document.getElementById(`booking-${index}`).checked);
            localStorage.setItem('adminBookings', JSON.stringify(updatedBookings));
            loadReservations(); // Refresh the list
            alert('Selected bookings have been deleted.');
        }

        function deleteVerifiedHistory() {
            let adminBookings = JSON.parse(localStorage.getItem('adminBookings')) || [];
            adminBookings = adminBookings.filter(booking => booking.status !== 'Verified');
            localStorage.setItem('adminBookings', JSON.stringify(adminBookings));
            document.getElementById('historyList').innerHTML = ''; // Clear history display
            alert('Verified reservation history has been deleted.');
        }

        function logout() {
            alert('Logged out successfully!');
            window.location.href = 'admin-login.html'; // Redirect to admin login page
        }

        function getStoredData(key) {
            return JSON.parse(localStorage.getItem(key)) || [];
        }

        function setStoredData(key, data) {
            localStorage.setItem(key, JSON.stringify(data));
        }

        window.onload = loadReservations;