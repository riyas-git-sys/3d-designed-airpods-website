document.addEventListener('DOMContentLoaded', function() {
    const scene = document.querySelector('.scene');
    const airpodsCase = document.querySelector('.airpods-case');
    let isOpen = false;
    
    // Toggle case open/close on click
    airpodsCase.addEventListener('click', function() {
        if (isOpen) {
            airpodsCase.classList.remove('case-is-open');
        } else {
            airpodsCase.classList.add('case-is-open');
        }
        isOpen = !isOpen;
    });
    
    // 3D rotation effect based on mouse position
    document.addEventListener('mousemove', function(e) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 20;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 20;
        
        // Limit rotation to a reasonable range
        const limitedX = Math.max(-15, Math.min(15, yAxis));
        const limitedY = Math.max(-15, Math.min(15, xAxis));
        
        // Apply smooth rotation
        scene.style.transform = `rotateX(${limitedX}deg) rotateY(${limitedY}deg)`;
        
        // Additional subtle movement for parallax effect
        const airpods = document.querySelectorAll('.airpod');
        airpods.forEach(airpod => {
            const depthFactor = airpod.classList.contains('airpod-left') ? 0.5 : -0.5;
            airpod.style.transform = `translateX(${limitedY * depthFactor}px) translateY(${limitedX * depthFactor}px) ${airpod.classList.contains('airpod-right') ? 'rotate(5deg) scaleX(-1)' : 'rotate(-5deg)'}`;
        });
    });
    
    // Reset position when mouse leaves the container
    document.querySelector('.airpods-container').addEventListener('mouseleave', function() {
        scene.style.transform = 'rotateX(0deg) rotateY(0deg)';
        
        // Reset airpods position
        const airpods = document.querySelectorAll('.airpod');
        airpods.forEach(airpod => {
            airpod.style.transform = airpod.classList.contains('airpod-right') ? 'rotate(5deg) scaleX(-1)' : 'rotate(-5deg)';
        });
    });
    
    // Button hover effects with advanced animation
    const buttons = document.querySelectorAll('.nav-btn, .cta-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.05)';
            button.style.boxShadow = '0 10px 25px rgba(167, 66, 245, 0.3)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = button.classList.contains('cta-btn') ? '0 5px 15px rgba(167, 66, 245, 0.2)' : 'none';
        });
        
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1.05)';
        });
    });
    
    // Add scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card');
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            } else {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Optional: Add parallax scrolling effect
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        document.querySelector('.airpods-container').style.transform = `translateY(${scrollPosition * 0.05}px)`;
    });
});