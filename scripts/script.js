var selectorButton = document.getElementById("weapon-selector-button");
var selectorModal = document.getElementById("weapon-selector-wrapper");
var currentWeapon = document.getElementById("current-weapon");
var appInfo = document.getElementById("app-info");

var hoveredWeaponName = document.getElementById("hovered-weapon-name");
var hoveredWeaponDamage = document.getElementById("damage");
var hoveredWeaponFireRate = document.getElementById("fire-rate");
var hoveredWeaponAccuracy = document.getElementById("accuracy");
var hoveredWeaponRange = document.getElementById("range");

// State untuk melacak apakah sedang melihat detail atau menu
var isViewingDetails = false;

// Fungsi untuk menampilkan menu lingkaran (halaman utama)
function showMainMenu() {
    // Tampilkan menu lingkaran
    selectorModal.classList.add("active");
    // Tampilkan gambar logo
    appInfo.classList.add("active");
    // Buramkan konten detail di belakang
    currentWeapon.style.filter = "blur(5px)";
	currentWeapon.style.opacity = "0.0";
    
    isViewingDetails = false;
    selectorButton.textContent = "Back To Menu";
}

// Fungsi untuk menampilkan detail mod (tutup menu)
function showDetails() {
    // Sembunyikan menu lingkaran
    selectorModal.classList.remove("active");
    // Sembunyikan gambar logo
    appInfo.classList.remove("active");
    // Hapus efek blur
    currentWeapon.style.filter = "none";
	currentWeapon.style.opacity = "1.0";
    
    isViewingDetails = true;
    selectorButton.textContent = "Back To Menu";
}

// Inisialisasi - tampilkan menu lingkaran di awal
showMainMenu();

// Event listener untuk tombol Back/Menu
selectorButton.addEventListener("click", function() {
    if (isViewingDetails) {
        // Jika sedang melihat detail, kembali ke menu
        showMainMenu();
    }
});

// Event listener untuk klik di luar kotak detail (kembali ke menu)
document.addEventListener('click', function(event) {
    // Jika sedang melihat detail DAN klik di luar area current-weapon
    if (isViewingDetails && 
        !currentWeapon.contains(event.target) && 
        event.target !== selectorButton &&
        !selectorModal.contains(event.target)) {
        showMainMenu();
    }
});

// Event listener untuk klik di backdrop menu (di luar SVG)
selectorModal.addEventListener('click', function(event) {
    // Jika sedang di menu utama DAN klik di area backdrop (bukan di SVG atau properties)
    if (!isViewingDetails && 
        !event.target.closest('svg') && 
        !event.target.closest('#weapon-properties')) {
        // Tidak melakukan apa-apa atau bisa menampilkan pesan
        console.log("Klik di backdrop menu");
    }
});

// Event listener untuk tombol Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && isViewingDetails) {
        showMainMenu();
    }
});

// Event listener untuk browser back button
window.addEventListener('popstate', function(event) {
    if (isViewingDetails) {
        showMainMenu();
    }
});

function mouseoverWeapon(element) {
    hoveredWeaponName.textContent = element.dataset.weapon;
    hoveredWeaponDamage.style.width = element.dataset.damage;
    hoveredWeaponFireRate.style.width = element.dataset.fireRate;
    hoveredWeaponAccuracy.style.width = element.dataset.accuracy;
    hoveredWeaponRange.style.width = element.dataset.range;
}

function onmouseoutWeapon() {
    hoveredWeaponName.textContent = "Select Weapon";
    hoveredWeaponDamage.style.width = "0%";
    hoveredWeaponFireRate.style.width = "0%";
    hoveredWeaponAccuracy.style.width = "0%";
    hoveredWeaponRange.style.width = "0%";
}

function changeCurrentWeaponWith(element) {
    var currentWeaponName = document.getElementById('current-weapon-name');
    var currentWeaponDetails = document.getElementById('current-weapon-details');
    
    var activeWeapon = document.getElementsByClassName('active-weapon')[0];
    
    if (activeWeapon) {
        activeWeapon.classList.remove('active-weapon');
    }
    
    currentWeaponName.innerHTML = element.dataset.weapon;
    currentWeaponDetails.innerHTML = document.getElementById(element.dataset.details).innerHTML;
    
    element.classList.add("active-weapon");
    
    // Tampilkan detail dan sembunyikan menu
    showDetails();
    
    currentWeapon.scrollTop = 0;
    
    // Update URL
    //updateURLState(true);
}

// Handle initial state dari URL
window.addEventListener('load', function() {
    // Reset URL ke state awal
    history.replaceState({}, '', window.location.pathname);
});

// Cegah event bubbling dari SVG ke backdrop
var svgElement = document.querySelector('#weapon-selector-wrapper svg');
if (svgElement) {
    svgElement.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

// Cegah event bubbling dari weapon properties
var weaponProperties = document.getElementById('weapon-properties');
if (weaponProperties) {
    weaponProperties.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

// Cegah event bubbling dari elemen g di SVG
var weaponElements = document.querySelectorAll('g[data-weapon]');
weaponElements.forEach(function(element) {
    element.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});
