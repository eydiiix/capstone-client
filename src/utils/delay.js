export const delay = (seconds) => {

    let ms = seconds * 1000;
    return new Promise((resolve) => setTimeout(resolve, ms));
}