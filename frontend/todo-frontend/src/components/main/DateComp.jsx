import styles from "./DateComp.module.css";

/**
 * DateComp Component
 *
 * Displays the current day of the week, month, and date in a polished card.
 * Features:
 * - Dynamic rendering of the day and month names
 * - Smooth hover effects for UX
 * - Responsive for mobile screens
 */
const DateComp = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const dayName = daysOfWeek[today.getDay()];
  const monthName = monthsOfYear[today.getMonth()];
  const dayNumber = today.getDate();

  return (
    <div className={styles.dateContainer}>
      {/* Day of the week */}
      <h2 className={styles.day}>{dayName}</h2>

      {/* Month and date */}
      <div className={styles.monthDateContainer}>
        <h3 className={styles.month}>{monthName}</h3>
        <h3 className={styles.dateNumber}>{dayNumber}</h3>
      </div>
    </div>
  );
};

export default DateComp;
