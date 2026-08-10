document.addEventListener('DOMContentLoaded', () => {
    const qrType = document.getElementById('qr-type');
    const typeInputs = document.querySelectorAll('.type-inputs');
    const colorDark = document.getElementById('color-dark');
    const colorLight = document.getElementById('color-light');
    const btnGenerate = document.getElementById('btn-generate');
    const btnDownload = document.getElementById('btn-download');
    const qrcodeContainer = document.getElementById('qrcode');
    
    // Switch input types
    qrType.addEventListener('change', (e) => {
        typeInputs.forEach(el => el.classList.remove('active'));
        document.getElementById(`inputs-${e.target.value}`).classList.add('active');
    });

    function getQRText() {
        const type = qrType.value;
        if (type === 'url') {
            return document.getElementById('qr-text').value.trim();
        }
        if (type === 'wifi') {
            const ssid = document.getElementById('wifi-ssid').value;
            const pass = document.getElementById('wifi-password').value;
            const enc = document.getElementById('wifi-encryption').value;
            const hidden = document.getElementById('wifi-hidden').checked ? 'true' : 'false';
            if(!ssid) return '';
            return `WIFI:S:${ssid};T:${enc};P:${pass};H:${hidden};;`;
        }
        if (type === 'vcard') {
            const fn = document.getElementById('vcard-fname').value;
            const ln = document.getElementById('vcard-lname').value;
            const phone = document.getElementById('vcard-phone').value;
            const email = document.getElementById('vcard-email').value;
            const company = document.getElementById('vcard-company').value;
            if(!fn && !phone) return '';
            return `BEGIN:VCARD\nVERSION:3.0\nN:${ln};${fn};;;\nFN:${fn} ${ln}\nORG:${company}\nTEL;TYPE=CELL:${phone}\nEMAIL:${email}\nEND:VCARD`;
        }
        if (type === 'email') {
            const to = document.getElementById('email-to').value;
            const sub = document.getElementById('email-sub').value;
            const msg = document.getElementById('email-msg').value;
            if(!to) return '';
            return `MATMSG:TO:${to};SUB:${sub};BODY:${msg};;`;
        }
        if (type === 'sms') {
            const phone = document.getElementById('sms-phone').value;
            const msg = document.getElementById('sms-msg').value;
            if(!phone) return '';
            return `SMSTO:${phone}:${msg}`;
        }
        return '';
    }

    btnGenerate.addEventListener('click', () => {
        const text = getQRText();
        
        if (!text) {
            alert('Please fill out the required fields to generate a QR code.');
            return;
        }

        // Clear previous QR code
        qrcodeContainer.innerHTML = '';
        
        // Generate new QR code
        new QRCode(qrcodeContainer, {
            text: text,
            width: 256,
            height: 256,
            colorDark: colorDark.value,
            colorLight: colorLight.value,
            correctLevel: QRCode.CorrectLevel.H
        });

        // Enable download button
        setTimeout(() => {
            btnDownload.disabled = false;
        }, 100);
    });

    btnDownload.addEventListener('click', () => {
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
        
        const a = document.createElement('a');
        a.href = imgData;
        a.download = 'qrcode.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    // Batch Generation
    const btnBatchGenerate = document.getElementById('btn-batch-generate');
    const batchResults = document.getElementById('batch-results');

    btnBatchGenerate.addEventListener('click', () => {
        const text = document.getElementById('batch-text').value.trim();
        batchResults.innerHTML = '';
        if (!text) {
            alert('Please enter at least one string.');
            return;
        }
        
        const lines = text.split('\n');
        lines.forEach((line, index) => {
            line = line.trim();
            if (line) {
                const wrap = document.createElement('div');
                wrap.className = 'qr-batch-item card';
                wrap.style.padding = '15px';
                
                const qrDiv = document.createElement('div');
                qrDiv.className = 'qr-container';
                qrDiv.style.width = '150px';
                qrDiv.style.height = '150px';
                
                new QRCode(qrDiv, {
                    text: line,
                    width: 150,
                    height: 150,
                    colorDark: colorDark.value,
                    colorLight: colorLight.value,
                    correctLevel: QRCode.CorrectLevel.H
                });
                
                const label = document.createElement('p');
                label.textContent = line.substring(0, 20) + (line.length > 20 ? '...' : '');
                label.style.marginTop = '10px';
                label.style.fontSize = '0.8rem';
                label.style.wordBreak = 'break-all';
                label.style.color = 'var(--text-secondary)';
                
                const dBtn = document.createElement('button');
                dBtn.className = 'btn-secondary';
                dBtn.style.padding = '5px';
                dBtn.style.marginTop = '10px';
                dBtn.innerHTML = '<i class="fa-solid fa-download"></i>';
                dBtn.onclick = () => {
                    const c = qrDiv.querySelector('canvas');
                    const i = qrDiv.querySelector('img');
                    let d = '';
                    if (i && i.src && i.src.indexOf('data:image') === 0) d = i.src;
                    else if (c) d = c.toDataURL("image/png");
                    if (d) {
                        const a = document.createElement('a');
                        a.href = d;
                        a.download = `qrcode_batch_${index+1}.png`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }
                };

                wrap.appendChild(qrDiv);
                wrap.appendChild(label);
                wrap.appendChild(dBtn);
                batchResults.appendChild(wrap);
            }
        });
    });
});
