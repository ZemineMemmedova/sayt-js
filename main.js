document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('currency-btn');
    const menu = document.getElementById('currency-menu');
    const arrow = document.getElementById('dropdown-arrow');

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180'); 
    });

    // Menyu kənarına kliklədikdə bağlansın
    window.addEventListener('click', () => {
        menu.classList.add('hidden');
        arrow.classList.remove('rotate-180');
    });
});


const menuData = {
    'fin-conditions': {
        type: 'triple',
        title: "Финансовое обеспечение холдинга",
        imgLeft: "img/5.png", 
        imgRight: "img/12.png", 
        links: ["Доступ в старый личный кабинет", "Отчет агента", "Условия оплаты", "Заявления на возврат и перенос", "Архив курсов валют", "Обработка персональных данных", "Способы оплаты"]
    },
    'training': {
        type: 'cards-list',
       
        items: [{ title: "Мероприятия", img: "img/1.png"  }, { title: "Рекламные туры", img: "img/2.png" }],
        links: ["Вебинары", "Тревел-школа SEQUOIA", "ТрЭволюция", "День «Русского Экспресса»"]
    },
    'privileges': {
        type: 'pure-cards',
        items: [{ title: "Бонусная программа", img: "img/6.png" }, { title: "Акции", img: "img/7.png" }]
    },
    'projects': {
        type: 'pure-card',
        items: [
            { title: "Премия «Маэстро путешествий»", img: "img/8.png", red: true },
            { title: "Партнеры «Русского Экспресса»", img: "img/10.png" },
            { title: "Мерч R-SHOP", img: "img/9.png" }
        ]
    },
    'media': {
        type: 'list-only',
        links: ["Новости", "Пресс-центр", "Социальные сети", "Подписка на рассылку"]
    },
    'company': {
        type: 'pure-cardd',
        items: [{ title: "История холдинга", img: "img/3.png" }, { title: "Карьера", img: "img/4.png" }]
    }
};

const navLinks = document.querySelectorAll('.nav-link');
const megaMenu = document.getElementById('mega-menu');
const menuContent = document.getElementById('menu-content');
let hideTimeout;

navLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        clearTimeout(hideTimeout);
        const key = e.target.getAttribute('data-menu');
        const data = menuData[key];
        if (data) renderMenu(data, e.target);
    });
    link.addEventListener('mouseleave', hideMenu);
});

megaMenu.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
megaMenu.addEventListener('mouseleave', hideMenu);

function renderMenu(data, target) {
    let html = '';

    // --- TRIPLE TİPİ (FİN. ŞƏRTLƏR ÜÇÜN İKİ ŞƏKİLLİ) ---
   if (data.type === 'triple') {
    html = `
        <div class="w-[220px] h-[330px] bg-[#eb1901]  rounded-l-[32px] flex flex-col justify-between overflow-hidden relative group cursor-pointer">
            <h3 class="text-[17px] p-2 font-bold leading-tight text-white relative">
                ${data.title}
            </h3>
            
            <div class="relative flex justify-end items-end">
                <img src="${data.imgLeft}" 
                     class="w-[120%] h-[120%] object-cover opacity-90 z-10" 
                     alt="docs">
            </div>
        </div>

        <div class="w-[300px] p-2 bg-white flex flex-col justify-center">
            <ul class="space-y-2 text-[14px] font-semibold text-gray-700">
                ${data.links.map(l => `
                    <li class="px-4 py-1.5 rounded-lg transition-all duration-200 
                               hover:bg-gray-100 cursor-pointer">
                        ${l}
                    </li>
                `).join('')}
            </ul>
        </div>

        <div class="w-[240px] p-3 bg-gray-50 flex items-center justify-center rounded-r-[32px] border-l border-gray-100">
            <div class="relative w-full h-full overflow-hidden rounded-[24px] bg-[#410000] group">
                <img src="${data.imgRight}" 
                     class="w-full h-full  object-cover opacity-95" 
                     alt="promo">
            </div>
        </div>`;
}

    // --- DİGƏR TİPLƏR ---
   else if (data.type === 'cards-list') {
    html = `
        <div class="flex p-1 gap-2 bg-[#f8f9fa]/50"> 
            ${data.items.map(item => `
                <div class="w-[200px] min-h-[220px] bg-white border border-gray-50 rounded-[32px] p-6 flex flex-col items-start shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 group cursor-pointer bg-gray-100">
                    <span class="font-bold text-[16px] text-[#2d2e2f] mb-4 leading-tight group-hover:text-[#eb1901] transition-colors">
                        ${item.title}
                    </span>
                    
                    <div class="w-full flex justify-center items-center mt-auto py-2">
                        <img src="${item.img}" 
                             class="w-[120px] h-[120px] object-contain 
                                    drop-shadow-[0_15px_15px_rgba(0,0,0,0.1)]
                                    " 
                             alt="${item.title}">
                    </div>
                </div>
            `).join('')}

            <div class="flex flex-col justify-center min-w-[220px] px-8 py-4 bg-white rounded-[32px] ml-2">
                <ul class="space-y-5">
                    ${data.links.map(l => `
                        <li class="text-[15px] font-semibold text-gray-700 hover:text-[#eb1901] cursor-pointer transition-colors flex items-center group/link">
                            <span class="opacity-0 group-hover/link:opacity-100 transition-opacity mr-2 text-[#eb1901]">•</span>
                            ${l}
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>`;
}
    else if (data.type === 'pure-cards') {
    html = `
        <div class="flex p-2 gap-4 bg-[#f8f9fa]/40 rounded-[32px]">
            ${data.items.map(item => `
                <div class="relative w-[200px] h-[180px] overflow-hidden rounded-[32px] p-6 flex flex-col items-start transition-all duration-500 group cursor-pointer hover:bg-gray-100
                    ${item.red 
                        ? 'bg-[#eb1901] text-white shadow-[0_15px_35px_rgba(235,25,1,0.25)]' 
                        : 'bg-white text-[#2d2e2f] border border-gray-50 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]'}">
                    
                    <span class="relative z-10 font-bold text-[17px] leading-[1.2] max-w-[140px]">
                        ${item.title}
                    </span>
                    
                    <div class="absolute bottom-[-10px] right-[-10px] w-[160px] h-[160px] flex justify-end items-end transition-all duration-500 ">
                        <img src="${item.img}" 
                             class="w-[200px] h-[200px] object-contain 
                                    ${item.red ? 'brightness-110 contrast-110' : 'drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]'}" 
                             alt="${item.title}">
                    </div>

                    ${item.red ? '<div class="absolute top-6 right-6 opacity-20 w-8 h-8 border-2 border-white rounded-full"></div>' : ''}
                </div>
            `).join('')}
        </div>`;
}
else if (data.type === 'pure-card') {
    html = `
        <div class="flex p-3 gap-4 bg-[#f2f4f7]/50 rounded-[35px] "> 
            ${data.items.map(item => `
                <div class="relative w-[200px] h-[200px] rounded-[35px] p-6 flex flex-col overflow-hidden transition-all duration-500 group cursor-pointer 
                    ${item.red 
                        ? 'bg-[#eb1901] text-white shadow-lg' 
                        : 'bg-white text-[#2d2e2f] border border-gray-100 shadow-sm'}">
                    
                    <span class="relative z-10 font-bold text-[15px] leading-tight ">
                        ${item.title}
                    </span>
                    
                    <div class="absolute bottom-[-10px] right-[-10px] w-[170px] h-[170px] flex justify-end items-end  duration-500 ">
                        <img src="${item.img}" 
                             class="max-w-none w-[110%] h-[110%] object-contain 
                                    ${item.red ? 'brightness-110' : 'drop-shadow-xl'}" 
                             alt="${item.title}">
                    </div>
                </div>
            `).join('')}
        </div>`;
}
    else if (data.type === 'list-only') {
        html = `<div class="w-[280px] p-8 bg-white"><ul class="space-y-5 text-[15px]  font-medium text-gray-700">${data.links.map(l => `<li class="hover:text-[#eb1901] cursor-pointer">${l}</li>`).join('')}</ul></div>`;
    }

    else if (data.type === 'pure-cardd') {
    html = `
        <div class="flex p-2 gap-4 bg-[#f8f9fa]/40 rounded-[32px]">
            ${data.items.map(item => `
                <div class="relative w-[200px] h-[180px] overflow-hidden rounded-[32px] p-6 flex flex-col items-start transition-all duration-500 group cursor-pointer hover:bg-gray-100
                    ${item.red 
                        ? 'bg-[#eb1901] text-white shadow-[0_15px_35px_rgba(235,25,1,0.25)]' 
                        : 'bg-white text-[#2d2e2f] border border-gray-50 shadow-[0_8px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]'}">
                    
                    <span class="relative z-10 font-bold text-[17px] leading-[1.2] max-w-[140px]">
                        ${item.title}
                    </span>
                    
                    <div class="absolute bottom-[-10px] right-[-10px] w-[160px] h-[160px] flex justify-end items-end ">
                        <img src="${item.img}" 
                             class="w-[200px] h-[200px] object-contain 
                                    ${item.red ? 'brightness-110 contrast-110' : 'drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]'}" 
                             alt="${item.title}">
                    </div>

                    ${item.red ? '<div class="absolute top-6 right-6 opacity-20 w-8 h-8 border-2 border-white rounded-full"></div>' : ''}
                </div>
            `).join('')}
        </div>`;
                    }

    menuContent.innerHTML = html;

    // --- MƏRKƏZLƏŞDİRMƏ ---
    megaMenu.classList.remove('hidden'); 
    const rect = target.getBoundingClientRect(); 
    const menuRect = megaMenu.getBoundingClientRect(); 
    
    let leftPos = rect.left + (rect.width / 2) - (menuRect.width / 2);
    
    if (leftPos < 20) leftPos = 20; 
    if (leftPos + menuRect.width > window.innerWidth) {
        leftPos = window.innerWidth - menuRect.width - 20;
    }

    megaMenu.style.left = `${leftPos}px`;
    megaMenu.style.top = `${rect.bottom + window.scrollY + 10}px`;

    megaMenu.classList.remove('pointer-events-none');
    setTimeout(() => megaMenu.classList.remove('opacity-0', '-translate-y-2'), 10);
}

function hideMenu() {
    hideTimeout = setTimeout(() => {
        megaMenu.classList.add('opacity-0', '-translate-y-2');
        setTimeout(() => megaMenu.classList.add('hidden', 'pointer-events-none'), 300);
    }, 200);
}




// section 3
let currentIndex = 0;
const slider = document.getElementById('slider');
const slides = Array.from(slider.children);
const dotsContainer = document.getElementById('dotsContainer');
const totalSlides = slides.length;

// Nöqtələri yarat
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `h-1.5 rounded-full bg-white/40 cursor-pointer transition-all duration-300 ${i === 0 ? 'w-8 bg-white' : 'w-3'}`;
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.children;

function updateSlider() {
    // Sürüşmə animasiyası
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Nöqtələrin vəziyyətini yenilə
    Array.from(dots).forEach((dot, i) => {
        if (i === currentIndex) {
            dot.className = 'h-1.5 w-8 rounded-full bg-white transition-all duration-300';
        } else {
            dot.className = 'h-1.5 w-3 rounded-full bg-white/40 transition-all duration-300';
        }
    });

    // Video idarəçiliyi (aktiv slaydda video varsa oynat, yoxdursa digərlərini dayandır)
    slides.forEach((slide, i) => {
        const video = slide.querySelector('video');
        if (video) {
            if (i === currentIndex) {
                video.play();
            } else {
                video.pause();
                video.currentTime = 0;
            }
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

// 5 saniyəlik taymer
let autoSlide = setInterval(nextSlide, 5000);

// İstifadəçi klikləyəndə taymeri sıfırla
function resetTimer() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
}

// Düymələrə reset funksiyasını bağla
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', resetTimer);
});

// İlk yüklənmədə aktiv et
updateSlider();
   
//section car
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Şəkil Animasiyası ---
    const heroImg = document.getElementById('hero-img');
    let isZoomed = false;
    setInterval(() => {
        heroImg.style.transform = isZoomed ? 'scale(1)' : 'scale(1.15)';
        isZoomed = !isZoomed;
    }, 3500);

    // --- 2. Dropdownların İdarə Edilməsi ---
    const containers = document.querySelectorAll('.dropdown-container');

    containers.forEach(container => {
        const toggle = container.querySelector('.dropdown-toggle');
        const list = container.querySelector('.dropdown-list');
        const arrow = container.querySelector('.arrow');
        const selectedValue = container.querySelector('.selected-value');

        // Aç/Bağla
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Digər açıq dropdownları bağla (eyni anda ancaq biri açıq olsun)
            document.querySelectorAll('.dropdown-list').forEach(l => {
                if(l !== list) l.classList.add('hidden');
            });
            document.querySelectorAll('.arrow').forEach(a => {
                if(a !== arrow) a.classList.remove('rotate-180');
            });

            const isHidden = list.classList.toggle('hidden');
            arrow.classList.toggle('rotate-180', !isHidden);
        });

        // Seçim etmək
        list.querySelectorAll('div').forEach(item => {
            item.addEventListener('click', () => {
                selectedValue.innerText = item.innerText;
                list.classList.add('hidden');
                arrow.classList.remove('rotate-180');
            });
        });
    });

    // Kənara klikləyəndə hamısını bağla
    window.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-list').forEach(l => l.classList.add('hidden'));
        document.querySelectorAll('.arrow').forEach(a => a.classList.remove('rotate-180'));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('#card-slider-container');
    const cardTrack = document.querySelector('#card-slider-track');

    if (!cardContainer || !cardTrack) return;

    let isCardDragging = false;
    let cardStartPos;
    let cardCurrentTranslate;

    // Şəkillərin brauzer tərəfindən dartılmasını (ghost image) söndürürük
    const allImages = cardTrack.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    cardContainer.addEventListener('mousedown', (e) => {
        isCardDragging = true;
        cardContainer.classList.replace('cursor-grab', 'cursor-grabbing');
        
        cardStartPos = e.pageX - cardContainer.offsetLeft;
        
        const style = window.getComputedStyle(cardTrack);
        const matrix = new WebKitCSSMatrix(style.transform);
        cardCurrentTranslate = matrix.m41;
        
        cardTrack.style.transition = 'none';
    });

    const stopCardDragging = () => {
        if (!isCardDragging) return;
        isCardDragging = false;
        cardContainer.classList.replace('cursor-grabbing', 'cursor-grab');
        cardTrack.style.transition = 'transform 0.4s ease-out';
    };

    cardContainer.addEventListener('mouseleave', stopCardDragging);
    cardContainer.addEventListener('mouseup', stopCardDragging);

    cardContainer.addEventListener('mousemove', (e) => {
        if (!isCardDragging) return;
        e.preventDefault();
        
        const currentX = e.pageX - cardContainer.offsetLeft;
        const movement = (currentX - cardStartPos) * 1.5; // Həssaslıq amili
        let finalTranslate = cardCurrentTranslate + movement;

        // Dayanma nöqtələrini hesablamaq
        const maxScrollLimit = -(cardTrack.scrollWidth - cardContainer.offsetWidth + 150);
        
        if (finalTranslate > 0) finalTranslate = 0;
        if (finalTranslate < maxScrollLimit) finalTranslate = maxScrollLimit;

        cardTrack.style.transform = `translateX(${finalTranslate}px)`;
    });
});

        