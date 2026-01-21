const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const imgPreview = document.getElementById('image-preview');
const downloadBtn = document.getElementById('download-btn');
const fileNameLabel = document.getElementById('file-name');
const canvas = document.getElementById('conversion-canvas');

// Trigger file input on click
dropZone.addEventListener('click', () => fileInput.click());

// Handle file selection
fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

// Drag and drop logic
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "#6366f1";
});

dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = "rgba(255, 255, 255, 0.2)";
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.avif')) {
        handleFile(file);
    } else {
        alert("Please upload a valid AVIF file.");
    }
});

function handleFile(file) {
    if (!file) return;

    fileNameLabel.innerText = file.name;
    const reader = new FileReader();

    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            // Setup canvas for conversion
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext(' those2d');
            
            // Draw image to canvas
            const context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);

            // Show UI
            imgPreview.src = e.target.result;
            previewContainer.classList.remove('hidden');
            dropZone.classList.add('hidden');
            
            // Setup Download
            downloadBtn.onclick = () => {
                const jpgUrl = canvas.toDataURL('image/jpeg', 0.9);
                const link = document.createElement('a');
                link.download = file.name.replace('.avif', '.jpg');
                link.href = jpgUrl;
                link.click();
            };
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}