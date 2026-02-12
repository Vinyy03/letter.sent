// DOM Elements
const card = document.getElementById('valentineCard');
const openBtn = document.getElementById('openBtn');
const cardFront = document.querySelector('.card-front');
const cardInside = document.getElementById('cardInside');
const floatingHearts = document.getElementById('floatingHearts');
const valentineMusic = document.getElementById('valentineMusic');
const questionBox = document.getElementById('questionBox');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');
const loveLetter = document.getElementById('loveLetter');
const readLetterBtn = document.getElementById('readLetterBtn');
const closeLetterBtn = document.getElementById('closeLetterBtn');

// State variables
let isMusicPlaying = false;
let noButtonClickCount = 0;

// Valentine's messages for typing effect
const messages = [
    "I have a question for you... 💖",
];

// Initialize floating hearts
function createFloatingHearts() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
            heart.style.animationDelay = Math.random() * 5 + 's';
            floatingHearts.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 10000);
        }, i * 300);
    }
}

// Typing effect
function typeWriter(text, element, index = 0) {
    if (index < text.length) {
        element.innerHTML += text.charAt(index);
        setTimeout(() => typeWriter(text, element, index + 1), 50);
    }
}

// Open card with animation
function openCard() {
    cardFront.classList.add('hidden');
    cardInside.classList.remove('hidden');
    
    // Start typing effect
    const messageElement = document.getElementById('typingMessage');
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    typeWriter(randomMessage, messageElement);
    
    // Show question box after 3 seconds
    setTimeout(() => {
        questionBox.classList.remove('hidden');
    }, 3000);
    
    // Create celebration hearts
    createFloatingHearts();
}

// Handle "No" button with playful evasion
function handleNoButton() {
    noButtonClickCount++;
    
    // Make the "No" button run away
    const noBtn = document.querySelector('.no-btn');
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.2s';
    
    // Change button text based on clicks
    if (noButtonClickCount === 1) {
        noBtn.textContent = 'Are you sure? 😢';
    } else if (noButtonClickCount === 2) {
        noBtn.textContent = 'Really? 💔';
    } else if (noButtonClickCount === 3) {
        noBtn.textContent = 'Last chance! ❤️';
    } else {
        noBtn.textContent = 'Just click Yes! 🥺';
    }
}

// Handle "Yes" button - Celebration time!
function handleYesButton() {
    questionBox.classList.add('hidden');
    celebration.classList.remove('hidden');
    
    // Play music when she says yes
    valentineMusic.play().catch(e => console.log('Audio play failed:', e));
    isMusicPlaying = true;
    
    // Create massive heart explosion
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = ['❤️', '💖', '💘', '💝', '💕'][Math.floor(Math.random() * 5)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '50%';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.animation = 'float 4s ease-out';
            celebration.appendChild(heart);
            
            // Remove hearts after animation
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 50);
    }
}

// Show love letter
function showLoveLetter() {
    celebration.classList.add('hidden');
    loveLetter.classList.remove('hidden');
}

// Close love letter
function closeLoveLetter() {
    loveLetter.classList.add('hidden');
    // Show celebration again
    celebration.classList.remove('hidden');
}

// Reset celebration
function resetCelebration() {
    celebration.classList.add('hidden');
}

// Event Listeners
openBtn.addEventListener('click', openCard);
yesBtn.addEventListener('click', handleYesButton);
noBtn.addEventListener('click', handleNoButton);
readLetterBtn.addEventListener('click', showLoveLetter);
closeLetterBtn.addEventListener('click', closeLoveLetter);

// Initialize floating hearts every 5 seconds
setInterval(createFloatingHearts, 5000);

// Start first batch of hearts
createFloatingHearts();

// Add hover effect on card
card.addEventListener('mouseenter', () => {
    card.style.transform = 'scale(1.02)';
});

card.addEventListener('mouseleave', () => {
    card.style.transform = 'scale(1)';
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!celebration.classList.contains('hidden')) {
            resetCelebration();
        }
        if (!loveLetter.classList.contains('hidden')) {
            closeLoveLetter();
        }
    }
});

// Touch support for mobile
document.addEventListener('touchstart', (e) => {
    // Add touch feedback
    if (e.target.classList.contains('btn') || 
        e.target.classList.contains('open-btn') || 
        e.target.classList.contains('yes-btn') || 
        e.target.classList.contains('no-btn') || 
        e.target.classList.contains('read-letter-btn') || 
        e.target.classList.contains('close-letter-btn')) {
        e.target.style.transform = 'scale(0.95)';
    }
});

document.addEventListener('touchend', (e) => {
    if (e.target.classList.contains('btn') || 
        e.target.classList.contains('open-btn') || 
        e.target.classList.contains('yes-btn') || 
        e.target.classList.contains('no-btn') || 
        e.target.classList.contains('read-letter-btn') || 
        e.target.classList.contains('close-letter-btn')) {
        e.target.style.transform = 'scale(1)';
    }
});

// Smooth scroll to question box
function scrollToQuestion() {
    questionBox.scrollIntoView({ behavior: 'smooth' });
}

// Export functions for global access
window.showLoveLetter = showLoveLetter;
window.closeLoveLetter = closeLoveLetter;