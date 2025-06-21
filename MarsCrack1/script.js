// 配置常量
const CONFIG = {
    API_BASE: 'https://api.mashang-dian.com/api',
    PARTICLE_COUNT: 50,
    SCROLL_THRESHOLD: 0.1,
    NAVBAR_CHANGE_SCROLL: 100
};

// DOM 元素缓存
const DOM = {
    particlesContainer: document.getElementById('particles'),
    fadeElements: document.querySelectorAll('.fade-in'),
    navbar: document.querySelector('.navbar'),
    hero: document.querySelector('.hero'),
    qrImg: document.querySelector('.qr-image img'),
    qrPlaceholder: document.querySelector('.qr-image > div'),
    commentsList: document.getElementById('commentsList'),
    commentName: document.getElementById('commentName'),
    commentContent: document.getElementById('commentContent'),
    visitCount: document.getElementById('visitCount'),
    uptime: document.getElementById('uptime'),
    commentCount: document.getElementById('commentCount')
};

/**
 * 粒子效果
 */
function createParticles() {
    if (!DOM.particlesContainer) return;

    for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        DOM.particlesContainer.appendChild(particle);
    }
}

/**
 * 滚动动画
 */
function observeElements() {
    if (!DOM.fadeElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 动画触发后停止观察
            }
        });
    }, { threshold: CONFIG.SCROLL_THRESHOLD });

    DOM.fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * 平滑滚动
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 更新URL哈希而不触发滚动
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });
}

/**
 * 导航栏滚动效果
 */
function setupNavbarScroll() {
    if (!DOM.navbar || !DOM.hero) return;

    let lastScrollTop = 0;
    const heroHeight = DOM.hero.offsetHeight;

    const updateNavbar = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 导航栏背景变化
        if (scrollTop > CONFIG.NAVBAR_CHANGE_SCROLL) {
            DOM.navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            DOM.navbar.style.borderBottom = '1px solid rgba(255, 99, 71, 0.3)';
        } else {
            DOM.navbar.style.background = 'rgba(0, 0, 0, 0.3)';
            DOM.navbar.style.borderBottom = '1px solid rgba(255, 99, 71, 0.1)';
        }

        // 背景图片滚动隐藏效果
        DOM.hero.style.backgroundImage = scrollTop > heroHeight * 0.8 
            ? 'none' 
            : 'url("bg.jpg")';

        lastScrollTop = scrollTop;
    };

    // 使用节流优化滚动事件
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(updateNavbar, 50);
    }, false);
}

/**
 * 通用下载函数
 */
function downloadFile({ url, filename, message }) {
    if (confirm(message || '即将开始下载\n\n如果下载没有自动开始，请检查浏览器设置或联系开发者')) {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        
        // 延迟移除以确保下载开始
        setTimeout(() => {
            document.body.removeChild(link);
        }, 100);
    }
}

// 下载功能包装
const DOWNLOADS = {
    windows: () => downloadFile({
        url: 'https://github.com/kukuqi666/scripts/releases/download/v1.1.1.1/windows.bat',
        filename: 'windows.bat',
        message: '即将开始下载 Windows 版本应用\n\n如果下载没有自动开始，请检查浏览器设置或联系开发者'
    }),
    mac: () => downloadFile({
        url: 'https://github.com/kukuqi666/scripts/releases/download/v1.1.1.1/mac.sh',
        filename: 'mac.sh',
        message: '即将开始下载 macOS 版本应用\n\n如果下载没有自动开始，请检查浏览器设置或联系开发者'
    }),
    navicatWindows: () => downloadFile({
        url: 'https://github.com/kukuqi666/scripts/releases/download/v2.2.2.2/Navicat17.zip',
        filename: 'Navicat17.zip',
        message: '即将开始下载 Navicat Windows 版本\n\n如果下载没有自动开始，请检查浏览器设置或联系开发者'
    }),
    cursorWindows: () => downloadFile({
        url: 'https://github.com/kukuqi666/scripts/releases/download/v2.2.2.2/Mars-Cursor.222.zip',
        filename: 'Mars-Cursor无限续杯222.zip',
        message: '即将开始下载 Cursor Windows 版本\n\n如果下载没有自动开始，请检查浏览器设置或联系开发者'
    })
};

/**
 * 二维码图片加载处理
 */
function setupQRCode() {
    if (!DOM.qrImg || !DOM.qrPlaceholder) return;

    // 如果有真实的二维码图片，可以在这里设置
    DOM.qrImg.onload = () => {
        DOM.qrImg.style.display = 'block';
        DOM.qrPlaceholder.style.display = 'none';
    };
    DOM.qrImg.onerror = () => {
        DOM.qrImg.style.display = 'none';
        DOM.qrPlaceholder.style.display = 'block';
    };
    DOM.qrImg.src = './image.jpg';
}

/**
 * API 请求封装
 */
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${CONFIG.API_BASE}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API request failed for ${endpoint}:`, error);
        throw error;
    }
}

/**
 * 统计数据管理
 */
const StatsManager = {
    async load() {
        try {
            const data = await apiRequest('/stats');
            
            if (DOM.visitCount) DOM.visitCount.textContent = data.visitCount?.toLocaleString() || 'N/A';
            if (DOM.uptime) DOM.uptime.textContent = data.uptime || 'N/A';
            if (DOM.commentCount) DOM.commentCount.textContent = data.commentCount || '0';
        } catch {
            this.setErrorState();
        }
    },
    
    async incrementVisit() {
        try {
            await apiRequest('/visit', { method: 'POST' });
        } catch (error) {
            console.error('Failed to record visit:', error);
        }
    },
    
    setErrorState() {
        if (DOM.visitCount) DOM.visitCount.textContent = '加载失败';
        if (DOM.uptime) DOM.uptime.textContent = '加载失败';
        if (DOM.commentCount) DOM.commentCount.textContent = '加载失败';
    }
};

/**
 * 评论管理
 */
const CommentManager = {
    async load() {
        if (!DOM.commentsList) return;

        try {
            const comments = await apiRequest('/comments');
            
            if (!comments?.length) {
                DOM.commentsList.innerHTML = '<div class="loading">暂无评论，快来发表第一条评论吧！</div>';
                return;
            }
            
            DOM.commentsList.innerHTML = comments.map(comment => this.createCommentHTML(comment)).join('');
        } catch {
            DOM.commentsList.innerHTML = '<div class="loading">加载评论失败</div>';
        }
    },
    
    createCommentHTML(comment) {
        return `
            <div class="comment-item">
                <div class="comment-header">
                    <span class="comment-name">${this.escapeHtml(comment.name)}</span>
                    <span class="comment-time">${new Date(comment.created_at).toLocaleString()}</span>
                </div>
                <div class="comment-content">${this.escapeHtml(comment.content)}</div>
            </div>
        `;
    },
    
    async submit() {
        if (!DOM.commentName || !DOM.commentContent) return;

        const name = DOM.commentName.value.trim();
        const content = DOM.commentContent.value.trim();
        
        // 验证输入
        if (!this.validateInput(name, content)) return;
        
        try {
            await apiRequest('/comments', {
                method: 'POST',
                body: JSON.stringify({ name, content })
            });
            
            // 重置表单并重新加载
            DOM.commentName.value = '';
            DOM.commentContent.value = '';
            await Promise.all([this.load(), StatsManager.load()]);
            alert('评论提交成功！');
        } catch {
            alert('评论提交失败，请稍后重试！');
        }
    },
    
    validateInput(name, content) {
        if (!name || !content) {
            alert('请填写昵称和评论内容！');
            return false;
        }
        
        if (name.length > 20) {
            alert('昵称不能超过20个字符！');
            return false;
        }
        
        if (content.length > 200) {
            alert('评论内容不能超过200个字符！');
            return false;
        }
        
        return true;
    },
    
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
};

/**
 * 鼠标跟随效果
 */
function setupMouseFollow() {
    const handleMouseMove = (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.documentElement.style.setProperty('--mouse-x', x);
        document.documentElement.style.setProperty('--mouse-y', y);
    };
    
    // 使用节流优化鼠标移动事件
    let isThrottled = false;
    window.addEventListener('mousemove', (e) => {
        if (!isThrottled) {
            handleMouseMove(e);
            isThrottled = true;
            setTimeout(() => isThrottled = false, 50);
        }
    });
}

/**
 * 初始化
 */
function init() {
    // 检查必要的DOM元素
    if (!document.querySelector('.navbar') || !document.querySelector('.hero')) {
        console.error('关键DOM元素缺失，某些功能可能无法正常工作');
    }

    // 初始化功能
    createParticles();
    observeElements();
    setupSmoothScroll();
    setupNavbarScroll();
    setupQRCode();
    setupMouseFollow();
    
    // 绑定事件
    if (document.getElementById('commentSubmit')) {
        document.getElementById('commentSubmit').addEventListener('click', () => CommentManager.submit());
    }
    
    // 加载数据
    StatsManager.incrementVisit();
    StatsManager.load();
    CommentManager.load();
    
    // 暴露下载函数到全局
    window.downloadWindows = DOWNLOADS.windows;
    window.downloadMac = DOWNLOADS.mac;
    window.downloadNavicatWindows = DOWNLOADS.navicatWindows;
    window.downloadCursorWindows = DOWNLOADS.cursorWindows;
}

// DOM完全加载后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}