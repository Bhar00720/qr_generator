import re

with open('d:/my projects/tools/qr_generator/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update <title>
content = re.sub(r'<title>.*?</title>', '<title>Free QR Code Generator — No Sign Up, Instant High-Res Download</title>', content)

# 2. Update <meta name="description">
content = re.sub(
    r'<meta name="description" content="[^"]*">',
    '<meta name="description" content="Create free, permanent QR codes for URLs, Wi-Fi, text, and contacts without signing up. Download high-resolution PNG and SVG QR codes instantly.">',
    content
)

# 3. Add <meta name="keywords">
if 'name="keywords"' not in content:
    keywords = '<meta name="keywords" content="free qr code generator no sign up, permanent qr code generator free, instant qr code maker for wifi and url, download high resolution qr code png">'
    content = re.sub(
        r'(<meta name="description" content=".*?">)',
        r'\1\n    ' + keywords,
        content
    )

# 4. Update <h1>
content = re.sub(
    r'<h1>.*?</h1>',
    '<h1>Free QR Code Generator — No Sign Up, Instant High-Res Download</h1>',
    content
)

# 6. Add cross-linking footer
footer_html = """
    <!-- Cross-Linking Footer -->
    <div class="card cross-link-footer" style="text-align: center; margin-top: 40px; padding: 20px;">
        <p style="margin: 0;"><strong>More Free Tools:</strong> 
            <a href="https://calculator.corelumetech.in/" style="color: #a5b4fc; text-decoration: none; margin: 0 10px; font-weight: 500;">Calculator</a> | 
            <a href="https://color-generator.corelumetech.in/" style="color: #a5b4fc; text-decoration: none; margin: 0 10px; font-weight: 500;">Color Generator</a> | 
            <a href="https://dev-tools.corelumetech.in/" style="color: #a5b4fc; text-decoration: none; margin: 0 10px; font-weight: 500;">Dev Tools</a> | 
            <a href="https://password-generator.corelumetech.in/" style="color: #a5b4fc; text-decoration: none; margin: 0 10px; font-weight: 500;">Password Generator</a> | 
            <a href="https://qr-generator.corelumetech.in/" style="color: #a5b4fc; text-decoration: none; margin: 0 10px; font-weight: 500;">QR Generator</a> | 
            <a href="https://text-tools.corelumetech.in/" style="color: #a5b4fc; text-decoration: none; margin: 0 10px; font-weight: 500;">Text Tools</a>
        </p>
    </div>
"""

content = content.replace('    </div>\n    <script src="script.js"></script>', footer_html + '    </div>\n    <script src="script.js"></script>')

with open('d:/my projects/tools/qr_generator/index.html', 'w', encoding='utf-8') as f:
    f.write(content)
