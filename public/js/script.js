// Xử lý thông báo tự động ẩn sau 5 giây
document.addEventListener('DOMContentLoaded', function() {
    // Ẩn thông báo sau 5 giây
    setTimeout(function() {
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(function(alert) {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        });
    }, 5000);
    
    // Xử lý form xác nhận trước khi xóa
    const deleteForms = document.querySelectorAll('form[action*="delete"], form[action*="DELETE"]');
    deleteForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            if (!confirm('Bạn có chắc chắn muốn xóa?')) {
                e.preventDefault();
            }
        });
    });
});