// Toggle sidebar
const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const hamburgerBtn = document.querySelector('.hamburger-btn');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
});

// Mobile hamburger menu
hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && e.target !== hamburgerBtn) {
            sidebar.classList.remove('show');
        }
    }
});

// Toggle submenu
const submenuTogglers = document.querySelectorAll('.submenu-toggler');

submenuTogglers.forEach(toggler => {
    toggler.addEventListener('click', (e) => {
        e.stopPropagation();
        const menuItem = toggler.closest('.menu-item');
        const submenu = menuItem.nextElementSibling;
        
        // Close other submenus first
        document.querySelectorAll('.submenu').forEach(item => {
            if (item !== submenu) {
                item.classList.remove('show');
                const otherTogglers = document.querySelectorAll('.submenu-toggler');
                otherTogglers.forEach(other => {
                    if (other !== toggler) {
                        other.classList.remove('fa-chevron-up');
                        other.classList.add('fa-chevron-down');
                    }
                });
            }
        });

        // Toggle current submenu
        submenu.classList.toggle('show');
        toggler.classList.toggle('fa-chevron-up');
        toggler.classList.toggle('fa-chevron-down');
    });
});

// Close submenu when clicking elsewhere
document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-item.with-submenu')) {
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.classList.remove('show');
        });
        submenuTogglers.forEach(toggler => {
            toggler.classList.remove('fa-chevron-up');
            toggler.classList.add('fa-chevron-down');
        });
    }
});

// Handle form submission
const customForm = document.querySelector('.custom-project-form form');
if (customForm) {
    customForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const design = document.getElementById('design').value;
        const quantity = document.getElementById('quantity').value;
        
        const whatsappUrl = `https://wa.me/6281234567890?text=Halo,%20saya%20${encodeURIComponent(name)}%20ingin%20memesan%20kaos%20custom:%0A%0ADesain:%20${encodeURIComponent(design)}%0AJumlah:%20${encodeURIComponent(quantity)}%0A%0AKontak:%20${encodeURIComponent(phone)}`;
        
        window.open(whatsappUrl, '_blank');
    });
}

// Check screen size for responsive behavior
function checkScreenSize() {
    if (window.innerWidth <= 768) {
        hamburgerBtn.style.display = 'block';
        sidebar.classList.remove('collapsed');
        mainContent.classList.remove('expanded');
    } else {
        hamburgerBtn.style.display = 'none';
        sidebar.classList.remove('show');
    }
}

window.addEventListener('resize', checkScreenSize);
checkScreenSize();

// Active menu item
const menuItems = document.querySelectorAll('.menu-item:not(.with-submenu), .submenu-item');

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        menuItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // If this is a submenu item, also activate its parent
        if (this.classList.contains('submenu-item')) {
            const parentItem = this.closest('.submenu').previousElementSibling;
            parentItem.classList.add('active');
        }
        
        // Close sidebar on mobile after clicking
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('show');
        }
    });
});
