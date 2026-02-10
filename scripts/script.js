var selectorButton = document.getElementById("weapon-selector-button");
var selectorModal = document.getElementById("weapon-selector-wrapper");
var currentWeapon = document.getElementById("current-weapon");
var appInfo = document.getElementById("app-info");

var hoveredWeaponName = document.getElementById("hovered-weapon-name");
var hoveredWeaponDamage = document.getElementById("damage");
var hoveredWeaponFireRate = document.getElementById("fire-rate");
var hoveredWeaponAccuracy = document.getElementById("accuracy");
var hoveredWeaponRange = document.getElementById("range");

var isViewingDetails = false;

function showMainMenu() {
    selectorModal.classList.add("active");
    appInfo.classList.add("active");
    currentWeapon.style.filter = "blur(5px)";
    isViewingDetails = false;
    selectorButton.textContent = "Back To Menu";
}

function showDetails() {
    selectorModal.classList.remove("active");
    appInfo.classList.remove("active");
    currentWeapon.style.filter = "none";
    isViewingDetails = true;
    selectorButton.textContent = "Back To Menu";
}

showMainMenu();

selectorButton.addEventListener("click", function() {
    if (isViewingDetails) {
        showMainMenu();
    }
});

document.addEventListener('click', function(event) {
    if (isViewingDetails && 
        !currentWeapon.contains(event.target) && 
        event.target !== selectorButton &&
        !selectorModal.contains(event.target)) {
        showMainMenu();
    }
});

selectorModal.addEventListener('click', function(event) {
    if (!isViewingDetails && 
        !event.target.closest('svg') && 
        !event.target.closest('#weapon-properties')) {
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && isViewingDetails) {
        showMainMenu();
    }
});

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
    
    showDetails();
    
    currentWeapon.scrollTop = 0;
}

window.addEventListener('load', function() {
    history.replaceState({}, '', window.location.pathname);
});

var svgElement = document.querySelector('#weapon-selector-wrapper svg');
if (svgElement) {
    svgElement.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

var weaponProperties = document.getElementById('weapon-properties');
if (weaponProperties) {
    weaponProperties.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

var weaponElements = document.querySelectorAll('g[data-weapon]');
weaponElements.forEach(function(element) {
    element.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});
