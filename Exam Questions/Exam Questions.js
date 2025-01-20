// Drag and Drop Logic
const dropZone = document.getElementById('dropZone');
const draggables = document.querySelectorAll('.drag-item');
const timerElement = document.getElementById('time');

// إضافة مستمعي الأحداث للعناصر القابلة للسحب
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', draggable.textContent);
        e.dataTransfer.setData('id', draggable.id); // حفظ معرف العنصر
    });
});

// منع السلوك الافتراضي لمنطقة الإفلات
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.backgroundColor = '#e0e0e0';
});

// إعادة لون منطقة الإفلات عند مغادرة السحب
dropZone.addEventListener('dragleave', () => {
    dropZone.style.backgroundColor = '#fff';
});

// التعامل مع حدث الإفلات
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const id = e.dataTransfer.getData('id'); // الحصول على معرف العنصر

    // إخفاء النص "Drag the answer here"
    const dropText = document.getElementById('dropText');
    dropText.style.display = 'none'; // إخفاء النص

    // إذا كان هناك عنصر موجود في منطقة الإفلات، نعيده إلى موضعه الأصلي
    if (dropZone.children.length > 1 && dropZone.children[1].classList.contains('dropped-item')) {
        const oldItem = dropZone.children[1];
        const oldId = oldItem.dataset.id;
        const originalElement = document.getElementById(oldId);
        originalElement.style.display = 'inline-block'; // إظهار العنصر القديم
        dropZone.removeChild(oldItem); // إزالة العنصر القديم من منطقة الإفلات
    }

    // إنشاء عنصر جديد في منطقة الإفلات
    const newItem = document.createElement('div');
    newItem.className = 'dropped-item';
    newItem.textContent = data;
    newItem.setAttribute('data-id', id);
    newItem.setAttribute('draggable', 'true');

    // إضافة العنصر الجديد إلى منطقة الإفلات
    dropZone.appendChild(newItem);

    // إخفاء العنصر الأصلي
    const originalElement = document.getElementById(id);
    originalElement.style.display = 'none';

    // إعادة العنصر إلى موضعه الأصلي عند سحبه من منطقة الإفلات
    newItem.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', newItem.textContent);
        e.dataTransfer.setData('id', newItem.dataset.id); // حفظ معرف العنصر
    });

    newItem.addEventListener('dragend', () => {
        newItem.remove(); // إزالة العنصر من منطقة الإفلات
        const originalElement = document.getElementById(id);
        originalElement.style.display = 'inline-block'; // إظهار العنصر الأصلي
        dropText.style.display = 'inline'; // إعادة عرض النص
    });
});

// Timer Logic
let timeLeft = 3600; // 30 minutes in seconds

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // تغيير اللون إلى الأحمر عند 10 دقائق أو أقل
    if (timeLeft <= 600) {
        timerElement.style.color = 'red';
    }

    // إرسال الإجابات تلقائيًا عند انتهاء الوقت
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        submitExam();
        window.close(); // إغلاق الصفحة تلقائيًا
    }

    timeLeft--;
};

const timerInterval = setInterval(updateTimer, 1000);

// Submit Exam Logic
function submitExam() {
    alert('Exam submitted successfully!');
    // يمكنك هنا إضافة منطق لإرسال الإجابات إلى الخادم
}



