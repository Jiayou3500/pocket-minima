let currentStep = 1;
let websiteData = {
    title: '',
    theme: '',
    header: {
        brandName: '',
        links: '',
        color: ''
    },
    headline: '',
    description: '',
    image: null,
    imagePosition: 'left',
    footer: {
        text: '',
        links: '',
        color: ''
    },
    sections: []
};

let currentSectionData = null;

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
    if (currentStep === 1 && !document.getElementById('websiteTitle').value) {
        alert('Please enter a website title');
        return;
    }
    if (currentStep === 3 && !document.getElementById('headerBrandName').value) {
        alert('Please enter a brand name for the header');
        return;
    }
    if (currentStep === 4 && !document.getElementById('headline').value) {
        alert('Please enter a headline');
        return;
    }
    if (currentStep === 5 && !document.getElementById('description').value) {
        alert('Please enter a description');
        return;
    }
    if (currentStep === 7 && !document.getElementById('footerText').value) {
        alert('Please enter footer text');
        return;
    }

    if (currentStep === 1) websiteData.title = document.getElementById('websiteTitle').value;
    if (currentStep === 3) {
        websiteData.header.brandName = document.getElementById('headerBrandName').value;
        websiteData.header.links = document.getElementById('headerLinks').value;
    }
    if (currentStep === 4) websiteData.headline = document.getElementById('headline').value;
    if (currentStep === 5) websiteData.description = document.getElementById('description').value;
    if (currentStep === 7) {
        websiteData.footer.text = document.getElementById('footerText').value;
        websiteData.footer.links = document.getElementById('footerLinks').value;
    }

    document.getElementById(`step${currentStep}`).style.display = 'none';
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

function selectHeaderColor(color) {
    websiteData.header.color = color;
    document.querySelectorAll('#step3 .color-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.color-btn').classList.add('selected');
    document.getElementById('headerNextBtn').disabled = false;
}

function selectFooterColor(color) {
    websiteData.footer.color = color;
    document.querySelectorAll('#step7 .color-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.color-btn').classList.add('selected');
    document.getElementById('footerNextBtn').disabled = false;
}

function selectPosition(position) {
    websiteData.imagePosition = position;
    document.querySelectorAll('.position-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.position-btn').classList.add('selected');
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            websiteData.image = e.target.result;
            document.getElementById('previewImg').src = e.target.result;
            document.getElementById('uploadPlaceholder').style.display = 'none';
            document.getElementById('imagePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function removeImage() {
    websiteData.image = null;
    document.getElementById('imageUpload').value = '';
    document.getElementById('uploadPlaceholder').style.display = 'flex';
    document.getElementById('imagePreview').style.display = 'none';
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

function getColorStyle(color) {
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
    // 🔹 SAVE FOOTER DATA HERE
    websiteData.footer.text = document.getElementById('footerText').value;
    websiteData.footer.links = document.getElementById('footerLinks').value;

    updatePreview();
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('previewSection').classList.add('active');
}

function updatePreview() {
    const headerStyle = getColorStyle(websiteData.header.color);
    const footerStyle = getColorStyle(websiteData.footer.color);
    const themeGradient = getThemeGradient(websiteData.theme);
    const textColor = websiteData.theme === 'gradient-blue' || websiteData.theme === 'gradient-pink' || websiteData.theme === 'gradient-black' ? '#ffffff' : '#000000';

    const headerLinks = websiteData.header.links ? websiteData.header.links.split(',').map(link => `<a href="#">${link.trim()}</a>`).join('') : '';
    const headerHTML = `
        <div class="preview-header" style="background: ${headerStyle.background}; color: ${headerStyle.color}; ${headerStyle.border ? 'border-bottom: ' + headerStyle.border : ''}">
            <div class="preview-header-brand">${websiteData.header.brandName}</div>
            ${headerLinks ? `<div class="preview-header-links">${headerLinks}</div>` : ''}
        </div>
    `;

    let heroHTML = '';
    if (websiteData.image) {
        const imagePosition = websiteData.imagePosition;
        heroHTML = `
            <div class="preview-content-with-image" style="background: ${themeGradient}; color: ${textColor}; flex-direction: ${imagePosition === 'left' ? 'row' : 'row-reverse'};">
                <div class="preview-image-container">
                    <img src="${websiteData.image}" alt="Uploaded image">
                </div>
                <div class="preview-text-container">
                    <h1 class="preview-headline">${websiteData.headline}</h1>
                    <p class="preview-description">${websiteData.description}</p>
                </div>
            </div>
        `;
    } else {
        heroHTML = `
            <div class="preview-content" style="background: ${themeGradient}; color: ${textColor};">
                <h1 class="preview-headline">${websiteData.headline}</h1>
                <p class="preview-description">${websiteData.description}</p>
            </div>
        `;
    }

    let sectionsHTML = '';
    websiteData.sections.forEach((section, index) => {
        const bgColor = websiteData.theme === 'full-white' ? (index % 2 === 0 ? '#ffffff' : '#f8f9fa') : (index % 2 === 0 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)');
        
        if (section.format === 'image-text') {
            sectionsHTML += `
                <div class="preview-section2" style="background: ${bgColor}; color: ${textColor};">
                    <div class="preview-section2-content">
                        <div class="preview-section2-image">
                            <img src="${section.image}" alt="Section image">
                        </div>
                        <div class="preview-section2-text">
                            <p>${section.text}</p>
                        </div>
                    </div>
                </div>
            `;
        } else if (section.format === 'two-columns') {
            sectionsHTML += `
                <div class="preview-section2" style="background: ${bgColor}; color: ${textColor};">
                    <div class="preview-section2-two-columns">
                        <div class="preview-column">
                            <div class="preview-column-image">
                                <img src="${section.image1}" alt="Image 1">
                            </div>
                            <div class="preview-column-text">
                                <p>${section.text1}</p>
                            </div>
                        </div>
                        <div class="preview-column">
                            <div class="preview-column-image">
                                <img src="${section.image2}" alt="Image 2">
                            </div>
                            <div class="preview-column-text">
                                <p>${section.text2}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    const footerLinks = websiteData.footer.links ? websiteData.footer.links.split(',').map(link => `<a href="#">${link.trim()}</a>`).join(' | ') : '';
    const footerHTML = `
        <div class="preview-footer" style="background: ${footerStyle.background}; color: ${footerStyle.color}; ${footerStyle.border ? 'border-top: ' + footerStyle.border : ''}">
            <div class="preview-footer-text">${websiteData.footer.text}</div>
            ${footerLinks ? `<div class="preview-footer-links">${footerLinks}</div>` : ''}
        </div>
    `;

    const previewHTML = headerHTML + heroHTML + sectionsHTML + footerHTML;
    document.getElementById('previewContainer').innerHTML = previewHTML;
}

function selectFormat(format) {
    if (!currentSectionData) {
        currentSectionData = {};
    }
    currentSectionData.format = format;
    
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.format-btn').classList.add('selected');
    document.getElementById('formatNextBtn').disabled = false;
}

function showSectionContent() {
    document.getElementById('sectionFormat').style.display = 'none';
    
    const format = currentSectionData.format;
    if (format === 'image-text') {
        document.getElementById('sectionImageText').style.display = 'block';
    } else if (format === 'two-columns') {
        document.getElementById('sectionTwoColumns').style.display = 'block';
    }
}

function handleSectionImageUpload(event, inputId) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (!currentSectionData) {
                currentSectionData = {};
            }
            
            if (inputId === 'sectionImage') {
                currentSectionData.image = e.target.result;
                document.getElementById('sectionImagePreviewImg').src = e.target.result;
                document.getElementById('sectionImagePlaceholder').style.display = 'none';
                document.getElementById('sectionImagePreview').style.display = 'block';
            } else if (inputId === 'sectionImage1') {
                currentSectionData.image1 = e.target.result;
                document.getElementById('sectionImage1PreviewImg').src = e.target.result;
                document.getElementById('sectionImage1Placeholder').style.display = 'none';
                document.getElementById('sectionImage1Preview').style.display = 'block';
            } else if (inputId === 'sectionImage2') {
                currentSectionData.image2 = e.target.result;
                document.getElementById('sectionImage2PreviewImg').src = e.target.result;
                document.getElementById('sectionImage2Placeholder').style.display = 'none';
                document.getElementById('sectionImage2Preview').style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
    }
}

function removeSectionImage(inputId) {
    if (inputId === 'sectionImage') {
        currentSectionData.image = null;
        document.getElementById('sectionImage').value = '';
        document.getElementById('sectionImagePlaceholder').style.display = 'flex';
        document.getElementById('sectionImagePreview').style.display = 'none';
    } else if (inputId === 'sectionImage1') {
        currentSectionData.image1 = null;
        document.getElementById('sectionImage1').value = '';
        document.getElementById('sectionImage1Placeholder').style.display = 'flex';
        document.getElementById('sectionImage1Preview').style.display = 'none';
    } else if (inputId === 'sectionImage2') {
        currentSectionData.image2 = null;
        document.getElementById('sectionImage2').value = '';
        document.getElementById('sectionImage2Placeholder').style.display = 'flex';
        document.getElementById('sectionImage2Preview').style.display = 'none';
    }
}

function addNewSection() {
    const format = currentSectionData.format;
    
    if (format === 'image-text') {
        const text = document.getElementById('sectionText').value;
        if (!currentSectionData.image) {
            alert('Please upload an image');
            return;
        }
        if (!text) {
            alert('Please enter a description');
            return;
        }
        currentSectionData.text = text;
    } else if (format === 'two-columns') {
        const text1 = document.getElementById('sectionText1').value;
        const text2 = document.getElementById('sectionText2').value;
        if (!currentSectionData.image1) {
            alert('Please upload Image 1');
            return;
        }
        if (!currentSectionData.image2) {
            alert('Please upload Image 2');
            return;
        }
        if (!text1) {
            alert('Please enter Description 1');
            return;
        }
        if (!text2) {
            alert('Please enter Description 2');
            return;
        }
        currentSectionData.text1 = text1;
        currentSectionData.text2 = text2;
    }
    
    websiteData.sections.push({...currentSectionData});
    resetSectionForm();
    updatePreview();
    
    document.getElementById('sectionBuilder').classList.remove('active');
    document.getElementById('previewSection').classList.add('active');
}

function addAnotherSection() {
    currentSectionData = null;
    document.getElementById('previewSection').classList.remove('active');
    document.getElementById('sectionBuilder').classList.add('active');
    resetSectionForm();
}

function resetSectionForm() {
    document.getElementById('sectionText').value = '';
    document.getElementById('sectionText1').value = '';
    document.getElementById('sectionText2').value = '';
    document.getElementById('sectionImage').value = '';
    document.getElementById('sectionImage1').value = '';
    document.getElementById('sectionImage2').value = '';
    
    document.getElementById('sectionImagePlaceholder').style.display = 'flex';
    document.getElementById('sectionImagePreview').style.display = 'none';
    document.getElementById('sectionImage1Placeholder').style.display = 'flex';
    document.getElementById('sectionImage1Preview').style.display = 'none';
    document.getElementById('sectionImage2Placeholder').style.display = 'flex';
    document.getElementById('sectionImage2Preview').style.display = 'none';
    
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.getElementById('formatNextBtn').disabled = true;
    
    document.querySelectorAll('.section-content').forEach(content => {
        content.style.display = 'none';
    });
    document.getElementById('sectionFormat').style.display = 'block';
    
    currentSectionData = null;
}

function resetForm() {
    currentStep = 1;
    websiteData = {
        title: '',
        theme: '',
        header: {
            brandName: '',
            links: '',
            color: ''
        },
        headline: '',
        description: '',
        image: null,
        imagePosition: 'left',
        footer: {
            text: '',
            links: '',
            color: ''
        },
        sections: []
    };

    document.getElementById('websiteTitle').value = '';
    document.getElementById('headerBrandName').value = '';
    document.getElementById('headerLinks').value = '';
    document.getElementById('headline').value = '';
    document.getElementById('description').value = '';
    document.getElementById('footerText').value = '';
    document.getElementById('footerLinks').value = '';
    document.getElementById('imageUpload').value = '';
    
    document.getElementById('uploadPlaceholder').style.display = 'flex';
    document.getElementById('imagePreview').style.display = 'none';

    document.querySelectorAll('.theme-btn, .color-btn, .position-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    document.getElementById('themeNextBtn').disabled = true;
    document.getElementById('headerNextBtn').disabled = true;
    document.getElementById('footerNextBtn').disabled = true;

    document.querySelectorAll('.step-content').forEach(step => {
        step.style.display = 'none';
    });

    document.getElementById('step1').style.display = 'block';
    updateStepIndicator(1);

    document.getElementById('previewSection').classList.remove('active');
    document.getElementById('sectionBuilder').classList.remove('active');
    document.getElementById('formSection').style.display = 'block';
}

function downloadWebsite() {
    const headerStyle = getColorStyle(websiteData.header.color);
    const footerStyle = getColorStyle(websiteData.footer.color);
    const themeGradient = getThemeGradient(websiteData.theme);
    const textColor = websiteData.theme === 'gradient-blue' || websiteData.theme === 'gradient-pink' || websiteData.theme === 'gradient-black' ? '#ffffff' : '#000000';

    const headerLinks = websiteData.header.links ? websiteData.header.links.split(',').map(link => `<a href="#">${link.trim()}</a>`).join('') : '';
    const headerHTML = `
    <div class="header">
        <div class="header-brand">${websiteData.header.brandName}</div>
        ${headerLinks ? `<div class="header-links">${headerLinks}</div>` : ''}
    </div>`;

    let heroHTML = '';
    let heroCSS = '';
    
    if (websiteData.image) {
        const flexDirection = websiteData.imagePosition === 'left' ? 'row' : 'row-reverse';
        heroHTML = `
    <div class="hero-with-image">
        <div class="hero-image">
            <img src="${websiteData.image}" alt="Image">
        </div>
        <div class="hero-text">
            <h1 class="headline">${websiteData.headline}</h1>
            <p class="description">${websiteData.description}</p>
        </div>
    </div>`;
        
        heroCSS = `
        .hero-with-image {
            min-height: calc(100vh - 60px);
            display: flex;
            flex-direction: ${flexDirection};
            align-items: center;
            gap: 3rem;
            padding: 3rem;
            background: ${themeGradient};
            color: ${textColor};
        }
        .hero-image { flex: 1; max-width: 500px; }
        .hero-image img { width: 100%; height: auto; border-radius: 8px; box-shadow: 0 8px 40px rgba(0,0,0,0.15); }
        .hero-text { flex: 1; max-width: 600px; }
        .headline { font-size: 3.5rem; font-weight: 400; margin-bottom: 2rem; letter-spacing: -1px; }
        .description { font-size: 1.15rem; line-height: 1.8; opacity: 0.9; }
        @media (max-width: 968px) {
            .hero-with-image { flex-direction: column; padding: 3rem 1.5rem; }
            .hero-image { max-width: 100%; }
            .hero-text { text-align: center; }
            .headline { font-size: 2rem; }
        }`;
    } else {
        heroHTML = `
    <div class="hero">
        <h1 class="headline">${websiteData.headline}</h1>
        <p class="description">${websiteData.description}</p>
    </div>`;
        
        heroCSS = `
        .hero {
            min-height: calc(100vh - 60px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem 3rem;
            background: ${themeGradient};
            color: ${textColor};
        }
        .headline { font-size: 3.5rem; font-weight: 400; margin-bottom: 2rem; letter-spacing: -1px; text-align: center; }
        .description { font-size: 1.15rem; max-width: 700px; line-height: 1.8; text-align: center; opacity: 0.9; }
        @media (max-width: 768px) {
            .hero { padding: 3rem 1.5rem; }
            .headline { font-size: 2rem; }
        }`;
    }

    let sectionsHTML = '';
    let sectionsCSS = '';
    
    websiteData.sections.forEach((section, index) => {
        if (section.format === 'image-text') {
            sectionsHTML += `
    <div class="section section-${index}">
        <div class="section-content">
            <div class="section-item"><img src="${section.image}" alt="Section image"></div>
            <div class="section-item section-text"><p>${section.text}</p></div>
        </div>
    </div>`;
        } else if (section.format === 'two-columns') {
            sectionsHTML += `
    <div class="section section-${index}">
        <div class="section-two-columns">
            <div class="section-column">
                <div class="section-column-image"><img src="${section.image1}" alt="Image 1"></div>
                <div class="section-column-text"><p>${section.text1}</p></div>
            </div>
            <div class="section-column">
                <div class="section-column-image"><img src="${section.image2}" alt="Image 2"></div>
                <div class="section-column-text"><p>${section.text2}</p></div>
            </div>
        </div>
    </div>`;
        }
    });

    if (websiteData.sections.length > 0) {
        sectionsCSS = `
        .section { padding: 4rem 3rem; color: ${textColor}; }
        .section:nth-child(even) { background: ${websiteData.theme === 'full-white' ? '#f8f9fa' : 'rgba(255,255,255,0.02)'}; }
        .section:nth-child(odd) { background: ${websiteData.theme === 'full-white' ? '#ffffff' : 'rgba(255,255,255,0.05)'}; }
        .section-content { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        .section-item img { width: 100%; height: auto; border-radius: 8px; box-shadow: 0 8px 40px rgba(0,0,0,0.1); }
        .section-text { font-size: 1.1rem; line-height: 1.8; }
        .section-two-columns { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .section-column { display: flex; flex-direction: column; gap: 1.5rem; }
        .section-column-image img { width: 100%; height: auto; border-radius: 8px; box-shadow: 0 8px 40px rgba(0,0,0,0.1); }
        .section-column-text { font-size: 1rem; line-height: 1.8; }
        .section-column-text p { margin: 0; }
        @media (max-width: 968px) {
            .section { padding: 3rem 1.5rem; }
            .section-content { grid-template-columns: 1fr; gap: 2rem; }
            .section-two-columns { grid-template-columns: 1fr; gap: 2.5rem; }
        }`;
    }

    const footerLinks = websiteData.footer.links ? websiteData.footer.links.split(',').map(link => `<a href="#">${link.trim()}</a>`).join(' | ') : '';
    const footerHTML = `
    <div class="footer">
        <div class="footer-text">${websiteData.footer.text}</div>
        ${footerLinks ? `<div class="footer-links">${footerLinks}</div>` : ''}
    </div>`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteData.title}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Times New Roman', serif; }
        .header {
            padding: 1.5rem 3rem;
            background: ${headerStyle.background};
            color: ${headerStyle.color};
            ${headerStyle.border ? 'border-bottom: ' + headerStyle.border + ';' : ''}
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header-brand { font-size: 1.1rem; font-weight: 600; letter-spacing: 0.5px; }
        .header-links { display: flex; gap: 2rem; }
        .header-links a { color: inherit; text-decoration: none; font-size: 0.95rem; transition: opacity 0.3s ease; }
        .header-links a:hover { opacity: 0.6; }
        ${heroCSS}${sectionsCSS}
        .footer {
            padding: 2rem 3rem;
            background: ${footerStyle.background};
            color: ${footerStyle.color};
            ${footerStyle.border ? 'border-top: ' + footerStyle.border + ';' : ''}
            text-align: center;
        }
        .footer-text { margin-bottom: 0.5rem; font-size: 0.9rem; }
        .footer-links { font-size: 0.85rem; }
        .footer-links a { color: inherit; text-decoration: none; transition: opacity 0.3s ease; }
        .footer-links a:hover { opacity: 0.6; }
        @media (max-width: 768px) {
            .header { padding: 1.5rem 1.5rem; flex-direction: column; gap: 1rem; }
            .header-links { gap: 1rem; font-size: 0.85rem; }
            .footer { padding: 2rem 1.5rem; }
        }
    </style>
</head>
<body>${headerHTML}${heroHTML}${sectionsHTML}${footerHTML}
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

document.getElementById('generateLink').addEventListener('click', (e) => {
    e.preventDefault();
    resetForm();
});

document.getElementById('feedbackLink').addEventListener('click', (e) => {
    e.preventDefault();
    alert('From the developer: \n\nThanks for visiting :)！Your feedback is appreciated. jiayou3500@gmail.com');
});
