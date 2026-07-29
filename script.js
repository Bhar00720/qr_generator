document.addEventListener('DOMContentLoaded', () => {
    const qrText = document.getElementById('qr-text');
    const colorDark = document.getElementById('color-dark');
    const colorLight = document.getElementById('color-light');
    const btnGenerate = document.getElementById('btn-generate');
    const btnDownload = document.getElementById('btn-download');
    const qrcodeContainer = document.getElementById('qrcode');
    
    let qrCode = null;

    btnGenerate.addEventListener('click', () => {
        const text = qrText.value.trim();
        
        if (!text) {
            alert('Please enter a URL or text to generate a QR code.');
            return;
        }

        // Clear previous QR code
        qrcodeContainer.innerHTML = '';
        
        // Generate new QR code
        qrCode = new QRCode(qrcodeContainer, {
            text: text,
            width: 256,
            height: 256,
            colorDark: colorDark.value,
            colorLight: colorLight.value,
            correctLevel: QRCode.CorrectLevel.H
        });

        // Enable download button
        // Wait a slight moment for the image/canvas to be created by the library
        setTimeout(() => {
            btnDownload.disabled = false;
        }, 100);
    });

    btnDownload.addEventListener('click', () => {
        // The qrcode.js library generates a canvas and an img tag
        const img = qrcodeContainer.querySelector('img');
        const canvas = qrcodeContainer.querySelector('canvas');
        
        let imgData;
        if (img && img.src && img.src.indexOf('data:image') === 0) {
            imgData = img.src;
        } else if (canvas) {
            imgData = canvas.toDataURL("image/png");
        } else {
            alert('QR code not found. Please generate it again.');
            return;
        }
        
        // Create a temporary link to download
        const a = document.createElement('a');
        a.href = imgData;
        a.download = 'qrcode.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});
