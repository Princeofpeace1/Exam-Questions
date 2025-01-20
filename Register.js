document.addEventListener('DOMContentLoaded', function () {
 const btn_Login=document.getElementById('btn_Login');
 const btn_Register=document.getElementById('btn_Register');
    if(btn_Login){
    btn_Login.addEventListener('click',function(){
        window.location.href='Login.html';
    });}

    else{
    btn_Register.addEventListener('click',function(){
        window.location.href ='Register.html';
    });}
});

// Toggle the display of the dropdown menu when the profile icon is clicked
document.getElementById('btn').addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent the click event from bubbling up
    const dropdown = document.getElementById('card');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});


// Toggle the mobile menu and move content down
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');
    const menuBtnIcon = menuBtn.querySelector('i');

    // تحديد العناصر التي سيتم تحريكها
    const resultsSection = document.querySelector('.results'); // صفحة النتائج
    const profileSection = document.querySelector('.profile'); // صفحة البروفايل
    const examsSection = document.querySelector('.active-exams'); // صفحة الامتحانات النشطة

    menuBtn.addEventListener('click', function (event) {
        event.stopPropagation(); // منع انتشار الحدث
        menu.classList.toggle('open');
        const isOpen = menu.classList.contains('open');

        // تبديل أيقونة القائمة
        menuBtnIcon.setAttribute('class', isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars');

        // تحريك المحتوى لأسفل عند فتح القائمة
        if (isOpen) {
            if (resultsSection) resultsSection.classList.add('slide-down');
            if (profileSection) profileSection.classList.add('slide-down');
            if (examsSection) examsSection.classList.add('slide-down');
        } else {
            if (resultsSection) resultsSection.classList.remove('slide-down');
            if (profileSection) profileSection.classList.remove('slide-down');
            if (examsSection) examsSection.classList.remove('slide-down');
        }
    });

    // إغلاق القائمة وإرجاع المحتوى عند النقر خارجها
    document.addEventListener('click', function (event) {
        if (!menu.contains(event.target) && event.target !== menuBtn) {
            menu.classList.remove('open');
            menuBtnIcon.setAttribute('class', 'fa-solid fa-bars');
            if (resultsSection) resultsSection.classList.remove('slide-down');
            if (profileSection) profileSection.classList.remove('slide-down');
            if (examsSection) examsSection.classList.remove('slide-down');
        }
    });
});

function updateResult(button) {
    // الحصول على الصف الذي يحتوي على الزر
    const row = button.closest('tr');

    // الحصول على القيمة الجديدة للنتيجة (Score)
    const scoreElement = row.querySelector('.score');
    const newScore = prompt("Enter the new score:", scoreElement.textContent);
    if (newScore !== null) {
        scoreElement.textContent = newScore;
    }

    // الحصول على القيمة الجديدة للحالة (Status)
    const statusSelect = row.querySelector('.status-select');
    const newStatus = statusSelect.value;

    // تحديث النص واللون للحالة
    const statusElement = row.querySelector('.status');
    statusElement.textContent = newStatus === 'passed' ? 'Passed' : 'Failed';
    statusElement.className = `status ${newStatus}`;
}

// تمكين التعديل
function toggleEdit() {
    const editButton = document.querySelector('.edit-button');
    const saveButton = document.querySelector('.save-button');
    const cancelButton = document.querySelector('.cancel-button');
    const editableFields = document.querySelectorAll('.editable');
    const editInputs = document.querySelectorAll('.edit-input');

    // إظهار حقول الإدخال وإخفاء النصوص
    editableFields.forEach(field => field.style.display = 'none');
    editInputs.forEach(input => input.style.display = 'block');

    // إظهار أزرار Save و Cancel وإخفاء زر Edit
    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';
    cancelButton.style.display = 'inline-block';
}

// حفظ التغييرات
function saveChanges() {
    const editInputs = document.querySelectorAll('.edit-input');
    const editableFields = document.querySelectorAll('.editable');

    // تحديث النصوص بقيم حقول الإدخال
    editInputs.forEach(input => {
        const field = input.getAttribute('data-field');
        const editableField = document.querySelector(`.editable[data-field="${field}"]`);
        editableField.textContent = input.value;
    });

    // إعادة إظهار النصوص وإخفاء حقول الإدخال
    editableFields.forEach(field => field.style.display = 'block');
    editInputs.forEach(input => input.style.display = 'none');

    // إعادة إظهار زر Edit وإخفاء أزرار Save و Cancel
    document.querySelector('.edit-button').style.display = 'inline-block';
    document.querySelector('.save-button').style.display = 'none';
    document.querySelector('.cancel-button').style.display = 'none';

    alert('Changes saved successfully!');
}

// إلغاء التعديلات
function cancelEdit() {
    const editInputs = document.querySelectorAll('.edit-input');
    const editableFields = document.querySelectorAll('.editable');

    // إعادة إظهار النصوص وإخفاء حقول الإدخال
    editableFields.forEach(field => field.style.display = 'block');
    editInputs.forEach(input => input.style.display = 'none');

    // إعادة إظهار زر Edit وإخفاء أزرار Save و Cancel
    document.querySelector('.edit-button').style.display = 'inline-block';
    document.querySelector('.save-button').style.display = 'none';
    document.querySelector('.cancel-button').style.display = 'none';
}
