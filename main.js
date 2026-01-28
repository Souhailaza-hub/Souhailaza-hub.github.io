document.addEventListener('DOMContentLoaded', () => {
    initHearts();
    initScrollAnimations();
    initModal();
});

function initModal() {
    const modal = document.getElementById('letter-modal');
    const closeBtn = document.querySelector('.close-modal');
    const modalDate = document.getElementById('modal-date');
    const modalText = document.getElementById('modal-text');

    // Open Modal
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.letter-card');
            const date = card.querySelector('.letter-date').textContent;
            const fullText = card.querySelector('.full-letter-content').innerHTML;

            modalDate.textContent = date;
            modalText.innerHTML = fullText;

            modal.style.display = "block";
            // Trigger reflow
            void modal.offsetWidth;
            modal.classList.add('show');
        });
    });

    // Close Modal
    closeBtn.addEventListener('click', () => {
        closeModal(modal);
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModal(modal);
        }
    });
}

function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = "none";
    }, 300); // Wait for transition
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        root: document.querySelector('.container'),
        threshold: 0.1
    });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

function initHearts() {
    const container = document.getElementById('hearts-container');
    const heartCount = 15;

    for (let i = 0; i < heartCount; i++) {
        createHeart(container);
    }
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    // Simple SVG Heart inline
    heart.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e5b7be" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
    `;

    // Randomize position and animation
    const randomLeft = Math.random() * 100;
    const randomDelay = Math.random() * 10;
    const randomDuration = 15 + Math.random() * 10;
    const randomScale = 0.5 + Math.random() * 1;

    heart.style.left = `${randomLeft}%`;
    heart.style.animationDelay = `${randomDelay}s`;
    heart.style.animationDuration = `${randomDuration}s`;
    heart.style.transform = `scale(${randomScale})`;

    // Slight color variation (using opacity or filters, but here we keep it simple or random stroke)

    container.appendChild(heart);
}
