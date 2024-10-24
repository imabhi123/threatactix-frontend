export const endDateToday=new Date().getFullYear() +
"-" +
(new Date().getMonth() + 1).toString().padStart(2, "0") +
"-" +
new Date().getDate().toString().padStart(2, "0");