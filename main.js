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

        items: [{ title: "Мероприятия", img: "img/1.png" }, { title: "Рекламные туры", img: "img/2.png" }],
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

// dropdown menyunun idarə olunması---------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    function initDropdown(inputId, menuId, clearId) {
        const input = document.getElementById(inputId);
        const menu = document.getElementById(menuId);
        const clearBtn = document.getElementById(clearId);

        if (!input || !menu || !clearBtn) return;


        input.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('ul[id^="menu"]').forEach(m => m.classList.add('hidden'));
            menu.classList.remove('hidden');
        });

        clearBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            input.value = '';
            input.focus();
        });

        // Menyudan seçim etmə
        menu.addEventListener('click', (e) => {
            const li = e.target.closest('li');
            if (li) {
                // data-val varsa onu götür (bayraqlı üçün), yoxdursa mətni götür
                input.value = li.getAttribute('data-val') || li.innerText.trim();
                menu.classList.add('hidden');
            }
        });
    }

    // Hər iki dropdown-u aktivləşdiririk
    initDropdown('input1', 'menu1', 'clear1');
    initDropdown('input2', 'menu2', 'clear2');

    // Səhifənin hər hansı boş yerinə klikləyəndə menyuları bağla
    document.addEventListener('click', () => {
        document.querySelectorAll('ul[id^="menu"]').forEach(m => m.classList.add('hidden'));
    });
});

//3 cu bölmənin dropdown menyusunun idarə olunması--------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const monthsNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    let currentStartMonth = new Date().getMonth();
    let year = new Date().getFullYear();
   

    let selectedStart = null;
    let selectedEnd = null;

    const panel = document.getElementById('calendarPanel');
    const input = document.getElementById('dateInput');
    const display = document.getElementById('dateValue');

    function renderCalendar() {
        renderMonth(currentStartMonth, 'monthTitle1', 'daysGrid1');
        renderMonth(currentStartMonth + 1, 'monthTitle2', 'daysGrid2');
    }

   function renderMonth(mIdx, titleId, gridId) {
    const grid = document.getElementById(gridId);
    const title = document.getElementById(titleId);
    
    // 1. Ay və ili mIdx-ə əsasən dəqiq tapaq
    const tempDate = new Date(year, mIdx, 1);
    const month = tempDate.getMonth();
    const currentYear = tempDate.getFullYear();
    
    title.innerText = `${monthsNames[month]} ${currentYear}`;

    // 2. {{{{{{Ayın neçə gün olduğunu tapaq}}}}}}
    const daysInMonth = new Date(currentYear, month + 1, 0).getDate();

    // 3. Ayın hansı gündən başladığını tap (0: Bazar, 1: Pn...)
    let firstDayIndex = new Date(currentYear, month, 1).getDay();
    firstDayIndex = (firstDayIndex === 0) ? 6 : firstDayIndex - 1; // Pn-ni 0-cı indeks edirik

    // Grid-i təmizlə və həftə günlərini yaz
    grid.innerHTML = `
        <div class="text-[10px] text-gray-400 font-bold uppercase py-2">Пн</div>
        <div class="text-[10px] text-gray-400 font-bold uppercase py-2">Вт</div>
        <div class="text-[10px] text-gray-400 font-bold uppercase py-2">Ср</div>
        <div class="text-[10px] text-gray-400 font-bold uppercase py-2">Чт</div>
        <div class="text-[10px] text-gray-400 font-bold uppercase py-2">Пт</div>
        <div class="text-[10px] text-gray-400 font-bold uppercase py-2">Сб</div>
        <div class="text-[10px] text-gray-400 font-bold uppercase py-2">Вс</div>
    `;

    // 4. Ayın 1-nə qədər olan boş xanaları əlavə et
    for (let x = 0; x < firstDayIndex; x++) {
        const emptyDiv = document.createElement('div');
        grid.appendChild(emptyDiv);
    }

    // 5. İndi isə tapdığımız "daysInMonth" qədər dövr quraq
    for (let i = 1; i <= daysInMonth; i++) { 
        const dayDiv = document.createElement('div');
        dayDiv.className = "h-9 w-9 flex items-center justify-center text-sm font-medium cursor-pointer rounded-full transition-all hover:bg-gray-100 m-auto";
        dayDiv.innerText = i;

        const fullDate = `${i}.${(month + 1).toString().padStart(2, '0')}.${currentYear}`;

        
        if (selectedStart === fullDate || selectedEnd === fullDate) {
            dayDiv.classList.add('bg-red-500', 'text-white');
        }

        dayDiv.onclick = (e) => {
            e.stopPropagation();
            if (!selectedStart || (selectedStart && selectedEnd)) {
                selectedStart = fullDate;
                selectedEnd = null;
            } else {
                selectedEnd = fullDate;
                display.innerText = `${selectedStart} - ${selectedEnd}`;
                panel.classList.add('hidden');
            }
            renderCalendar();
        };
        grid.appendChild(dayDiv);
    }
}

    // Düymələr
    document.getElementById('nextBtn').onclick = (e) => { e.stopPropagation(); currentStartMonth++; renderCalendar(); };
    document.getElementById('prevBtn').onclick = (e) => { e.stopPropagation(); currentStartMonth--; if (currentStartMonth <= currentIndex) return; renderCalendar(); };

    input.onclick = (e) => { e.stopPropagation(); panel.classList.toggle('hidden'); };
    window.onclick = () => panel.classList.add('hidden');

    renderCalendar();
    window.addEventListener('click', () => {
        panel.classList.add('hidden');
    });

});


//gunlerin secilmesi ucun dropdown menyunun idarə olunması----------------------------------------


document.addEventListener('DOMContentLoaded', () => {
    const nightInput = document.getElementById('nightInput');
    const nightPanel = document.getElementById('nightPanel');
    const nightGrid = document.getElementById('nightGrid');
    const nightValue = document.getElementById('nightValue');
    const nightArrow = document.getElementById('nightArrow');

    // Seçim vəziyyəti (State)
    let startNight = 15;
    let endNight = 18;
    let currentLimit = 31; // Təqvimdən gələn gün sayı (susmaya görə 31)

    // 1. Paneli render edən funksiya
    function renderNights(daysInMonth) {
        currentLimit = daysInMonth;
        nightGrid.innerHTML = '';

        for (let i = 1; i <= 30; i++) { // Grid həmişə 30-luq qalır, amma aktivlik dəyişir
            const box = document.createElement('div');
            box.innerText = i;

            // Əsas dizayn
            let classes = "h-10 w-10 flex items-center justify-center text-sm font-bold border border-gray-100 rounded-lg transition-all m-auto ";

            // Şəkildəki solğun günlər (Limitdən kənar və ya 21-dən yuxarı)
            if (i > currentLimit || i > 21) {
                classes += "text-gray-200 cursor-not-allowed bg-gray-50/50 ";
                box.className = classes;
            } else {
                classes += "cursor-pointer ";

                // Seçim rənglənməsi
                if (i === startNight || i === endNight) {
                    classes += "bg-red-500 text-white border-red-500 ";
                } else if (startNight && endNight && i > startNight && i < endNight) {
                    classes += "bg-red-500 text-white border-red-500 ";
                } else {
                    classes += "bg-white text-gray-800 hover:border-blue-400 ";
                }

                box.className = classes;
                box.onclick = (e) => {
                    e.stopPropagation();
                    handleSelection(i);
                };
            }
            nightGrid.appendChild(box);
        }
    }

    // 2. Seçim məntiqi 
    function handleSelection(val) {
        if (!startNight || (startNight && endNight)) {
            // Birinci rəqəmi seçir
            startNight = val;
            endNight = null;
        } else {
            // İkinci rəqəmi seçir
            if (val < startNight) {
                endNight = startNight;
                startNight = val;
            } else {
                endNight = val;
            }
            // İnputu yenilə
            nightValue.innerText = `${startNight}-${endNight}`;
        }
        renderNights(currentLimit);
    }

  
    nightInput.onclick = (e) => {
        e.stopPropagation();
        const isHidden = nightPanel.classList.toggle('hidden');
        nightArrow.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
    };

    // Kənara klikləyəndə bağla
    window.addEventListener('click', () => {
        nightPanel.classList.add('hidden');
        nightArrow.style.transform = 'rotate(0deg)';
    });

    renderNights(31);
    window.updateNightDays = (newDays) => {
        renderNights(newDays);
    };
});

//son dropdown menyunun idarə olunması----------------------------------------

let adults = 2;
let kids = 0;

// 2. Sayğacı dəyişən funksiya (Sənin HTML-də changeCount çağırılır)
window.changeCount = function (type, delta) {
    if (type === 'adults') {
        const nextAdults = adults + delta;

        if (nextAdults >= 1 && nextAdults + kids <= 9) {
            adults = nextAdults;

            document.getElementById('adultCount').innerText = adults;
        }
    }
    else if (type === 'kids') {
        const nextKids = kids + delta;

        if (nextKids >= 0 && adults + nextKids <= 9) {
            kids = nextKids;

            document.getElementById('kidCount').innerText = kids;

            renderKidsAges();
        }
    }

    // 3. Əsas inputdakı ümumi sayı yeniləyirik
    updateMainInput();
};

// Ümumi yazını (məs. "5 человека") yeniləyən funksiya
function updateMainInput() {
    const total = adults + kids;
    const touristValue = document.getElementById('touristValue');
    if (touristValue) {
        touristValue.innerText = total + " человека";
    }
}

// Uşaqlar üçün yaş seçimi bölməsini yaradan funksiya
function renderKidsAges() {
    const container = document.getElementById('kidsAgesList');
    if (!container) return;

    container.innerHTML = ''; // Köhnə siyahını silirik
    const ageOptions = ["До 2 лет", "2 года", "3 года", "4 года", "5 лет", "6 лет", "7 лет", "8 лет", "9 лет", "10 лет", "11 лет", "12 лет", "13 лет", "14 лет", "15 лет", "16 лет", "17 лет"];

    for (let i = 1; i <= kids; i++) {
        const row = document.createElement('div');
        row.className = "flex justify-between items-center py-2 border-b border-gray-50 last:border-0";
        row.innerHTML = `
            <span class="text-sm text-gray-600 font-medium">Ребёнок ${i}. Возраст</span>
            <div class="relative w-40">
                <select class="w-full bg-gray-50 border border-gray-100 rounded-xl p-2 text-sm font-bold text-gray-800 appearance-none cursor-pointer outline-none">
                    ${ageOptions.map(age => `<option>${age}</option>`).join('')}
                </select>
            </div>
        `;
        container.appendChild(row);
    }
}

// Panelin açılıb-bağlanması üçün sadə kod
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('touristInput');
    const panel = document.getElementById('touristPanel');

    if (input && panel) {
        input.onclick = (e) => {
            e.stopPropagation();
            panel.classList.toggle('hidden');
        };

        panel.onclick = (e) => e.stopPropagation();
    }

    window.onclick = () => {
        if (panel) panel.classList.add('hidden');
    };
});






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
                if (l !== list) l.classList.add('hidden');
            });
            document.querySelectorAll('.arrow').forEach(a => {
                if (a !== arrow) a.classList.remove('rotate-180');
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