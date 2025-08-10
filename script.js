// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏汉堡菜单功能
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // 产品分类切换功能
    const categoryTabs = document.querySelectorAll('.category-tab');
    const productCategories = document.querySelectorAll('.product-category');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // 移除所有活动状态
            categoryTabs.forEach(t => t.classList.remove('active'));
            productCategories.forEach(c => c.classList.remove('active'));
            
            // 添加活动状态到当前选中的分类
            this.classList.add('active');
            const targetElement = document.getElementById(targetCategory);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });

    // 联系表单处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // 这里可以添加表单验证逻辑
            if (validateForm(formObject)) {
                // 模拟表单提交
                showSuccessMessage('消息发送成功！我们会尽快与您联系。');
                this.reset();
            }
        });
    }

    // 平滑滚动到锚点
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 导航栏滚动效果
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动，隐藏导航栏
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动，显示导航栏
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // 产品卡片悬停效果增强
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 价值点悬停效果
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.value-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // 按钮点击波纹效果
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });

    // 页面加载动画
    animatePageLoad();
});

// 表单验证函数
function validateForm(formData) {
    const requiredFields = ['name', 'email', 'inquiry-type', 'message'];
    
    for (let field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
            showErrorMessage(`请填写${getFieldLabel(field)}`);
            return false;
        }
    }
    
    // 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showErrorMessage('请输入有效的邮箱地址');
        return false;
    }
    
    return true;
}

// 获取字段标签
function getFieldLabel(fieldName) {
    const labels = {
        'name': '姓名',
        'email': '邮箱',
        'inquiry-type': '咨询类型',
        'message': '详细说明'
    };
    return labels[fieldName] || fieldName;
}

// 显示成功消息
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    // 3秒后自动移除
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// 显示错误消息
function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    // 3秒后自动移除
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// 创建按钮波纹效果
function createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// 页面加载动画
function animatePageLoad() {
    const elements = document.querySelectorAll('.value-item, .product-card, .contact-item, .advantage-item');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .navbar {
        transition: transform 0.3s ease;
    }
    
    .value-icon,
    .approach-icon,
    .contact-icon,
    .advantage-icon {
        transition: transform 0.3s ease;
    }
    
    .product-card,
    .value-item,
    .contact-item,
    .advantage-item {
        transition: all 0.3s ease;
    }
    
    .category-tab {
        transition: all 0.3s ease;
    }
    
    .cta-button,
    .product-btn,
    .submit-btn {
        transition: all 0.3s ease;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        transition: border-color 0.3s ease;
    }
`;
document.head.appendChild(style);

// 页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // 页面重新可见时，可以添加一些刷新逻辑
        console.log('页面重新可见');
    }
});

// 窗口大小变化处理
window.addEventListener('resize', function() {
    // 在小屏幕上隐藏导航菜单
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    // ESC键关闭导航菜单
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const hamburger = document.querySelector('.hamburger');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        }
    }
    
    // Enter键激活按钮
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'BUTTON' || activeElement.tagName === 'A') {
            activeElement.click();
        }
    }
});

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const optimizedScrollHandler = debounce(function() {
    // 滚动相关的性能优化逻辑
}, 16); // 约60fps

window.addEventListener('scroll', optimizedScrollHandler);

// 产品详情模态框功能
function initProductModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close-modal');
    const productButtons = document.querySelectorAll('.product-btn');
    
    if (!modal) return;
    
    // 关闭模态框
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 为所有产品按钮添加点击事件
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            if (productCard) {
                showProductDetails(productCard);
            }
        });
    });
}

// 显示产品详情
function showProductDetails(productCard) {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalTags = document.getElementById('modalTags');
    const modalDescription = document.getElementById('modalDescription');
    const modalDetails = document.getElementById('modalDetails');
    const modalFeatures = document.getElementById('modalFeatures');
    const nutritionGrid = document.getElementById('nutritionGrid');
    
    if (!modal) return;
    
    // 获取产品信息
    const title = productCard.querySelector('h3').textContent;
    const description = productCard.querySelector('.product-description').textContent;
    const tags = Array.from(productCard.querySelectorAll('.tag')).map(tag => tag.outerHTML);
    
    // 设置模态框内容
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalTags.innerHTML = tags.join('');
    
    // 设置产品详情
    const details = productCard.querySelectorAll('.detail-item');
    if (details.length > 0) {
        modalDetails.innerHTML = '<h3>产品特性</h3>';
        details.forEach(detail => {
            const label = detail.querySelector('.detail-label').textContent;
            const value = detail.querySelector('.detail-value').textContent;
            modalDetails.innerHTML += `
                <div class="detail-item">
                    <span class="detail-label">${label}</span>
                    <span class="detail-value">${value}</span>
                </div>
            `;
        });
    }
    
    // 设置产品特色
    const features = productCard.querySelectorAll('.feature-item');
    if (features.length > 0) {
        modalFeatures.innerHTML = '<h3>产品特色</h3>';
        features.forEach(feature => {
            const icon = feature.querySelector('i').outerHTML;
            const text = feature.querySelector('span').textContent;
            modalFeatures.innerHTML += `
                <div class="feature-item">
                    ${icon}
                    <span>${text}</span>
                </div>
            `;
        });
    }
    
    // 设置营养成分（根据产品类型）
    setNutritionInfo(title, nutritionGrid);
    
    // 显示模态框
    modal.style.display = 'block';
}

// 设置营养成分信息
function setNutritionInfo(productName, nutritionGrid) {
    const nutritionData = {
        '褐蘑菇 (Portabella)': [
            { value: '3.2g', label: '蛋白质/100g' },
            { value: '0.4μg', label: '维生素D/100g' },
            { value: '2.1g', label: '膳食纤维/100g' },
            { value: '22kcal', label: '热量/100g' }
        ],
        'Cremini蘑菇': [
            { value: '3.1g', label: '蛋白质/100g' },
            { value: '0.3μg', label: '维生素D/100g' },
            { value: '2.0g', label: '膳食纤维/100g' },
            { value: '20kcal', label: '热量/100g' }
        ],
        '巴西蘑菇': [
            { value: '3.5g', label: '蛋白质/100g' },
            { value: '0.5μg', label: '维生素D/100g' },
            { value: '2.5g', label: '膳食纤维/100g' },
            { value: '25kcal', label: '热量/100g' }
        ],
        '白蘑菇': [
            { value: '3.2g', label: '蛋白质/100g' },
            { value: '0.4μg', label: '维生素D/100g' },
            { value: '2.0g', label: '膳食纤维/100g' },
            { value: '21kcal', label: '热量/100g' }
        ]
    };
    
    const nutrition = nutritionData[productName] || nutritionData['白蘑菇'];
    
    nutritionGrid.innerHTML = nutrition.map(item => `
        <div class="nutrition-item">
            <div class="nutrition-value">${item.value}</div>
            <div class="nutrition-label">${item.label}</div>
        </div>
    `).join('');
}

// 初始化产品模态框
document.addEventListener('DOMContentLoaded', function() {
    initProductModal();
});

// 添加产品卡片悬停效果增强
function enhanceProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });
}

// 初始化产品卡片增强效果
document.addEventListener('DOMContentLoaded', function() {
    enhanceProductCards();
});

// 数字动画效果
function animateNumbers() {
    const statItems = document.querySelectorAll('.stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItem = entry.target;
                const targetNumber = parseInt(statItem.getAttribute('data-target'));
                const numberElement = statItem.querySelector('.stat-number');
                
                if (numberElement && !statItem.classList.contains('animated')) {
                    animateNumber(numberElement, targetNumber);
                    statItem.classList.add('animated');
                }
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach(item => observer.observe(item));
}

// 单个数字动画
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50; // 50步完成动画
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // 格式化数字显示
        if (target >= 1000) {
            element.textContent = Math.floor(current).toLocaleString();
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// 初始化数字动画
document.addEventListener('DOMContentLoaded', function() {
    animateNumbers();
});

// 添加滚动触发的动画效果
function addScrollAnimations() {
    const elements = document.querySelectorAll('.process-step, .prospect-item, .news-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// 初始化滚动动画
document.addEventListener('DOMContentLoaded', function() {
    addScrollAnimations();
});

// 返回顶部按钮功能
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // 滚动事件监听
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 初始化返回顶部按钮
document.addEventListener('DOMContentLoaded', function() {
    initBackToTop();
});

// 添加页面加载进度条
function addLoadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'loading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--color-moss-green), var(--color-forest-green));
        z-index: 10000;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    // 模拟加载进度
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 90) {
            progress = 100;
            clearInterval(interval);
        }
        progressBar.style.width = progress + '%';
        
        if (progress === 100) {
            setTimeout(() => {
                progressBar.style.opacity = '0';
                setTimeout(() => {
                    if (progressBar.parentNode) {
                        progressBar.parentNode.removeChild(progressBar);
                    }
                }, 300);
            }, 500);
        }
    }, 100);
}

// 页面加载完成后显示进度条
window.addEventListener('load', function() {
    addLoadingProgress();
});
