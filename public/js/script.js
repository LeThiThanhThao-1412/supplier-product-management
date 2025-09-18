// Khởi tạo tất cả dropdowns khi trang load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded, initializing dropdowns...');
    
    // Khởi tạo dropdowns
    var dropdownTriggers = document.querySelectorAll('.dropdown-toggle');
    dropdownTriggers.forEach(function(dropdownTrigger) {
        console.log('Found dropdown trigger:', dropdownTrigger);
        
        dropdownTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            var dropdownMenu = this.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                dropdownMenu.classList.toggle('show');
                this.setAttribute('aria-expanded', 
                    this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
            }
        });
    });

    // Đóng dropdown khi click ra ngoài
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            var openDropdowns = document.querySelectorAll('.dropdown-menu.show');
            openDropdowns.forEach(function(dropdown) {
                dropdown.classList.remove('show');
            });
            var triggers = document.querySelectorAll('.dropdown-toggle[aria-expanded="true"]');
            triggers.forEach(function(trigger) {
                trigger.setAttribute('aria-expanded', 'false');
            });
        }
    });

    // Xử lý thông báo tự động ẩn
    setTimeout(function() {
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(function(alert) {
            if (alert.classList.contains('show')) {
                alert.classList.remove('show');
                alert.style.display = 'none';
            }
        });
    }, 5000);

    // Xử lý form xác nhận xóa
    const deleteForms = document.querySelectorAll('form[action*="delete"]');
    deleteForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            if (!confirm('Bạn có chắc chắn muốn xóa?')) {
                e.preventDefault();
            }
        });
    });
});