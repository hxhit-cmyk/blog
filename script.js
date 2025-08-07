// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 处理移动导航菜单
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('nav');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // 切换图标显示
            if (nav.classList.contains('active')) {
                menuIcon.style.display = 'none';
                closeIcon.style.display = 'block';
            } else {
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        });
    }
    
    // 处理返回顶部按钮
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    // 处理导航栏在滚动时的效果
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 处理订阅表单提交
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // 在实际应用中，这里应该发送AJAX请求到服务器
                // 这里我们只是模拟一个成功的订阅
                emailInput.value = '';
                
                // 创建并显示成功消息
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = '感谢您的订阅！';
                successMessage.style.color = '#0066cc';
                successMessage.style.marginTop = '10px';
                successMessage.style.fontWeight = 'bold';
                
                // 检查是否已经有成功消息，如果有则移除
                const existingMessage = newsletterForm.querySelector('.success-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                newsletterForm.appendChild(successMessage);
                
                // 3秒后移除成功消息
                setTimeout(function() {
                    successMessage.style.opacity = '0';
                    successMessage.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(function() {
                        successMessage.remove();
                    }, 500);
                }, 3000);
            }
        });
    }
    
    // 为文章卡片添加点击事件
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            // 如果点击的是"阅读更多"链接，则不执行以下代码
            if (e.target.classList.contains('read-more') || e.target.tagName === 'A') {
                return;
            }
            
            // 获取文章链接并跳转
            const articleLink = card.querySelector('h3 a').getAttribute('href');
            window.location.href = articleLink;
        });
    });
    
    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 添加图片懒加载功能
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        // 回退方案：为不支持IntersectionObserver的浏览器
        let lazyLoadThrottleTimeout;
        
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            
            lazyLoadThrottleTimeout = setTimeout(function() {
                const scrollTop = window.pageYOffset;
                
                lazyImages.forEach(function(img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                });
                
                if (lazyImages.length === 0) { 
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationChange', lazyLoad);
                }
            }, 20);
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
    }
});

// 添加暗黑模式切换功能（可以在未来实现）
// 这里预留代码位置，可以在后续开发中实现