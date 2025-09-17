// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.program-card, .feature, .gallery-item, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simple form validation
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '#E9ECEF';
            }
        });
        
        if (isValid) {
            // Show success message
            showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon!', 'success');
            this.reset();
        } else {
            showNotification('Please fill in all required fields.', 'error');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Nunito', sans-serif;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-star, .floating-heart');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add click effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Interactive gallery hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Trigger special animation
        document.body.style.animation = 'rainbow 2s ease-in-out';
        showNotification('🌟 You found the secret! Welcome to the magical world of Little Stars! 🌟', 'success');
        konamiCode = [];
        
        // Add rainbow animation
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                25% { filter: hue-rotate(90deg); }
                50% { filter: hue-rotate(180deg); }
                75% { filter: hue-rotate(270deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
            rainbowStyle.remove();
        }, 2000);
    }
});

// Add floating particles on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.1) { // 10% chance
        createFloatingParticle(e.clientX, e.clientY);
    }
});

// Add click functionality to floating letters
document.addEventListener('DOMContentLoaded', function() {
    const floatingLetters = document.querySelectorAll('.floating-letter');
    
    floatingLetters.forEach(letter => {
        letter.addEventListener('click', function() {
            const letterText = this.textContent;
            
            // Create a fun animation
            this.style.transform = 'scale(1.5) rotate(360deg)';
            this.style.transition = 'transform 0.6s ease';
            
            // Show letter name
            showNotification(`Letter ${letterText}! Great job!`, 'success');
            
            // Reset animation
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 600);
        });
    });
});

function createFloatingParticle(x, y) {
    const particle = document.createElement('div');
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const letter = letters[Math.floor(Math.random() * letters.length)];
    
    particle.textContent = letter;
    
    // Color array for letters
    const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)', 'var(--success-color)', 'var(--warning-color)'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 1.2rem;
        font-family: 'Fredoka', cursive;
        font-weight: 700;
        color: ${color};
        background: white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: 1000;
        animation: floatAway 2s ease-out forwards;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 2000);
}

// Add float away animation
const floatAwayStyle = document.createElement('style');
floatAwayStyle.textContent = `
    @keyframes floatAway {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
        }
    }
`;
document.head.appendChild(floatAwayStyle);

// Story Books Functionality
const stories = {
    adventure: {
        title: "The Little Explorer",
        pages: [
            {
                scene: "🏔️🌲☀️",
                text: "Once upon a time, there was a little boy named Timmy who loved to explore. One sunny morning, he decided to go on an adventure in the magical forest behind his house."
            },
            {
                scene: "🦋🌸🌿",
                text: "As Timmy walked through the forest, he met a beautiful butterfly who showed him the way to a secret garden filled with colorful flowers and singing birds."
            },
            {
                scene: "🏠👦✨",
                text: "After his wonderful adventure, Timmy returned home with a heart full of joy and memories of the magical forest. He couldn't wait to tell his family about his amazing journey!"
            }
        ]
    },
    animals: {
        title: "Animal Friends",
        pages: [
            {
                scene: "🐄🐷🐔",
                text: "Welcome to Happy Farm! Here, all the animals live together in harmony. Let's meet our friendly farm animals and learn about their special sounds."
            },
            {
                scene: "🐕🐱🐰",
                text: "In the farmyard, the pets love to play together. The dog barks 'Woof!', the cat meows 'Meow!', and the bunny hops around happily."
            },
            {
                scene: "❤️🏡🌟",
                text: "At Happy Farm, everyone is friends! The animals teach us that kindness and friendship make the world a better place for everyone."
            }
        ]
    },
    colors: {
        title: "Rainbow Magic",
        pages: [
            {
                scene: "🌈🎨✨",
                text: "In a magical land, there lived a little artist who could paint with rainbow colors. Every stroke of her brush created beautiful, vibrant colors that danced in the sky."
            },
            {
                scene: "🔴🟡🔵",
                text: "The artist mixed red and yellow to make orange, blue and yellow to make green, and red and blue to make purple. What wonderful colors!"
            },
            {
                scene: "🎉🌟💖",
                text: "With her rainbow magic, the artist painted a beautiful world where everyone could see the beauty in all colors, teaching us that diversity makes life more beautiful!"
            }
        ]
    }
};

let currentStory = null;
let currentPage = 0;

// Story modal functionality
const storyModal = document.getElementById('story-modal');
const storyTitle = document.getElementById('story-title');
const storyScene = document.getElementById('story-scene');
const storyContent = document.getElementById('story-content');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageIndicator = document.getElementById('page-indicator');
const closeStoryBtn = document.querySelector('.close-story');

// Open story
document.querySelectorAll('.read-story').forEach(button => {
    button.addEventListener('click', function() {
        const storyType = this.getAttribute('data-story');
        openStory(storyType);
    });
});

function openStory(storyType) {
    currentStory = stories[storyType];
    currentPage = 0;
    
    storyTitle.textContent = currentStory.title;
    updateStoryPage();
    storyModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function updateStoryPage() {
    const page = currentStory.pages[currentPage];
    storyScene.textContent = page.scene;
    storyContent.textContent = page.text;
    
    pageIndicator.textContent = `Page ${currentPage + 1} of ${currentStory.pages.length}`;
    
    prevPageBtn.disabled = currentPage === 0;
    nextPageBtn.disabled = currentPage === currentStory.pages.length - 1;
}

// Story navigation
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updateStoryPage();
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage < currentStory.pages.length - 1) {
        currentPage++;
        updateStoryPage();
    }
});

// Close story modal
closeStoryBtn.addEventListener('click', closeStoryModal);
storyModal.addEventListener('click', function(e) {
    if (e.target === this) {
        closeStoryModal();
    }
});

function closeStoryModal() {
    storyModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Games Functionality
const gameModal = document.getElementById('game-modal');
const gameTitle = document.getElementById('game-title');
const gameArea = document.getElementById('game-area');
const scoreElement = document.getElementById('score');
const closeGameBtn = document.querySelector('.close-game');
const restartGameBtn = document.getElementById('restart-game');

let currentGame = null;
let gameScore = 0;

// Open game
document.querySelectorAll('.play-game').forEach(button => {
    button.addEventListener('click', function() {
        const gameType = this.getAttribute('data-game');
        openGame(gameType);
    });
});

function openGame(gameType) {
    currentGame = gameType;
    gameScore = 0;
    updateScore();
    
    const gameNames = {
        memory: 'Memory Match',
        counting: 'Count the Stars',
        colors: 'Color Mixer',
        alphabet: 'ABC Adventure'
    };
    
    gameTitle.textContent = gameNames[gameType];
    gameArea.innerHTML = '';
    
    switch(gameType) {
        case 'memory':
            createMemoryGame();
            break;
        case 'counting':
            createCountingGame();
            break;
        case 'colors':
            createColorMixerGame();
            break;
        case 'alphabet':
            createAlphabetGame();
            break;
    }
    
    gameModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function updateScore() {
    scoreElement.textContent = gameScore;
}





// Memory Game
function createMemoryGame() {
    const symbols = ['⭐', '🖕', '✨', '💖', '💝', '🎈', '🎨', '🎪'];
    const gameSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    
    const memoryGrid = document.createElement('div');
    memoryGrid.className = 'memory-grid';
    
    let flippedCards = [];
    let matchedPairs = 0;
    
    gameSymbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.setAttribute('data-symbol', symbol);
        card.setAttribute('data-index', index);
        
        card.addEventListener('click', function() {
            if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
                this.classList.add('flipped');
                this.textContent = symbol;
                flippedCards.push(this);
                
                if (flippedCards.length === 2) {
                    setTimeout(() => {
                        const [card1, card2] = flippedCards;
                        if (card1.getAttribute('data-symbol') === card2.getAttribute('data-symbol')) {
                            card1.classList.add('matched');
                            card2.classList.add('matched');
                            gameScore += 10;
                            updateScore();
                            matchedPairs++;
                            
                            if (matchedPairs === symbols.length) {
                                showNotification('🎉 Congratulations! You completed the memory game!', 'success');
                            }
                        } else {
                            card1.classList.remove('flipped');
                            card2.classList.remove('flipped');
                            card1.textContent = '';
                            card2.textContent = '';
                        }
                        flippedCards = [];
                    }, 1000);
                }
            }
        });
        
        memoryGrid.appendChild(card);
    });
    
    gameArea.appendChild(memoryGrid);
}

// Counting Game
function createCountingGame() {
    const countingDiv = document.createElement('div');
    countingDiv.className = 'counting-game';
    
    const targetCount = Math.floor(Math.random() * 10) + 1;
    const instruction = document.createElement('h3');
    instruction.textContent = `Click exactly ${targetCount} stars!`;
    countingDiv.appendChild(instruction);
    
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    
    const totalStars = targetCount + Math.floor(Math.random() * 5) + 2;
    let clickedCount = 0;
    
    for (let i = 0; i < totalStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = '⭐';
        star.style.animationDelay = `${i * 0.1}s`;
        
        star.addEventListener('click', function() {
            if (!this.classList.contains('clicked')) {
                this.classList.add('clicked');
                clickedCount++;
                
                if (clickedCount === targetCount) {
                    gameScore += 20;
                    updateScore();
                    showNotification('🌟 Perfect! You counted exactly right!', 'success');
                    setTimeout(() => {
                        createCountingGame();
                    }, 2000);
                } else if (clickedCount > targetCount) {
                    showNotification('Oops! You clicked too many stars. Try again!', 'error');
                    setTimeout(() => {
                        createCountingGame();
                    }, 2000);
                }
            }
        });
        
        starContainer.appendChild(star);
    }
    
    countingDiv.appendChild(starContainer);
    gameArea.appendChild(countingDiv);
}

// Color Mixer Game
function createColorMixerGame() {
    const colorDiv = document.createElement('div');
    colorDiv.className = 'color-mixer';
    
    const instruction = document.createElement('h3');
    instruction.textContent = 'Mix colors to create new ones!';
    colorDiv.appendChild(instruction);
    
    const colorPalette = document.createElement('div');
    colorPalette.className = 'color-palette';
    
    const colors = [
        { name: 'Red', value: '#FF6B9D' },
        { name: 'Blue', value: '#4ECDC4' },
        { name: 'Yellow', value: '#FFE66D' }
    ];
    
    let selectedColors = [];
    
    colors.forEach(color => {
        const colorBtn = document.createElement('button');
        colorBtn.className = 'color-btn';
        colorBtn.style.backgroundColor = color.value;
        colorBtn.setAttribute('data-color', color.value);
        colorBtn.setAttribute('data-name', color.name);
        
        colorBtn.addEventListener('click', function() {
            if (selectedColors.length < 2 && !selectedColors.includes(color.value)) {
                selectedColors.push(color.value);
                this.style.border = '4px solid #333';
                
                if (selectedColors.length === 2) {
                    mixColors(selectedColors);
                    setTimeout(() => {
                        selectedColors = [];
                        colorPalette.querySelectorAll('.color-btn').forEach(btn => {
                            btn.style.border = 'none';
                        });
                    }, 2000);
                }
            }
        });
        
        colorPalette.appendChild(colorBtn);
    });
    
    const mixResult = document.createElement('div');
    mixResult.className = 'mix-result';
    mixResult.textContent = 'Mix colors!';
    
    colorDiv.appendChild(colorPalette);
    colorDiv.appendChild(mixResult);
    gameArea.appendChild(colorDiv);
    
    function mixColors(colors) {
        const [color1, color2] = colors;
        let resultColor = '#f0f0f0';
        let resultText = 'Mix colors!';
        
        if ((color1 === '#FF6B9D' && color2 === '#FFE66D') || (color1 === '#FFE66D' && color2 === '#FF6B9D')) {
            resultColor = '#FFA500';
            resultText = 'Orange!';
        } else if ((color1 === '#4ECDC4' && color2 === '#FFE66D') || (color1 === '#FFE66D' && color2 === '#4ECDC4')) {
            resultColor = '#32CD32';
            resultText = 'Green!';
        } else if ((color1 === '#FF6B9D' && color2 === '#4ECDC4') || (color1 === '#4ECDC4' && color2 === '#FF6B9D')) {
            resultColor = '#9370DB';
            resultText = 'Purple!';
        }
        
        mixResult.style.backgroundColor = resultColor;
        mixResult.textContent = resultText;
        gameScore += 15;
        updateScore();
    }
}

// Alphabet Game
function createAlphabetGame() {
    const alphabetDiv = document.createElement('div');
    alphabetDiv.className = 'alphabet-game';
    
    const animals = {
        'A': '🐊', 'B': '🐻', 'C': '🐱', 'D': '🐕', 'E': '🐘', 'F': '🐸',
        'G': '🦒', 'H': '🐴', 'I': '🦎', 'J': '🦒', 'K': '🐨', 'L': '🦁',
        'M': '🐒', 'N': '🐮', 'O': '🦉', 'P': '🐧', 'Q': '🦆', 'R': '🐰',
        'S': '🐍', 'T': '🐯', 'U': '🦄', 'V': '🦇', 'W': '🐋', 'X': '🦊',
        'Y': '🦓', 'Z': '🦓'
    };
    
    const letters = Object.keys(animals);
    let currentLetterIndex = 0;
    let correctAnswers = 0;
    
    function showCurrentLetter() {
        const currentLetter = letters[currentLetterIndex];
        const currentAnimal = animals[currentLetter];
        
        alphabetDiv.innerHTML = `
            <h3>What letter does this animal start with?</h3>
            <div class="animal-display">${currentAnimal}</div>
            <div class="letter-display">?</div>
            <div class="letter-buttons"></div>
        `;
        
        const letterButtons = alphabetDiv.querySelector('.letter-buttons');
        const shuffledLetters = [...letters].sort(() => Math.random() - 0.5).slice(0, 6);
        
        if (!shuffledLetters.includes(currentLetter)) {
            shuffledLetters[0] = currentLetter;
        }
        
        shuffledLetters.forEach(letter => {
            const btn = document.createElement('button');
            btn.className = 'letter-btn';
            btn.textContent = letter;
            
            btn.addEventListener('click', function() {
                if (letter === currentLetter) {
                    this.classList.add('correct');
                    correctAnswers++;
                    gameScore += 10;
                    updateScore();
                    
                    setTimeout(() => {
                        currentLetterIndex++;
                        if (currentLetterIndex < letters.length) {
                            showCurrentLetter();
                        } else {
                            showNotification('🎉 Great job! You completed the alphabet game!', 'success');
                        }
                    }, 1000);
                } else {
                    this.classList.add('incorrect');
                    setTimeout(() => {
                        this.classList.remove('incorrect');
                    }, 1000);
                }
            });
            
            letterButtons.appendChild(btn);
        });
    }
    
    showCurrentLetter();
    gameArea.appendChild(alphabetDiv);
}

// Close game modal
closeGameBtn.addEventListener('click', closeGameModal);
gameModal.addEventListener('click', function(e) {
    if (e.target === this) {
        closeGameModal();
    }
});

restartGameBtn.addEventListener('click', function() {
    if (currentGame) {
        openGame(currentGame);
    }
});

function closeGameModal() {
    gameModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Login System Functionality
let currentUser = null;
let userProgress = {
    storiesRead: 0,
    gamesPlayed: 0,
    totalScore: 0
};

// Demo users for testing
const demoUsers = {
    'parent@demo.com': {
        name: 'Emma Johnson',
        email: 'parent@demo.com',
        password: 'demo123',
        childName: 'Lily Johnson',
        childAge: 3,
        childLevel: 'preschool',
        role: 'parent'
    },
    'teacher@demo.com': {
        name: 'Ms. Sarah Wilson',
        email: 'teacher@demo.com',
        password: 'demo123',
        childName: 'Class Monitor',
        childAge: 4,
        childLevel: 'prek',
        role: 'teacher'
    }
};

// Login Modal Elements
const loginModal = document.getElementById('login-modal');
const loginBtn = document.getElementById('loginBtn');
const closeLoginBtn = document.querySelector('.close-login');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const tabBtns = document.querySelectorAll('.tab-btn');
const loginForms = document.querySelectorAll('.login-form');

// Dashboard Modal Elements
const dashboardModal = document.getElementById('dashboard-modal');
const closeDashboardBtn = document.querySelector('.close-dashboard');
const logoutBtn = document.getElementById('logoutBtn');
const continueLearningBtn = document.getElementById('continueLearning');

// Guest access buttons
const guestToddlerBtn = document.getElementById('guestToddler');
const guestPreschoolBtn = document.getElementById('guestPreschool');
const guestPrekBtn = document.getElementById('guestPrek');

// Open login modal
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Close login modal
closeLoginBtn.addEventListener('click', closeLoginModal);
loginModal.addEventListener('click', function(e) {
    if (e.target === this) {
        closeLoginModal();
    }
});

// Tab switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const tab = this.getAttribute('data-tab');
        
        // Update active tab
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Update active form
        loginForms.forEach(form => form.classList.remove('active'));
        document.getElementById(`${tab}-form`).classList.add('active');
    });
});

// Demo account buttons
document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const email = this.getAttribute('data-email');
        const password = this.getAttribute('data-password');
        
        document.getElementById('loginEmail').value = email;
        document.getElementById('loginPassword').value = password;
        
        // Auto-login with demo account
        loginUser(email, password);
    });
});

// Login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    loginUser(email, password);
});

// Register form submission
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        childName: formData.get('name'),
        childAge: parseInt(formData.get('age')),
        childLevel: formData.get('level'),
        role: 'parent'
    };
    
    registerUser(userData);
});

// Guest access
guestToddlerBtn.addEventListener('click', () => setGuestLevel('toddler'));
guestPreschoolBtn.addEventListener('click', () => setGuestLevel('preschool'));
guestPrekBtn.addEventListener('click', () => setGuestLevel('prek'));

// Dashboard functionality
closeDashboardBtn.addEventListener('click', closeDashboardModal);
dashboardModal.addEventListener('click', function(e) {
    if (e.target === this) {
        closeDashboardModal();
    }
});

logoutBtn.addEventListener('click', logout);
continueLearningBtn.addEventListener('click', () => {
    closeDashboardModal();
    // Scroll to games section
    document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
});

function loginUser(email, password) {
    // Check demo users first
    if (demoUsers[email] && demoUsers[email].password === password) {
        currentUser = demoUsers[email];
        showNotification('Welcome back!', 'success');
        closeLoginModal();
        showDashboard();
        updateLoginButton();
        return;
    }
    
    // Check localStorage for registered users
    const users = JSON.parse(localStorage.getItem('nurseryUsers') || '{}');
    if (users[email] && users[email].password === password) {
        currentUser = users[email];
        showNotification('Welcome back!', 'success');
        closeLoginModal();
        showDashboard();
        updateLoginButton();
        return;
    }
    
    showNotification('Invalid email or password. Please try again.', 'error');
}

function registerUser(userData) {
    const users = JSON.parse(localStorage.getItem('nurseryUsers') || '{}');
    
    if (users[userData.email]) {
        showNotification('An account with this email already exists.', 'error');
        return;
    }
    
    users[userData.email] = userData;
    localStorage.setItem('nurseryUsers', JSON.stringify(users));
    
    currentUser = userData;
    showNotification('Account created successfully! Welcome to Little Stars!', 'success');
    closeLoginModal();
    showDashboard();
    updateLoginButton();
}

function setGuestLevel(level) {
    currentUser = {
        name: 'Guest User',
        childName: 'Little Star',
        childAge: level === 'toddler' ? 2 : level === 'preschool' ? 3 : 4,
        childLevel: level,
        role: 'guest'
    };
    
    showNotification(`Welcome! You're now browsing as a ${level} level user.`, 'success');
    closeLoginModal();
    updateLoginButton();
}

function showDashboard() {
    if (!currentUser) return;
    
    // Update dashboard content
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('childName').textContent = currentUser.childName;
    document.getElementById('childLevel').textContent = `Level: ${currentUser.childLevel.charAt(0).toUpperCase() + currentUser.childLevel.slice(1)}`;
    document.getElementById('childAge').textContent = `Age: ${currentUser.childAge} years`;
    
    // Load user progress
    const progress = JSON.parse(localStorage.getItem(`progress_${currentUser.email}`) || JSON.stringify(userProgress));
    document.getElementById('storiesRead').textContent = progress.storiesRead;
    document.getElementById('gamesPlayed').textContent = progress.gamesPlayed;
    document.getElementById('totalScore').textContent = progress.totalScore;
    
    dashboardModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function closeDashboardModal() {
    dashboardModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function logout() {
    currentUser = null;
    showNotification('You have been logged out successfully.', 'success');
    closeDashboardModal();
    updateLoginButton();
}

function updateLoginButton() {
    if (currentUser) {
        loginBtn.innerHTML = `<i class="fas fa-user-circle"></i> ${currentUser.name}`;
        loginBtn.onclick = showDashboard;
    } else {
        loginBtn.innerHTML = `<i class="fas fa-user"></i> Login`;
        loginBtn.onclick = () => {
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };
    }
}

// Save progress when user plays games or reads stories
function saveProgress(type, score = 0) {
    if (!currentUser || currentUser.role === 'guest') return;
    
    const progress = JSON.parse(localStorage.getItem(`progress_${currentUser.email}`) || JSON.stringify(userProgress));
    
    if (type === 'story') {
        progress.storiesRead++;
    } else if (type === 'game') {
        progress.gamesPlayed++;
        progress.totalScore += score;
    }
    
    localStorage.setItem(`progress_${currentUser.email}`, JSON.stringify(progress));
}

// Update story and game functions to save progress
const originalOpenStory = openStory;
openStory = function(storyType) {
    originalOpenStory(storyType);
    saveProgress('story');
};

const originalOpenGame = openGame;
openGame = function(gameType) {
    originalOpenGame(gameType);
    saveProgress('game');
};

// Update score tracking in games
const originalUpdateScore = updateScore;
updateScore = function() {
    originalUpdateScore();
    if (currentUser && currentUser.role !== 'guest') {
        const progress = JSON.parse(localStorage.getItem(`progress_${currentUser.email}`) || JSON.stringify(userProgress));
        progress.totalScore = gameScore;
        localStorage.setItem(`progress_${currentUser.email}`, JSON.stringify(progress));
    }
};

// Check for existing login on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user was previously logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateLoginButton();
    }
    
    // Save current user to localStorage when it changes
    const originalSetUser = (user) => {
        currentUser = user;
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('currentUser');
        }
    };
    
    // Override user setting functions
    const originalLoginUser = loginUser;
    loginUser = function(email, password) {
        originalLoginUser(email, password);
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    };
    
    const originalRegisterUser = registerUser;
    registerUser = function(userData) {
        originalRegisterUser(userData);
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    };
    
    const originalLogout = logout;
    logout = function() {
        originalLogout();
        localStorage.removeItem('currentUser');
    };
});
