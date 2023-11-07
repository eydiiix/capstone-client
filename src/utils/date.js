export function calculateCurrentDateMinus12Years() {
    const currentDate = new Date(); // Get the current date
    currentDate.setFullYear(currentDate.getFullYear() - 12); // Subtract 12 years

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

export function calculateCurrentDateMinus60Years() {
    const currentDate = new Date(); // Get the current date
    currentDate.setFullYear(currentDate.getFullYear() - 60); // Subtract 100 years

    // Format the date as "yyyy-mm-dd"
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
