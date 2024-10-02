// Replace with actual email addresses
const recipients = [
  "test1@example.com",
  "test2@example.com",
  "test3@example.com",
  "test4@example.com",
  "test5@example.com",
];

const supremeDate = new Date('September 27, 2024 00:00:00');
const girls = ["Luknė", "Rugilė", "Kamilė"];
let currentGirlIndex = 0;
const today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
// const today = new Date('Septmber 30, 2024 00:00:00');
// const today = new Date('Octoer 2, 2024 00:00:00');
// const today = new Date('November 30, 2024 00:00:00');
// const today = new Date('December 28, 2024 00:00:00');
const month = document.getElementById('month');
const dayDifference = getDayDifference(supremeDate, today);

month.textContent = today.toLocaleString("lt-LT", {
  month: "long",
});
currentDay = today.getDate();
currentGirlIndex = (dayDifference - 1) % girls.length;

// Get the number of days in the current month and log it to the console
const dayCount = getDayCountInCurrentMonth();
const weekdayIndex = getFirstWeekdayIndex();

// console.log('today', today);
// console.log('currentDay', currentDay);
// console.log('dayCount', dayCount);
// console.log('weekdayIndex', weekdayIndex);
// console.log('dayDifference', dayDifference);
// console.log('currentGirlIndex', currentGirlIndex);

updateSchedule();

function updateSchedule() {
  const dayNumberElement = document.getElementById("dayNumber");
  const weekDayElement = document.getElementById("weekDay");
  const girlNameElement = document.getElementById("girlName");

  dayNumberElement.textContent = currentDay;
  weekDayElement.textContent = today.toLocaleString("lt-LT", {
    weekday: "long",
  });
  girlNameElement.textContent = girls[currentGirlIndex];

  sendEmail();
}

function sendEmail() {
  // Replace with your email sending logic (e.g., using a library like EmailJS)
  const subject = "Pet Care Schedule for Day " + currentDay;
  const body = `Day: ${currentDay}\nWeekday: ${new Date().toLocaleString(
    "en-US",
    { weekday: "long" }
  )}\nGirl: ${girls[currentGirlIndex]}`;

  //   recipients.forEach((recipient) => {
  //     // Send email to the recipient
  //     console.log("Sending email to:", recipient);
  //     console.log("Subject:", subject);
  //     console.log("Body:", body);
  //   });
}

function openCalendar() {
  const calendarPopup = document.getElementById("calendarPopup");
  calendarPopup.style.display = "block";

  // Populate the calendar with day numbers and girl initials
  const calendarElement = document.getElementById("calendar");
  const weekdays = [
    "Pirmadienis",
    "Antradienis",
    "Treciadienis",
    "Ketvirtadienis",
    "Penktadienis",
    "Sestadienis",
    "Sekmadienis",
  ];

  // Table header weekday names
  for (let i = 0; i < 7; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar-day");
    dayElement.classList.add("header");
    dayElement.textContent += weekdays[i].slice(0, 4);
    calendarElement.appendChild(dayElement);
  }

  for (let i = 1; i < dayCount + weekdayIndex; i++) {
    const currentDay2 = i - weekdayIndex + 1;
    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar-day");

    if (i >= weekdayIndex) {
      dayElement.textContent = currentDay2;
      dayElement.dataset.day = currentDay2;
      dayElement.addEventListener("click", () => showHistory(currentDay2));

      // ------------------------------------------------------------------      
      
      let currentGirlIndex = 0;
      const calendarDate = new Date(today.getFullYear(), today.getMonth(), currentDay2);
      const dayDifference = getDayDifference(supremeDate, calendarDate);
      currentGirlIndex = (dayDifference - 1) % girls.length;
      const girlInitial = girls[currentGirlIndex][0];
      dayElement.textContent += ` (${girlInitial})`;

      if (currentDay2 == currentDay) {
        dayElement.style.backgroundColor = '#ffeb3b';
      }
    }

    calendarElement.appendChild(dayElement);

    const closeButton = document.getElementById("closeButton");

    closeButton.addEventListener("click", () => {
      const popUp = document.getElementById("calendarPopup");
      popUp.style.display = "none";
      calendarElement.innerHTML = "";
    });
  }
}

function showHistory(day) {
  // Implement logic to show history for the selected day (e.g., fetch data from a database or local storage)
  //   console.log("Showing history for day:", day);
}

// Initial schedule update
updateSchedule();

// Set interval to update schedule daily
setInterval(updateSchedule, 24 * 60 * 60 * 1000); // Update every 24 hours

// Attach event listener to the calendar button
const calendarButton = document.getElementById("calendarButton");
calendarButton.addEventListener("click", openCalendar);

function getDayCountInCurrentMonth() {
  const year = today.getFullYear();
  const month = today.getMonth();

  // Create a new Date object for the last day of the month
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Calculate the difference in days between the first and last days of the month
  const dayCount = lastDayOfMonth.getDate();

  return dayCount;
}

function getFirstWeekdayIndex() {
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  let weekdayIndex = firstDayOfMonth.getDay();

  // Adjust the weekday index if the first day of the month is Sunday
  if (weekdayIndex === 0) {
    weekdayIndex = 7;
  }

  return weekdayIndex;
}

function getDayDifference(date1, date2) {  
  // Calculating the time difference
  // of two dates
  let Difference_In_Time = date2.getTime() - date1.getTime();
  
  // Calculating the no. of days between
  // two dates
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
  
  return Difference_In_Days;
}