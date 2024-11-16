        window.onload = function() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                // Display the user's full name in the profile section
                document.getElementById('profileName').textContent = `${user.fname} ${user.lname}`;
        
                // Display additional user profile information
                document.getElementById('useRName').textContent = `${user.fname} ${user.lname}`;
                document.getElementById('userEmail').textContent = user.email;
                document.getElementById('userAddress').textContent = user.address;
                document.getElementById('userDob').textContent = user.dob;
                document.getElementById('userGender').textContent = user.gender;
                document.getElementById('userId').textContent = user.id;
                document.getElementById('userPhone').textContent = user.phone;

                
                // Call function to display reservation history if necessary
                displayHistory();
            } else {
                alert('You are not logged in. Please log in to continue.');
                window.location.href = 'login.html';
            }
        };
        
                document.querySelectorAll('.faq-item h3').forEach(item => {
            item.addEventListener('click', () => {
                const faqItem = item.parentElement;
                faqItem.classList.toggle('active');
            
                // Toggle visibility of the answer (paragraph inside the FAQ item)
                const answer = faqItem.querySelector('p');
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                } else {
                    answer.style.display = 'block';
                }
            });
        });
            // JavaScript to handle seat selection
            const seats = document.querySelectorAll('.seat.available');
                const seatInput = document.getElementById('seatNo');

                seats.forEach(seat => {
                    seat.addEventListener('click', function() {
                        // Deselect previously selected seat
                        seats.forEach(s => s.classList.remove('selected'));
                        // Select the clicked seat
                        this.classList.add('selected');
                        // Set the seat number to the hidden input field
                        seatInput.value = this.getAttribute('data-seat');
                    });
                });
            function editProfile() {
               
               let userName = document.getElementById('userName');
               let userEmail = document.getElementById('userEmail');
               let userAddress = document.getElementById('userAddress');
               let userDob = document.getElementById('userDob');
               let userGender = document.getElementById('userGender');
               let userPhone = document.getElementById('userPhone');
            
               // Replace profile data with input fields
               userName.innerHTML = `<input type="text" id="editName" value="${userName.textContent}">`;
               userEmail.innerHTML = `<input type="email" id="editEmail" value="${userEmail.textContent}">`;
               userAddress.innerHTML = `<input type="text" id="editAddress" value="${userAddress.textContent}">`;
               userDob.innerHTML = `<input type="date" id="editDob" value="${userDob.textContent}">`;
               userGender.innerHTML = `
                 <select id="editGender">
                   <option value="Male" ${userGender.textContent === "Male" ? "selected" : ""}>Male</option>
                   <option value="Female" ${userGender.textContent === "Female" ? "selected" : ""}>Female</option>
                   <option value="Other" ${userGender.textContent === "Other" ? "selected" : ""}>Other</option>
                 </select>
               `;
               userPhone.innerHTML = `<input type="tel" id="editPhone" value="${userPhone.textContent}" pattern="[0-9]{11}" title="Please enter a valid 10-digit phone number.">`;
             
               document.getElementById('saveBtn').style.display = 'inline-block';
             }
         
             // Function to save the profile information
             function saveProfile() {
               // Get the input field values
               let newName = document.getElementById('editName').value;
               let newEmail = document.getElementById('editEmail').value;
               let newAddress = document.getElementById('editAddress').value;
               let newDob = document.getElementById('editDob').value;
               let newGender = document.getElementById('editGender').value;
               let newphone = document.getElementById('editPhone').value;
            
               // Update the spans with new values
               document.getElementById('userName').textContent = newName;
               document.getElementById('userEmail').textContent = newEmail;
               document.getElementById('userAddress').textContent = newAddress;
               document.getElementById('userDob').textContent = newDob;
               document.getElementById('userGender').textContent = newGender;
               document.getElementById('userPhone').textContent = newPhone;

                // Save updated information to localStorage
                const updatedUser = {
                    fname: newName.split(" ")[0] || "",
                    lname: newName.split(" ")[1] || "",
                    email: newEmail,
                    address: newAddress,
                    dob: newDob,
                    gender: newGender,
                    phone: newPhone,
                };
                localStorage.setItem('user', JSON.stringify(updatedUser));

                console.log("Saving profile..."); // Check if this is displayed in the console
            
               // Hide the Save button after saving
               document.getElementById('saveBtn').style.display = 'none';
             }

        
            function loadSeatAvailability() {
                const seatAvailability = JSON.parse(localStorage.getItem('seatAvailability')) || {};
                const seats = document.querySelectorAll('.seat');

                seats.forEach(seat => {
                    const seatNumber = seat.getAttribute('data-seat');
                    if (seatAvailability[seatNumber] === 'unavailable') {
                        seat.classList.add('unavailable');
                        seat.style.pointerEvents = 'none';  // Make it unclickable
                        seat.title = "This seat is unavailable.";
                    }
                });
            }

        // Function to enable seat selection
            function enableSeatSelection() {
                const seats = document.querySelectorAll('.seat:not(.unavailable)'); // Select available seats
                const seatInput = document.getElementById('seatNo'); // Hidden input for seat number

                seats.forEach(seat => {
                    seat.addEventListener('click', function() {
                        // Deselect previously selected seat
                        seats.forEach(s => s.classList.remove('selected'));
                        // Select the clicked seat
                        this.classList.add('selected');
                        // Set the seat number to the hidden input field
                        seatInput.value = this.getAttribute('data-seat');
                        console.log("Selected Seat Number:", seatInput.value); // Debug log to confirm selection
                    });
                });
            }


        // Modify showSection to load seat availability when booking section is shown
            function showSection(section) {
                document.getElementById('homeSection').style.display = 'none';
                document.getElementById('profileSection').style.display = 'none';
                document.getElementById('bookingSection').style.display = 'none';
                document.getElementById('historySection').style.display = 'none';

                if (section === 'home') {
                    document.getElementById('homeSection').style.display = 'block';
                } else if (section === 'profile') {
                    document.getElementById('profileSection').style.display = 'block';
                } else if (section === 'booking') {
                    document.getElementById('bookingSection').style.display = 'block';
                    loadSeatAvailability();
                    enableSeatSelection();
                    loadBuses();
                } else if (section === 'history') {
                    document.getElementById('historySection').style.display = 'block';
                    displayHistory();
                }
            }


                // Ensure seat availability loads on page load if the booking section is the default
                document.addEventListener('DOMContentLoaded', () => {
                    const defaultSection = 'home';  // Set default section
                    showSection(defaultSection);
                });

                const fareRates = {
                    // Sta. Cruz(Terminal) routes
                    "Sta. Cruz(Terminal)-Candelaria": 100,
                    "Sta. Cruz(Terminal)-Masinloc": 120,
                    "Sta. Cruz(Terminal)-Palauig": 140,
                    "Sta. Cruz(Terminal)-Iba(Terminal)": 160,
                    "Sta. Cruz(Terminal)-Botolan(Public Market/Municipal)": 180,
                    "Sta. Cruz(Terminal)-Cabangan": 200,
                    "Sta. Cruz(Terminal)-San Felipe(Public Market/Bus Stop)": 220,
                    "Sta. Cruz(Terminal)-San Narciso": 240,
                    "Sta. Cruz(Terminal)-San Antonio": 260,
                    "Sta. Cruz(Terminal)-San Marcelino(Public Market)": 280,
                    "Sta. Cruz(Terminal)-Castillejos(Public Market/Municipal)": 300,
                    "Sta. Cruz(Terminal)-Subic": 320,
                    "Sta. Cruz(Terminal)-Olongapo City(Terminal)": 340,


                    // Candelaria routes
                    "Candelaria-Sta. Cruz(Terminal)": 120,
                    "Candelaria-Masinloc": 50,
                    "Candelaria-Palauig": 50,
                    "Candelaria-Iba(Terminal)": 70,
                    "Candelaria-Botolan(Public Market/Municipal)": 90,
                    "Candelaria-Cabangan": 110,
                    "Candelaria-San Felipe(Public Market/Bus Stop)": 130,
                    "Candelaria-San Narciso": 150,
                    "Candelaria-San Antonio": 170,
                    "Candelaria-San Marcelino(Public Market)": 190,
                    "Candelaria-Castillejos(Public Market/Municipal)": 210,
                    "Candelaria-Subic": 230,
                    "Candelaria-Olongapo City(Terminal)": 250,

                     // Masinloc routes
                     "Masinloc-Sta. Cruz(Terminal)": 100,
                     "Masinloc-Candelaria": 50,
                     "Masinloc-Palauig": 70,
                     "Masinloc-Iba(Terminal)": 90,
                     "Masinloc-Botolan(Public Market/Municipal)": 110,
                     "Masinloc-Cabangan": 130,
                     "Masinloc-San Felipe(Public Market/Bus Stop)": 150,
                     "Masinloc-San Narciso": 170,
                     "Masinloc-San Antonio": 190,
                     "Masinloc-San Marcelino(Public Market)": 210,
                     "Masinloc-Castillejos(Public Market/Municipal)": 230,
                     "Masinloc-Subic": 250,
                     "Masinloc-Olongapo City(Terminal)": 270,

                    // Palauig routes
                    "Palauig-Sta. Cruz(Terminal)": 140,
                    "Palauig-Candelaria": 70,
                    "Palauig-Masinloc": 50,
                    "Palauig-Iba(Terminal)": 50,
                    "Palauig-Botolan(Public Market/Municipal)": 70,
                    "Palauig-Cabangan": 90,
                    "Palauig-San Felipe(Public Market/Bus Stop)": 110,
                    "Palauig-San Narciso": 130,
                    "Palauig-San Antonio": 150,
                    "Palauig-San Marcelino(Public Market)": 170,
                    "Palauig-Castillejos(Public Market/Municipal)": 190,
                    "Palauig-Subic": 210,
                    "Palauig-Olongapo City(Terminal)": 230,

                    // Iba(Terminal) routes
                    "Iba(Terminal)-Sta. Cruz(Terminal)": 160,
                    "Iba(Terminal)-Candelaria": 90,
                    "Iba(Terminal)-Masinloc": 70,
                    "Iba(Terminal)-Palauig": 50,
                    "Iba(Terminal)-Botolan(Public Market/Municipal)": 50,
                    "Iba(Terminal)-Cabangan": 70,
                    "Iba(Terminal)-San Felipe(Public Market/Bus Stop)": 90,
                    "Iba(Terminal)-San Narciso": 110,
                    "Iba(Terminal)-San Antonio": 130,
                    "Iba(Terminal)-San Marcelino(Public Market)": 150,
                    "Iba(Terminal)-Castillejos(Public Market/Municipal)": 170,
                    "Iba(Terminal)-Subic": 190,
                    "Iba(Terminal)-Olongapo City(Terminal)": 210,

                    // Botolan(Public Market/Municipal) routes
                    "Botolan(Public Market/Municipal)-Sta. Cruz(Terminal)": 180,
                    "Botolan(Public Market/Municipal)-Candelaria": 110,
                    "Botolan(Public Market/Municipal)-Masinloc": 90,
                    "Botolan(Public Market/Municipal)-Palauig": 70,
                    "Botolan(Public Market/Municipal)-Iba(Terminal)": 50,
                    "Botolan(Public Market/Municipal)-Cabangan": 50,
                    "Botolan(Public Market/Municipal)-San Felipe(Public Market/Bus Stop)": 70,
                    "Botolan(Public Market/Municipal)-San Narciso": 90,
                    "Botolan(Public Market/Municipal)-San Antonio": 110,
                    "Botolan(Public Market/Municipal)-San Marcelino(Public Market)": 130,
                    "Botolan(Public Market/Municipal)-Castillejos(Public Market/Municipal)": 150,
                    "Botolan(Public Market/Municipal)-Subic": 170,
                    "Botolan(Public Market/Municipal)-Olongapo City(Terminal)": 190,

                    // Cabangan routes
                    "Cabangan-Sta. Cruz(Terminal)": 200,
                    "Cabangan-Candelaria": 130,
                    "Cabangan-Masinloc": 110,
                    "Cabangan-Palauig": 90,
                    "Cabangan-Iba(Terminal)": 70,
                    "Cabangan-Botolan(Public Market/Municipal)": 50,
                    "Cabangan-San Felipe(Public Market/Bus Stop)": 50,
                    "Cabangan-San Narciso": 70,
                    "Cabangan-San Antonio": 90,
                    "Cabangan-San Marcelino(Public Market)": 110,
                    "Cabangan-Castillejos(Public Market/Municipal)": 130,
                    "Cabangan-Subic": 150,
                    "Cabangan-Olongapo City(Terminal)": 170,

                    // San Felipe(Public Market/Bus Stop) routes
                    "San Felipe(Public Market/Bus Stop)-Sta. Cruz(Terminal)": 220,
                    "San Felipe(Public Market/Bus Stop)-Candelaria": 150,
                    "San Felipe(Public Market/Bus Stop)-Masinloc": 130,
                    "San Felipe(Public Market/Bus Stop)-Palauig": 110,
                    "San Felipe(Public Market/Bus Stop)-Iba(Terminal)": 90,
                    "San Felipe(Public Market/Bus Stop)-Botolan(Public Market/Municipal)": 70,
                    "San Felipe(Public Market/Bus Stop)-Cabangan": 50,
                    "San Felipe(Public Market/Bus Stop)-San Narciso": 50,
                    "San Felipe(Public Market/Bus Stop)-San Antonio": 70,
                    "San Felipe(Public Market/Bus Stop)-San Marcelino(Public Market)": 90,
                    "San Felipe(Public Market/Bus Stop)-Castillejos(Public Market/Municipal)": 110,
                    "San Felipe(Public Market/Bus Stop)-Subic": 130,
                    "San Felipe(Public Market/Bus Stop)-Olongapo City(Terminal)": 150,

                    // San Narciso routes
                    "San Narciso-Sta. Cruz(Terminal)": 240,
                    "San Narciso-Candelaria": 170,
                    "San Narciso-Masinloc": 150,
                    "San Narciso-Palauig": 130,
                    "San Narciso-Iba(Terminal)": 110,
                    "San Narciso-Botolan(Public Market/Municipal)": 90,
                    "San Narciso-Cabangan": 70,
                    "San Narciso-San Felipe(Public Market/Bus Stop)": 50,
                    "San Narciso-San Antonio": 50,
                    "San Narciso-San Marcelino(Public Market)": 70,
                    "San Narciso-Castillejos(Public Market/Municipal)": 90,
                    "San Narciso-Subic": 110,
                    "San Narciso-Olongapo City(Terminal)": 130,

                    // San Antonio routes
                    "San Antonio-Sta. Cruz(Terminal)": 260,
                    "San Antonio-Candelaria": 190,
                    "San Antonio-Masinloc": 170,
                    "San Antonio-Palauig": 150,
                    "San Antonio-Iba(Terminal)": 130,
                    "San Antonio-Botolan(Public Market/Municipal)": 110,
                    "San Antonio-Cabangan": 90,
                    "San Antonio-San Felipe(Public Market/Bus Stop)": 70,
                    "San Antonio-San Narciso": 50,
                    "San Antonio-San Marcelino(Public Market)": 50,
                    "San Antonio-Castillejos(Public Market/Municipal)": 70,
                    "San Antonio-Subic": 90,
                    "San Antonio-Olongapo City(Terminal)": 110,

                    // San Marcelino(Public Market) routes
                    "San Marcelino(Public Market)-Sta. Cruz(Terminal)": 280,
                    "San Marcelino(Public Market)-Candelaria": 210,
                    "San Marcelino(Public Market)-Masinloc": 190,
                    "San Marcelino(Public Market)-Palauig": 170,
                    "San Marcelino(Public Market)-Iba(Terminal)": 150,
                    "San Marcelino(Public Market)-Botolan(Public Market/Municipal)": 130,
                    "San Marcelino(Public Market)-Cabangan": 110,
                    "San Marcelino(Public Market)-San Felipe(Public Market/Bus Stop)": 90,
                    "San Marcelino(Public Market)-San Narciso": 70,
                    "San Marcelino(Public Market)-San Antonio": 50,
                    "San Marcelino(Public Market)-Castillejos(Public Market/Municipal)": 50,
                    "San Marcelino(Public Market)-Subic": 70,
                    "San Marcelino(Public Market)-Olongapo City(Terminal)": 90,

                    // Castillejos(Public Market/Municipal) routes
                    "Castillejos(Public Market/Municipal)-Sta. Cruz(Terminal)": 300,
                    "Castillejos(Public Market/Municipal)-Candelaria": 230,
                    "Castillejos(Public Market/Municipal)-Masinloc": 210,
                    "Castillejos(Public Market/Municipal)-Palauig": 190,
                    "Castillejos(Public Market/Municipal)-Iba(Terminal)": 170,
                    "Castillejos(Public Market/Municipal)-Botolan(Public Market/Municipal)": 150,
                    "Castillejos(Public Market/Municipal)-Cabangan": 130,
                    "Castillejos(Public Market/Municipal)-San Felipe(Public Market/Bus Stop)": 110,
                    "Castillejos(Public Market/Municipal)-San Narciso": 90,
                    "Castillejos(Public Market/Municipal)-San Antonio": 70,
                    "Castillejos(Public Market/Municipal)-San Marcelino(Public Market)": 50,
                    "Castillejos(Public Market/Municipal)-Subic": 50,
                    "Castillejos(Public Market/Municipal)-Olongapo City(Terminal)": 70,

                    // Subic routes
                    "Subic-Sta. Cruz(Terminal)": 320,
                    "Subic-Candelaria": 250,
                    "Subic-Masinloc": 230,
                    "Subic-Palauig": 210,
                    "Subic-Iba(Terminal)": 190,
                    "Subic-Botolan(Public Market/Municipal)": 170,
                    "Subic-Cabangan": 150,
                    "Subic-San Felipe(Public Market/Bus Stop)": 130,
                    "Subic-San Narciso": 110,
                    "Subic-San Antonio": 90,
                    "Subic-San Marcelino(Public Market)": 70,
                    "Subic-Castillejos(Public Market/Municipal)": 50,
                    "Subic-Olongapo City(Terminal)": 50,

                    // Olongapo City(Terminal) routes
                    "Olongapo City(Terminal)-Sta. Cruz(Terminal)": 340,
                    "Olongapo City(Terminal)-Candelaria": 270,
                    "Olongapo City(Terminal)-Masinloc": 250,
                    "Olongapo City(Terminal)-Palauig": 230,
                    "Olongapo City(Terminal)-Iba(Terminal)": 210,
                    "Olongapo City(Terminal)-Botolan(Public Market/Municipal)": 190,
                    "Olongapo City(Terminal)-Cabangan": 170,
                    "Olongapo City(Terminal)-San Felipe(Public Market/Bus Stop)": 150,
                    "Olongapo City(Terminal)-San Narciso": 130,
                    "Olongapo City(Terminal)-San Antonio": 110,
                    "Olongapo City(Terminal)-San Marcelino(Public Market)": 90,
                    "Olongapo City(Terminal)-Castillejos(Public Market/Municipal)": 70,
                    "Olongapo City(Terminal)-Subic": 50
                };

                    function calculateFare() {
                        const pickup = document.getElementById('pickup').value;
                        const dropoff = document.getElementById('dropoff').value;

                        // Define the key for fareRates based on selection
                        const routeKey = `${pickup}-${dropoff}`;
                        const fare = fareRates[routeKey] || "N/A";  // Fallback if route is not defined

                        document.getElementById('fareAmount').textContent = fare !== "N/A" ? `₱${fare}` : "None";
                        }

                        document.getElementById('pickup').addEventListener('change', calculateFare);
                        document.getElementById('dropoff').addEventListener('change', calculateFare);



        
            window.onload = function() {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user) {
                    if (user.deleted) {
                        alert('Your account has been deleted. Please contact support for assistance.');
                        window.location.href = 'login.html';
                        return;
                    }
                    document.getElementById('userName').textContent = `${user.fname} ${user.lname}`;
                    document.getElementById('userEmail').textContent = user.email;
                    document.getElementById('userAddress').textContent = user.address;
                    document.getElementById('userDob').textContent = user.dob;
                    document.getElementById('userGender').textContent = user.gender;
                    document.getElementById('userId').textContent = user.id;
                    document.getElementById('userPhone').textContent = user.phone;
                    displayHistory();
                    showSection('home');  // Show home section on page load
                } else {
                    alert('You are not logged in. Please log in to continue.');
                    window.location.href = 'login.html';
                }
            };


            // Initialize variables to store the selected options
            let selectedBus = '';
            let paymentDetails = '';

            // Update the summary box based on the user input
            function updateSummary() {
                const selectedSeat = document.querySelector('#seatMap .seat.selected');
                const seatNumber = selectedSeat ? selectedSeat.dataset.seat : 'None';
                const busNumber = document.getElementById('busNumber').value;
                const seatNo = document.getElementById('seatNo').value;
                const pickupLocation = document.getElementById('pickup').value;
                const dropoffLocation = document.getElementById('dropoff').value;
                const time = document.getElementById('time').value;

                 // Log the values to the console to verify they are correct
                 console.log("Seat:", seatNo, "Pickup:", pickupLocation, "Dropoff:", dropoffLocation, "Time:", time);

                document.getElementById('selectedSeat').textContent = seatNumber;
                document.getElementById('selectedBus').textContent = busNumber;
                document.getElementById('pickupLocation').textContent = pickupLocation || 'None';
                document.getElementById('dropoffLocation').textContent = dropoffLocation || 'None';
                document.getElementById('selectedTime').textContent = time || 'None';
            }

            // Set up event listeners to update summary on changes
                document.getElementById('pickup').addEventListener('change', updateSummary);
                document.getElementById('dropoff').addEventListener('change', updateSummary);
                document.getElementById('time').addEventListener('change', updateSummary);

                // Event listener for seat selection
                document.querySelectorAll('.seat').forEach(seat => {
                    seat.addEventListener('click', () => {
                        document.getElementById('seatNo').value = seat.dataset.seat;  // Update seatNo with the selected seat number
                        updateSummary();  // Call updateSummary to reflect the change in booking summary
                    });
                });

            // Function to handle bus selection (replace this with actual bus selection logic)
            function selectBus(bus) {
              selectedBus = bus;
              updateSummary();
            }
        
             // Fetch available buses on page load and populate dropdown
            function loadBuses() {
                const buses = JSON.parse(localStorage.getItem('schedules')) || [];
                const busDropdown = document.getElementById('busNumber');

                busDropdown.innerHTML = '<option value="" disabled selected>--Select Bus--</option>';

                buses.forEach(bus => {
                    const option = document.createElement('option');
                    option.value = bus.busNumber;
                    option.textContent =`Bus:${bus.busNumber}-||-Departure Time:${bus.scheduleTime}-||-Driver:${bus.driver}-||-Conductor:${bus.conductor}-||-Route:${bus.route}`;
                    busDropdown.appendChild(option);
                });
            }

            document.getElementById('busNumber').addEventListener('change', updateSummary);
        
            document.addEventListener('DOMContentLoaded', loadBuses);

             document.getElementById('busNumber').addEventListener('change', function() {
                const selectedBus = this.value;
                loadSeatMap(selectedBus);
                updateSummary();
            });

            function loadSeatMap(busNumber) {
                const seatMapContainer = document.getElementById('seatMap');
                seatMapContainer.innerHTML = ''; // Clear any existing seat map content

                // Retrieve the seat map for the specific bus number
                const seatMaps = JSON.parse(localStorage.getItem('seatMaps')) || {};
                const seatMap = seatMaps[busNumber] || {};

                let seatIndex = 1;

                // Generate main seating area: 10 rows of 4 seats (2x2 layout)
                for (let row = 0; row < 10; row++) {
                    const rowDiv = document.createElement('div');
                    rowDiv.classList.add('row');

                    for (let col = 0; col < 4; col++) {
                        if (col === 2) { // Add aisle space between seat pairs
                            const aisle = document.createElement('div');
                            aisle.classList.add('aisle');
                            rowDiv.appendChild(aisle);
                        }

                        // Create seat element
                        const seat = document.createElement('div');
                        seat.classList.add('seat');
                        seat.textContent = seatIndex;
                        seat.dataset.seat = seatIndex;

                        // Check seat availability for this bus and seat number
                        if (seatMap[seatIndex] === 'unavailable') {
                            seat.classList.add('unavailable');
                            seat.style.pointerEvents = 'none'; // Make unavailable seats unclickable
                        } else {
                            seat.classList.add('available');
                            // Add click event to select seat
                            seat.addEventListener('click', function () {
                                // Deselect any previously selected seat
                                document.querySelectorAll('.seat.selected').forEach(s => s.classList.remove('selected'));
                                // Select the clicked seat
                                this.classList.add('selected');

                                // Update hidden input and summary display
                                document.getElementById('seatNo').value = this.dataset.seat;
                                document.getElementById('selectedSeat').textContent = this.dataset.seat;
                            });
                        }

                        rowDiv.appendChild(seat);
                        seatIndex++;
                    }
                    seatMapContainer.appendChild(rowDiv);
                }

                // Add final row for seats 45 to 50 together at the back
                const backRowDiv = document.createElement('div');
                backRowDiv.classList.add('row'); // Apply row class for back row seats

                for (let i = 0; i < 6; i++) {
                    const seat = document.createElement('div');
                    seat.classList.add('seat');
                    seat.textContent = seatIndex;
                    seat.dataset.seat = seatIndex;

                    // Check seat availability for back row seats
                    if (seatMap[seatIndex] === 'unavailable') {
                        seat.classList.add('unavailable');
                        seat.style.pointerEvents = 'none';
                    } else {
                        seat.classList.add('available');
                        // Add click event to select seat
                        seat.addEventListener('click', function () {
                            // Deselect previously selected seat
                            document.querySelectorAll('.seat.selected').forEach(s => s.classList.remove('selected'));
                            this.classList.add('selected');
                            
                            // Update hidden input and summary display
                            document.getElementById('seatNo').value = this.dataset.seat;
                            document.getElementById('selectedSeat').textContent = this.dataset.seat;
                        });
                    }

                    backRowDiv.appendChild(seat); // Add seat to the back row
                    seatIndex++; // Increment seat number
                }

                seatMapContainer.appendChild(backRowDiv); // Add the back row to the seat map container
            }


            function selectBus(busNumber, scheduleTime, driver, conductor, route) {
                const user = JSON.parse(localStorage.getItem('user'));
                const booking = {
                    referenceNumber: 'REF' + Date.now(),
                    seatNo: document.getElementById('seatNo').value,
                    pickup: document.getElementById('pickup').value,
                    dropoff: document.getElementById('dropoff').value,
                    time: document.getElementById('time').value,
                    busNumber,
                    schedule: scheduleTime,
                    driver,
                    conductor,
                    route,
                    status: 'Pending',
                    userId: user.id
                };

                // Save to user history
                let history = getStoredData('history');
                history.push(booking);
                setStoredData('history', history);

                // Save to admin bookings
                let adminBookings = getStoredData('adminBookings');
                adminBookings.push(booking);
                setStoredData('adminBookings', adminBookings);

                alert(`Booking for Bus ${busNumber} saved.`);
            }

            function bookNow() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                alert("User not logged in. Please log in to book.");
                return;
            }
            const seatNo = document.getElementById('seatNo').value; // Selected seat number
            const busNumber = document.getElementById('busNumber').value;
            const pickup = document.getElementById('pickup').value;
            const dropoff = document.getElementById('dropoff').value;
            const time = document.getElementById('time').value;

             // Check that all booking details are filled out
            if (!seatNo || !busNumber || !pickup || !dropoff || !time) {
                alert("Please fill out all booking details.");
                return;
            }

            const routeKey = `${pickup}-${dropoff}`;
            const fare = fareRates[routeKey];

            if (fare === undefined) {
                alert("Invalid route. Please check your pickup and dropoff locations.");
                return;
            }


            // Retrieve schedules from local storage
            const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
            const busSchedule = schedules.find(schedule => schedule.busNumber === busNumber);
            
            // Set driver and conductor details from the schedule
            const driver = busSchedule ? busSchedule.driver : "Unknown";
            const conductor = busSchedule ? busSchedule.conductor : "Unknown";
            
            // Create the booking object, including seat number
            const booking = {
                referenceNumber: 'REF' + Date.now(),
                seatNo: seatNo,  // Add seat number
                pickup: pickup,
                dropoff: dropoff,
                time: time,
                busNumber: busNumber,
                driver: driver,
                conductor: conductor,
                fareAmount: fare,             // Save fare amount in booking
                status: 'Pending',
                paymentStatus: 'Not Paid',  // New field for payment status
                paymentMethod: '',          // Empty payment method initially
                userId: user.id
            };
        
            // Save booking to history and admin bookings
            let history = JSON.parse(localStorage.getItem('history')) || [];
            history.push(booking);
            localStorage.setItem('history', JSON.stringify(history));
        
            let adminBookings = JSON.parse(localStorage.getItem('adminBookings')) || [];
            adminBookings.push(booking);
            localStorage.setItem('adminBookings', JSON.stringify(adminBookings));
        
            console.log("Booking saved:", booking);  // Debug: Confirm booking is saved
            alert('Booking successful! Your reservation is now in the history.');
            showPaymentPrompt();
            displayHistory(); // Refresh history to show new booking
        }


        function displayHistory() {
            const user = JSON.parse(localStorage.getItem('user'));
            let history = JSON.parse(localStorage.getItem('history')) || [];
        
            // Filter history for the current user
            let userHistory = history.filter(booking => booking.userId === user.id);
            let historyDiv = document.getElementById('history');
            historyDiv.innerHTML = '';
        
            // Check for reservation history
            if (userHistory.length === 0) {
                historyDiv.innerHTML = "<p>No reservation history found.</p>";
                return;
            }
        
            // Create table structure
            let table = `<table><thead><tr>
                            <th>Reference Number</th><th>Seat No.</th><th>Pick-up</th>
                            <th>Drop-off</th><th>Time</th><th>Bus No.</th><th>Driver</th>
                            <th>Conductor</th><th>Payment Method</th><th>Payment Status</th><th>Booking Status</th><th>Actions</th>
                         </tr></thead><tbody>`;
                        
            // Populate table rows with booking data
            userHistory.forEach(booking => {
                table += `<tr>
                            <td>${booking.referenceNumber}</td>
                            <td>${booking.seatNo || "N/A"}</td>  <!-- Display Seat Number -->
                            <td>${booking.pickup}</td>
                            <td>${booking.dropoff}</td>
                            <td>${booking.time}</td>
                            <td>${booking.busNumber}</td>
                            <td>${booking.driver || "N/A"}</td>
                            <td>${booking.conductor || "N/A"}</td>
                            <td>${booking.paymentMethod || "Not Specified"}</td>
                            <td>${booking.paymentStatus}</td>
                            <td>${booking.status}</td>
                            <td>
                                ${booking.paymentStatus === 'Paid' && booking.status === 'Verified' ? 
                                    `<button onclick="viewReceipt('${booking.referenceNumber}')">View E-Receipt</button>` : ''}
                                ${(booking.status === 'Pending' || booking.status === 'Verified') ? 
                                    `<button onclick="cancelBooking('${booking.referenceNumber}')">Cancel</button>` : ''}
                            </td>
                          </tr>`;
            });
        
            table += `</tbody></table>`;
            historyDiv.innerHTML = table;
        }

        // Function to open the payment prompt modal
        function showPaymentPrompt() {
            document.getElementById('paymentPromptModal').style.display = 'flex';
        }

        // Function to close the payment prompt modal
        function closePaymentPrompt() {
            document.getElementById('paymentPromptModal').style.display = 'none';
        }

        // Function to proceed to the payment process
        function proceedToPayment() {
            closePaymentPrompt();
            const fareAmount = document.getElementById('fareAmount').dataset.amount || 0;
            document.getElementById('seatCount').value = fareAmount;
            openPaymentModal();
        }



             // Function to open payment modal
            function openPaymentModal() {
                document.getElementById('paymentModal').style.display = 'flex';
            }

            // Function to close payment modal
            function closePaymentModal() {
                document.getElementById('paymentModal').style.display = 'none';
            }

            // Function to process payment
            function processPayment() {
                // Retrieve values from the payment form
                const paymentMethod = document.getElementById('paymentMethod').value;
                const phoneNumber = document.getElementById('phoneNumber').value;
                const seatCount = document.getElementById('seatCount').value;

                // Check that all fields are filled in
                if (!paymentMethod || !phoneNumber || !seatCount) {
                    alert("Please fill in all fields.");
                    return;
                }

                // Retrieve the reservation history from localStorage
                let history = JSON.parse(localStorage.getItem('history')) || [];
                console.log("Loaded history:", history);  // Debug: Check if history is loaded

                if (history.length === 0) {
                    alert("No booking found to update with payment.");
                    return;
                }

                // Retrieve the latest booking (assuming the latest booking is the one to pay for)
                const latestBooking = history[history.length - 1];
                if (!latestBooking) {
                    console.error("No latest booking found.");
                    alert("No booking found for processing payment.");
                    return;
                }

                // Log the retrieved booking to the console for debugging
                console.log("Processing payment for booking:", latestBooking);

                // Update the latest booking with payment details
                latestBooking.paymentMethod = paymentMethod;
                latestBooking.phoneNumber = phoneNumber;
                latestBooking.seatCount = seatCount;
                latestBooking.paymentStatus = 'Paid';  // Set payment status to "Paid"

                // Save the updated history back to localStorage
                localStorage.setItem('history', JSON.stringify(history));

                // Also update the corresponding booking in adminBookings to reflect payment status
                let adminBookings = JSON.parse(localStorage.getItem('adminBookings')) || [];
                const adminBookingIndex = adminBookings.findIndex(
                    booking => booking.referenceNumber === latestBooking.referenceNumber
                );

                if (adminBookingIndex !== -1) {
                    // Update the admin booking with payment details
                    adminBookings[adminBookingIndex].paymentStatus = 'Paid';
                    adminBookings[adminBookingIndex].paymentMethod = paymentMethod;
                    adminBookings[adminBookingIndex].phoneNumber = phoneNumber;
                    adminBookings[adminBookingIndex].seatCount = seatCount;
                    
                    // Save the updated admin bookings back to localStorage
                    localStorage.setItem('adminBookings', JSON.stringify(adminBookings));
                    console.log("Admin booking updated with payment status.");
                } else {
                    console.warn("Matching admin booking not found.");
                }

                // Log a success message to confirm the update
                console.log("Payment successful for booking:", latestBooking);

                // Show success feedback to the user
                alert('Payment successful! Your reservation has been updated.');
                closePaymentModal();  // Close the payment modal

                // Refresh the reservation history to display updated information
                displayHistory();
            }




            function cancelBooking(referenceNumber) {
                let history = JSON.parse(localStorage.getItem('history')) || [];
                let adminBookings = JSON.parse(localStorage.getItem('adminBookings')) || [];

                // Find the booking to check its status
                const booking = history.find(booking => booking.referenceNumber === referenceNumber);

                // Prevent cancellation if booking status is "Verified"
                if (booking.status === 'Verified') {
                    alert('This booking has been verified and cannot be canceled.');
                    return;
                }

                // Proceed with cancellation for other statuses
                history = history.map(booking => 
                    booking.referenceNumber === referenceNumber ? {...booking, status: 'Cancelled'} : booking
                );
                adminBookings = adminBookings.map(booking => 
                    booking.referenceNumber === referenceNumber ? {...booking, status: 'Cancelled'} : booking
                );

                // Save the updated records to localStorage
                localStorage.setItem('history', JSON.stringify(history));
                localStorage.setItem('adminBookings', JSON.stringify(adminBookings));

                // Refresh the reservation history and notify the user
                displayHistory();
                alert('Your booking has been canceled.');
            }

            function calculateFare() {
                const pickup = document.getElementById('pickup').value;
                const dropoff = document.getElementById('dropoff').value;

                const routeKey = `${pickup}-${dropoff}`;
                const fare = fareRates[routeKey] || "N/A";

                if (fare !== "N/A") {
                    document.getElementById('fareAmount').textContent = `₱${fare}`;
                    document.getElementById('fareAmount').dataset.amount = fare;  // Store fare amount for reference
                } else {
                    document.getElementById('fareAmount').textContent = "Route not available";
                }
            }

            document.getElementById('pickup').addEventListener('change', calculateFare);
            document.getElementById('dropoff').addEventListener('change', calculateFare);

        
            function viewReceipt(referenceNumber) {
                let history = JSON.parse(localStorage.getItem('history')) || [];
                let booking = history.find(booking => booking.referenceNumber === referenceNumber);

                if (booking && booking.status === 'Verified') {
                    const receiptWindow = window.open("", "E-Receipt", "width=400,height=600");

                    receiptWindow.document.write(`
                        <link rel="stylesheet" href="dashboard.css">
                        <div class="receipt">
                            <img src="receipt.png" alt="Victory Liner Logo" class="receiptlogo">
                            <h1>E-Receipt</h1>
                            <div class="item"><span class="highlight">Reference Number:</span> ${booking.referenceNumber}</div>
                            <div class="item"><span class="highlight">Seat No.:</span> ${booking.seatNo}</div>
                            <div class="item"><span class="highlight">Pick-up:</span> ${booking.pickup}</div>
                            <div class="item"><span class="highlight">Drop-off:</span> ${booking.dropoff}</div>
                            <div class="item"><span class="highlight">Time:</span> ${booking.time}</div>
                            <div class="item"><span class="highlight">Bus No.:</span> ${booking.busNumber}</div>
                            <div class="item"><span class="highlight">Driver:</span> ${booking.driver}</div>
                            <div class="item"><span class="highlight">Conductor:</span> ${booking.conductor}</div>
                            <div class="item"><span class="highlight">Payment Method:</span> ${booking.paymentMethod || "Not Specified"}</div>
                            <div class="item"><span class="highlight">Fare Amount:</span> ₱${booking.fareAmount}</div>
                            <div class="item"><span class="highlight">Status:</span> ${booking.status}</div>
                            <div class="item"><span class="highlight">Payment Status:</span> ${booking.paymentStatus}</div>
                            <div class="item"><span class="highlight">Date:</span> ${new Date().toLocaleDateString()}</div>
                            <p class="thank-you">Thank you for booking with us!</p>
                            <footer>Victory Liner &copy; ${new Date().getFullYear()}</footer>
                        </div>
                    `);

                    receiptWindow.document.close();
                } else {
                    alert('No verified receipt found for this booking.');
                }
            }



        
            function deleteHistory() {
                if (confirm('Are you sure you want to delete your reservation history? This action cannot be undone.')) {
                    const user = JSON.parse(localStorage.getItem('user'));
                    let history = JSON.parse(localStorage.getItem('history')) || [];
                    history = history.filter(booking => booking.userId !== user.id);
                    localStorage.setItem('history', JSON.stringify(history));
                    displayHistory();
                }
            }
        
            function logout() {
                localStorage.removeItem('user'); 
                alert('You have logged out. You will be redirected to the login page.');
                window.location.href = 'login.html';
            }

            function getStoredData(key) {
                return JSON.parse(localStorage.getItem(key)) || [];
            }

            function setStoredData(key, data) {
            localStorage.setItem(key, JSON.stringify(data));
            }