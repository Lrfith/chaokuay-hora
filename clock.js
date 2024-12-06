document.addEventListener('DOMContentLoaded', function () {
    function updateTime() {
        const now = new Date();

        // Display local time
        const localHours = String(now.getHours()).padStart(2, '0');
        const localMinutes = String(now.getMinutes()).padStart(2, '0');
        const localSeconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('clock').textContent = `${localHours}:${localMinutes}:${localSeconds}`;

        // Display Malaysia time
        const malaysiaTime = new Date().toLocaleTimeString('en-US', {
            timeZone: 'Asia/Kuala_Lumpur',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
        document.getElementById('malaysia-time').textContent = malaysiaTime;

        // Display Bangkok time
        const bangkokTime = new Date().toLocaleTimeString('en-US', {
            timeZone: 'Asia/Bangkok',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
        document.getElementById('bangkok-time').textContent = bangkokTime;
    }

    updateTime(); // Call immediately
    setInterval(updateTime, 1000); // Update every second
});
