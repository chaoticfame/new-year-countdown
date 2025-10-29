// DOM Elements
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const yearDisplayEl = document.getElementById('year-display');
const celebrateMessageEl = document.getElementById('celebrate-message');
const fireworksContainer = document.getElementById('fireworks');

// Set target year
const targetYear = new Date().getFullYear() + 1;
yearDisplayEl.textContent = targetYear;

// Create snowflakes
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 5 + 's';
    document.body.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, 8000);
}

// Create multiple snowflakes
setInterval(createSnowflake, 100);

// Update countdown every second
const countdown = setInterval(updateCountdown, 1000);

function updateCountdown() {
    const currentTime = new Date();
    const newYearTime = new Date(`January 1, ${targetYear} 00:00:00`);
    const totalTime = newYearTime - currentTime;
    
    // If countdown is over
    if (totalTime < 0) {
        celebrateNewYear();
        return;
    }
    
    // Calculate time units
    const days = Math.floor(totalTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((totalTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalTime % (1000 * 60)) / 1000);
    
    // Update display
    daysEl.innerHTML = formatTime(days);
    hoursEl.innerHTML = formatTime(hours);
    minutesEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);
    
    // Add occasional fireworks when close to new year
    if (days === 0 && hours < 24) {
        createFirework();
        
        // More frequent fireworks as we get closer
        if (hours < 12) {
            createFirework();
        }
        if (hours < 6) {
            createFirework();
        }
        if (hours < 1) {
            createFirework();
            createFirework();
        }
    }
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function celebrateNewYear() {
    // Show celebration message
    celebrateMessageEl.style.opacity = '1';
    
    // Create fireworks
    for (let i = 0; i < 150; i++) {
        setTimeout(createFirework, i * 30);
    }
    
    // Create confetti
    createConfetti();
    
    // Update display to zeros
    daysEl.innerHTML = '00';
    hoursEl.innerHTML = '00';
    minutesEl.innerHTML = '00';
    secondsEl.innerHTML = '00';
    
    // Stop the countdown
    clearInterval(countdown);
}

function createFirework() {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    firework.style.left = `${posX}%`;
    firework.style.top = `${posY}%`;
    
    // Random size and color
    const size = Math.random() * 8 + 2;
    const hue = Math.random() * 60 + 10; // Orange to red hues
    firework.style.width = `${size}px`;
    firework.style.height = `${size}px`;
    firework.style.boxShadow = `0 0 10px hsl(${hue}, 100%, 50%)`;
    firework.style.background = `hsl(${hue}, 100%, 50%)`;
    
    fireworksContainer.appendChild(firework);
    
    // Remove after animation completes
    setTimeout(() => {
        firework.remove();
    }, 1500);
}

function createConfetti() {
    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random position
            const posX = Math.random() * 100;
            confetti.style.left = `${posX}%`;
            
            // Random size and color
            const size = Math.random() * 10 + 5;
            const hue = Math.random() * 360;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.background = `hsl(${hue}, 100%, 50%)`;
            
            // Random animation duration
            const duration = Math.random() * 3 + 3;
            confetti.style.animationDuration = `${duration}s`;
            
            document.body.appendChild(confetti);
            
            // Remove after animation completes
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }, i * 30);
    }
}

// Initialize
updateCountdown();