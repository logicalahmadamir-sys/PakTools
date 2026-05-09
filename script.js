// ============================================
// LOAN EMI CALCULATOR WITH ANIMATIONS
// ============================================

function calculateEMI() {
    const amount = document.getElementById('amount').value;
    const rate = document.getElementById('rate').value / 12 / 100;
    const months = document.getElementById('months').value;
    const resultElement = document.getElementById('emiResult');

    // Input validation with animation
    if (!amount || !rate || !months || amount <= 0 || months <= 0) {
        showErrorAnimation(resultElement, 'برائے مہربانی تمام معلومات درج کریں');
        return;
    }

    try {
        const emi = (amount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
        
        if (isFinite(emi)) {
            const totalAmount = (emi * months).toFixed(2);
            const totalInterest = (totalAmount - amount).toFixed(2);
            
            resultElement.innerHTML = `
                <div class="result-box" style="animation: slideUp 0.5s ease-out;">
                    <div class="result-item">
                        <span>ماہانہ قسط:</span>
                        <strong>PKR ${emi.toFixed(2)}</strong>
                    </div>
                    <div class="result-item">
                        <span>کل رقم:</span>
                        <strong>PKR ${totalAmount}</strong>
                    </div>
                    <div class="result-item">
                        <span>کل سود:</span>
                        <strong>PKR ${totalInterest}</strong>
                    </div>
                </div>
            `;
            
            resultElement.style.display = 'block';
            animateResults(resultElement);
        } else {
            showErrorAnimation(resultElement, 'غلط قیمتیں درج کریں');
        }
    } catch (error) {
        showErrorAnimation(resultElement, 'خرابی پیش آئی - دوبارہ کوشش کریں');
    }
}

// ============================================
// SALARY TAX CALCULATOR WITH ANIMATIONS
// ============================================

function calculateTax() {
    const salary = parseFloat(document.getElementById('salary').value);
    const resultElement = document.getElementById('taxResult');

    // Input validation
    if (!salary || salary <= 0) {
        showErrorAnimation(resultElement, 'براہ کرم صحیح تنخواہ درج کریں');
        return;
    }

    let tax = 0;
    let taxSlab = '';

    // Pakistani Tax Slabs 2024
    if (salary <= 600000) {
        tax = 0;
        taxSlab = 'Tax Free - 0-600,000';
    }
    else if (salary <= 1200000) {
        tax = (salary - 600000) * 0.05;
        taxSlab = 'Tax Slab - 5% (600k-1.2M)';
    }
    else if (salary <= 2200000) {
        tax = 30000 + (salary - 1200000) * 0.15;
        taxSlab = 'Tax Slab - 15% (1.2M-2.2M)';
    }
    else if (salary <= 3200000) {
        tax = 180000 + (salary - 2200000) * 0.25;
        taxSlab = 'Tax Slab - 25% (2.2M-3.2M)';
    }
    else {
        tax = 430000 + (salary - 3200000) * 0.35;
        taxSlab = 'Tax Slab - 35% (3.2M+)';
    }

    const netSalary = (salary - tax).toFixed(2);
    const taxPercentage = ((tax / salary) * 100).toFixed(2);

    resultElement.innerHTML = `
        <div class="result-box" style="animation: slideUp 0.5s ease-out;">
            <div class="result-item">
                <span>کل تنخواہ:</span>
                <strong>PKR ${salary.toFixed(2)}</strong>
            </div>
            <div class="result-item">
                <span>ٹیکس:</span>
                <strong style="color: #ff6b6b;">PKR ${tax.toFixed(2)}</strong>
            </div>
            <div class="result-item">
                <span>خالص تنخواہ:</span>
                <strong style="color: #28a745;">PKR ${netSalary}</strong>
            </div>
            <div class="result-item">
                <span>ٹیکس کی شرح:</span>
                <strong>${taxPercentage}%</strong>
            </div>
            <div class="result-item tax-slab">
                <span>${taxSlab}</span>
            </div>
        </div>
    `;

    resultElement.style.display = 'block';
    animateResults(resultElement);
}

// ============================================
// CURRENCY CONVERTER WITH REAL-TIME RATES
// ============================================

async function convertCurrency() {
    const amount = document.getElementById('currencyAmount').value;
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    const resultElement = document.getElementById('currencyResult');

    // Input validation
    if (!amount || amount <= 0) {
        showErrorAnimation(resultElement, 'براہ کرم رقم درج کریں');
        return;
    }

    if (from === to) {
        showErrorAnimation(resultElement, 'مختلف کرنسیز منتخب کریں');
        return;
    }

    // Show loading animation
    resultElement.innerHTML = '<div style="animation: pulse 1s infinite;">Loading...</div>';
    resultElement.style.display = 'block';

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        
        if (!response.ok) {
            throw new Error('API Error');
        }

        const data = await response.json();
        const rate = data.rates[to];

        if (!rate) {
            showErrorAnimation(resultElement, 'کرنسی دستیاب نہیں');
            return;
        }

        const result = (amount * rate).toFixed(2);

        resultElement.innerHTML = `
            <div class="result-box" style="animation: slideUp 0.5s ease-out;">
                <div class="result-item">
                    <span>${amount} ${from} = ${result} ${to}</span>
                </div>
                <div class="result-item">
                    <span>Exchange Rate:</span>
                    <strong>1 ${from} = ${rate.toFixed(4)} ${to}</strong>
                </div>
                <div class="result-item" style="font-size: 0.9rem; color: #666;">
                    آخری اپڈیٹ: ${new Date().toLocaleTimeString('ur-PK')}
                </div>
            </div>
        `;

        animateResults(resultElement);
    } catch (error) {
        showErrorAnimation(resultElement, 'انٹرنیٹ کنکشن میں مسئلہ - دوبارہ کوشش کریں');
        console.error('Currency conversion error:', error);
    }
}

// ============================================
// GOLD CALCULATOR WITH LIVE RATES
// ============================================

function calculateGold() {
    const rate = parseFloat(document.getElementById('goldRate').value);
    const quantity = parseFloat(document.getElementById('quantity').value);
    const unit = document.getElementById('unit').value;
    const resultElement = document.getElementById('goldResult');

    // Input validation
    if (!rate || !quantity || rate <= 0 || quantity <= 0) {
        showErrorAnimation(resultElement, 'براہ کرم صحیح معلومات درج کریں');
        return;
    }

    let gramQuantity = quantity;

    // Convert to grams
    switch(unit) {
        case 'gram':
            gramQuantity = quantity;
            break;
        case 'tola':
            gramQuantity = quantity * 9.333; // 1 Tola = 9.333 grams
            break;
        case 'ounce':
            gramQuantity = quantity * 31.1035; // 1 Ounce = 31.1035 grams
            break;
        case 'kilogram':
            gramQuantity = quantity * 1000;
            break;
    }

    const total = (rate * gramQuantity).toFixed(2);
    const perGramCost = rate.toFixed(2);

    resultElement.innerHTML = `
        <div class="result-box" style="animation: slideUp 0.5s ease-out;">
            <div class="result-item">
                <span>سونے کی مقدار:</span>
                <strong>${gramQuantity.toFixed(2)} گرام</strong>
            </div>
            <div class="result-item">
                <span>فی گرام قیمت:</span>
                <strong>PKR ${perGramCost}</strong>
            </div>
            <div class="result-item">
                <span>کل قیمت:</span>
                <strong style="color: #ffc107; font-size: 1.2rem;">PKR ${total}</strong>
            </div>
            <div class="result-item" style="font-size: 0.9rem; color: #666;">
                ⚠️ نوٹ: یہ صرف تخمینہ ہے، اصل قیمت بازار کے لحاظ سے مختلف ہو سکتی ہے
            </div>
        </div>
    `;

    resultElement.style.display = 'block';
    animateResults(resultElement);
}

// ============================================
// ANIMATION HELPER FUNCTIONS
// ============================================

function showErrorAnimation(element, message) {
    element.innerHTML = `
        <div class="error-box" style="animation: shake 0.5s ease-in-out;">
            <span>❌ ${message}</span>
        </div>
    `;
    element.style.display = 'block';
    
    // Add shake animation
    element.style.animation = 'shake 0.5s ease-in-out';
}

function animateResults(element) {
    // Add fade-in animation
    const items = element.querySelectorAll('.result-item');
    items.forEach((item, index) => {
        item.style.animation = `fadeInLeft 0.5s ease-out ${index * 0.1}s both`;
    });
}

// ============================================
// SCROLL ANIMATIONS FOR ELEMENTS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add bounce effect
            if (entry.target.classList.contains('tool-box')) {
                entry.target.style.animation = 'bounce 0.6s ease-out';
            }
        }
    });
}, observerOptions);

// Observe all elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tool-box, .content-section, .calculator-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================================
// INPUT RANGE SLIDERS WITH LIVE UPDATE
// ============================================

function updateLoanAmount(value) {
    const display = document.getElementById('amountDisplay');
    if (display) {
        display.textContent = 'PKR ' + parseInt(value).toLocaleString('ur-PK');
    }
}

function updateLoanRate(value) {
    const display = document.getElementById('rateDisplay');
    if (display) {
        display.textContent = value + '%';
    }
}

function updateLoanMonths(value) {
    const display = document.getElementById('monthsDisplay');
    if (display) {
        display.textContent = value + ' Months';
    }
}

// ============================================
// NUMBER INPUT FORMATTING
// ============================================

function formatNumberInput(event) {
    let value = event.target.value.replace(/[^0-9.]/g, '');
    if (value) {
        event.target.value = parseFloat(value).toLocaleString('ur-PK');
    }
}

// ============================================
// COPY TO CLIPBOARD FUNCTION
// ============================================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('کاپی کر دیا گیا! ✓');
    }).catch(() => {
        showNotification('کاپی میں ناکام');
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInRight 0.4s ease-out;
        z-index: 9999;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease-out';
        setTimeout(() => notification.remove(), 400);
    }, 2000);
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (event) => {
    // Press Enter to calculate
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;
        
        if (activeElement.closest('#loanForm')) {
            calculateEMI();
        } else if (activeElement.closest('#taxForm')) {
            calculateTax();
        } else if (activeElement.closest('#currencyForm')) {
            convertCurrency();
        } else if (activeElement.closest('#goldForm')) {
            calculateGold();
        }
    }
});

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Animate header
    const header = document.querySelector('header');
    if (header) {
        header.style.animation = 'slideDown 0.6s ease-out';
    }
    
    // Animate hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.animation = 'fadeInUp 1s ease-out';
    }
});

// ============================================
// DARK MODE TOGGLE (Optional)
// ============================================

function toggleDarkMode() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme preference
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
});

// ============================================
// RESIZE OBSERVER FOR RESPONSIVE ELEMENTS
// ============================================

const resizeObserver = new ResizeObserver(() => {
    // Adjust element sizes on resize
    const toolBoxes = document.querySelectorAll('.tool-box');
    toolBoxes.forEach(box => {
        const width = box.offsetWidth;
        box.style.height = width + 'px';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tool-box').forEach(box => {
        resizeObserver.observe(box);
    });
});

// ============================================
// EXPORT RESULTS FUNCTION
// ============================================

function exportResults(calculatorType) {
    let resultText = '';
    const timestamp = new Date().toLocaleString('ur-PK');
    
    if (calculatorType === 'emi') {
        const amount = document.getElementById('amount').value;
        const rate = document.getElementById('rate').value;
        const months = document.getElementById('months').value;
        const result = document.getElementById('emiResult').innerText;
        resultText = `
Loan EMI Calculator Report
==========================
Date: ${timestamp}
Amount: PKR ${amount}
Rate: ${rate}%
Duration: ${months} Months

Results:
${result}
        `;
    }
    
    console.log(resultText);
    showNotification('نتائج محفوظ کر دیے گئے!');
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isValidPhoneNumber(phone) {
    const regex = /^[\d\s\-\+()]{10,}$/;
    return regex.test(phone);
}

console.log('%cPakTools Script Loaded Successfully! ✓', 'color: #28a745; font-size: 14px; font-weight: bold;');
