function formateDate(dateString) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date(dateString);

    const hour12 = date.toLocaleString('en-US', { hour: 'numeric', hour12: true, timeZone });
    const [hour, ampm] = hour12.split(' ');
    
    const min = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short', timeZone }); 
    const year = date.getFullYear();

    return `${hour.padStart(2, '0')}:${min} ${ampm}, ${day} ${month}, ${year}`;
}

window.addEventListener("load", () => {
    document.querySelectorAll('.dateFormater').forEach(el => {
        const rawDate = el.getAttribute('data-timestamp');
        el.innerText = formateDate(rawDate); 
    });
});