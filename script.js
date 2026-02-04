let currentStep = 1;
let websiteData = {
    title: '',
    theme: '',
    topbarColor: '',
    brandName: '',
    headline: '',
    description: ''
};

function updateStepIndicator(step) {
    const dots = document.querySelectorAll('.step-dot');
    dots.forEach((dot, index) => {
        if (index < step) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextStep(step) {
    // Validate current step
    if (currentStep === 1 && !document.getElementById('websiteTitle').value) {
        alert('Please enter a website title');
        return;
    }
    if (currentStep === 4 && !document.getElementById('brandName').value) {
        alert('Please enter a brand name');
        return;
    }
    if (currentStep === 5 && !document.getElementById('headline').value) {
        alert('Please enter a headline');
        return;
    }
    if (currentStep === 6 && !document.getElementById('description').value) {
        alert('Please enter a description');
        return;
    }

    // Save data
    if (currentStep === 1) websiteData.title = document.getElementById('websiteTitle').value;
    if (currentStep === 4) websiteData.brandName = document.getElementById('brandName').value;
    if (currentStep === 5) websiteData.headline = document.getElementById('headline').value;
    if (currentStep === 6) websiteData.description = document.getElementById('description').value;

    // Hide current step
    document.getElementById(`step${currentStep}`).style.display = 'none';
    
    // Show next step
    document.getElementById(`step${step}`).style.display = 'block';
    
    currentStep = step;
    updateStepIndicator(step);
}

function selectTheme(theme) {
    websiteData.theme = theme;
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.theme-btn').classList.add('selected');
    document.getElementById('themeNextBtn').disabled = false;
}

function selectColor(color) {
    websiteData.topbarColor = color;
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.color-btn').classList.add('selected');
    document.getElementById('colorNextBtn').disabled = false;
}

function getThemeGradient(theme) {
    const themes = {
        'gradient-blue': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-pink': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-black': 'linear-gradient(135deg, #2c3e50 0%, #000000 100%)',
        'full-white': '#ffffff',
        'gradient-green': 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        'gradient-yellow': 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
        'gradient-red': 'linear-gradient(135deg, #e52d27 0%, #b31217 100%)'
    };
    return themes[theme];
}

function getTopbarStyle(color) {
    const styles = {
        'white': { background: '#ffffff', color: '#000000', border: '1px solid #e0e0e0' },
        'black': { background: '#000000', color: '#ffffff', border: 'none' },
        'grey': { background: '#7f8c8d', color: '#ffffff', border: 'none' },
        'blue': { background: '#3498db', color: '#ffffff', border: 'none' },
        'red': { background: '#e74c3c', color: '#ffffff', border: 'none' },
    };
    return styles[color];
}

function generateWebsite() {
    websiteData.description = document.getElementById('description').value;

    const topbarStyle = getTopbarStyle(websiteData.topbarColor);
    const themeGradient = getThemeGradient(websiteData.theme);

    const previewHTML = `
        <div class="preview-topbar" style="background: ${topbarStyle.background}; color: ${topbarStyle.color}; ${topbarStyle.border ? 'border-bottom: ' + topbarStyle.border : ''}">
            ${websiteData.brandName}
        </div>
        <div class="preview-content" style="background: ${themeGradient}; color: ${websiteData.theme === 'gradient-blue' || websiteData.theme === 'gradient-pink' || websiteData.theme === 'gradient-black' ? '#ffffff' : '#000000'}">
            <h1 class="preview-headline">${websiteData.headline}</h1>
            <p class="preview-description">${websiteData.description}</p>
        </div>
    `;

    document.getElementById('previewContainer').innerHTML = previewHTML;
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('previewSection').classList.add('active');
}

function resetForm() {
    currentStep = 1;
    websiteData = {
        title: '',
        theme: '',
        topbarColor: '',
        brandName: '',
        headline: '',
        description: ''
    };

    document.getElementById('websiteTitle').value = '';
    document.getElementById('brandName').value = '';
    document.getElementById('headline').value = '';
    document.getElementById('description').value = '';

    document.querySelectorAll('.theme-btn, .color-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    document.getElementById('themeNextBtn').disabled = true;
    document.getElementById('colorNextBtn').disabled = true;

    document.querySelectorAll('.step-content').forEach(step => {
        step.style.display = 'none';
    });

    document.getElementById('step1').style.display = 'block';
    updateStepIndicator(1);

    document.getElementById('previewSection').classList.remove('active');
    document.getElementById('formSection').style.display = 'block';
}

function downloadWebsite() {
    const topbarStyle = getTopbarStyle(websiteData.topbarColor);
    const themeGradient = getThemeGradient(websiteData.theme);
    const textColor = websiteData.theme === 'gradient-blue' || websiteData.theme === 'gradient-pink' || websiteData.theme === 'gradient-black' ? '#ffffff' : '#000000';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteData.title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Times New Roman', serif;
        }
        
        .topbar {
            padding: 1.5rem 3rem;
            background: ${topbarStyle.background};
            color: ${topbarStyle.color};
            ${topbarStyle.border ? 'border-bottom: ' + topbarStyle.border + ';' : ''}
            font-size: 1.1rem;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        
        .content {
            min-height: calc(100vh - 60px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem 3rem;
            background: ${themeGradient};
            color: ${textColor};
        }
        
        .headline {
            font-size: 3.5rem;
            font-weight: 400;
            margin-bottom: 2rem;
            letter-spacing: -1px;
            text-align: center;
        }
        
        .description {
            font-size: 1.15rem;
            max-width: 700px;
            line-height: 1.8;
            text-align: center;
            opacity: 0.9;
        }

        @media (max-width: 768px) {
            .topbar {
                padding: 1.5rem 1.5rem;
            }
            
            .content {
                padding: 3rem 1.5rem;
            }
            
            .headline {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="topbar">${websiteData.brandName}</div>
    <div class="content">
        <h1 class="headline">${websiteData.headline}</h1>
        <p class="description">${websiteData.description}</p>
    </div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${websiteData.title.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Navigation links
document.getElementById('generateLink').addEventListener('click', (e) => {
    e.preventDefault();
    resetForm();
});

document.getElementById('feedbackLink').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Thank you for your interest! Please send your feedback to: developer@kyc-web.com');
});