let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;

// Thêm transition vào CSS của slider
slider.style.transition = 'left 0.5s ease-in-out';

next.onclick = function() {
    if (active === lengthItems) {
        // Nếu đang ở item cuối, tắt transition và nhảy ngay về item đầu
        slider.style.transition = 'none';
        active = 0;
        slider.style.left = '0px';
        
        // Kích hoạt lại transition sau khi nhảy
        setTimeout(() => {
            slider.style.transition = 'left 0.5s ease-in-out';
        }, 10);
    } else {
        active = active + 1;
        slider.style.left = -items[active].offsetLeft + 'px';
    }
    
    updateDots();
    resetInterval();
}

prev.onclick = function() {
    if (active === 0) {
        // Nếu đang ở item đầu, tắt transition và nhảy ngay về item cuối
        slider.style.transition = 'none';
        active = lengthItems;
        slider.style.left = -items[active].offsetLeft + 'px';
        
        // Kích hoạt lại transition sau khi nhảy
        setTimeout(() => {
            slider.style.transition = 'left 0.5s ease-in-out';
        }, 10);
    } else {
        active = active - 1;
        slider.style.left = -items[active].offsetLeft + 'px';
    }
    
    updateDots();
    resetInterval();
}

let refreshInterval = setInterval(() => {next.click()}, 3000);

function updateDots() {
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');
}

function resetInterval() {
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {next.click()}, 3000);
}

dots.forEach((li, key) => {
    li.addEventListener('click', () => {
        active = key;
        slider.style.left = -items[active].offsetLeft + 'px';
        updateDots();
        resetInterval();
    })
});

window.onresize = function(event) {
    // Tạm thời tắt transition khi resize
    slider.style.transition = 'none';
    slider.style.left = -items[active].offsetLeft + 'px';
    
    // Kích hoạt lại transition sau khi resize xong
    setTimeout(() => {
        slider.style.transition = 'left 0.5s ease-in-out';
    }, 10);
};
