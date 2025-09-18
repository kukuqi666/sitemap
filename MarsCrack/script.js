// 粒子效果
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// 滚动动画
function observeElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// 平滑滚动
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 导航栏滚动效果和背景图片控制
function setupNavbarScroll() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroHeight = hero.offsetHeight;
        
        // 导航栏背景变化
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.borderBottom = '1px solid rgba(255, 99, 71, 0.3)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.3)';
            navbar.style.borderBottom = '1px solid rgba(255, 99, 71, 0.1)';
        }

        // 背景图片滚动隐藏效果
        if (scrollTop > heroHeight * 0.8) {
            hero.style.backgroundImage = 'none';
        } else {
            hero.style.backgroundImage = 'url("bg.jpg")';
        }

        lastScrollTop = scrollTop;
    });
}

// 下载功能
function downloadWindows() {
    // 先显示提示信息
    if (confirm('即将开始下载 Windows 版本应用\n\n如果下载没有自动开始，请检查浏览器设置或联开发者')) {
        // 用户确认后创建下载链接
        const link = document.createElement('a');
        link.href = 'https://github.com/kukuqi666/scripts/releases/download/v1.1.1.1/windows.bat';
        link.download = 'windows.bat';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function downloadMac() {
    // 先显示提示信息
    if (confirm('即将开始下载 macOS 版本应用\n\n如果下载没有自动开始，请检查浏览器设置或联系开发者')) {
        // 用户确认后创建下载链接
        const link = document.createElement('a');
        link.href = 'https://github.com/kukuqi666/scripts/releases/download/v1.1.1.1/mac.sh';
        link.download = 'mac.sh';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function downloadNavicatWindows() {
    // 先显示提示信息
    if (confirm('即将开始下载 Windows 版本应用\n\n如果下载没有自动开始，请检查浏览器设置或联开发者')) {
        // 用户确认后创建下载链接
        const link = document.createElement('a');
        link.href = 'https://github.com/kukuqi666/scripts/releases/download/v2.2.2.2/Navicat17.zip';
        link.download = 'Navicat17.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function downloadCursorWindows() {
    // 先显示提示信息
    if (confirm('即将开始下载 Windows 版本应用\n\n如果下载没有自动开始，请检查浏览器设置或联系开发者')) {
        // 用户确认后创建下载链接
        const link = document.createElement('a');
        link.href = 'https://github.com/kukuqi666/scripts/releases/download/v2.2.2.2/Mars-Cursor.222.zip';
        link.download = 'Mars-Cursor无限续杯222.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// 二维码图片加载处理
function setupQRCode() {
    const qrImg = document.querySelector('.qr-image img');
    const qrPlaceholder = document.querySelector('.qr-image > div');
    
    // 如果有真实的二维码图片，可以在这里设置
    qrImg.src = './image.jpg'; // 取消注释并设置真实路径
    qrImg.style.display = 'block';
    qrPlaceholder.style.display = 'none';
}

// API配置
const API_BASE = 'https://api.mashang-dian.com/api';

// 获取统计数据
async function loadStats() {
    try {
        const response = await fetch(`${API_BASE}/stats`);
        const data = await response.json();
        
        document.getElementById('visitCount').textContent = data.visitCount.toLocaleString();
        document.getElementById('uptime').textContent = data.uptime;
        document.getElementById('commentCount').textContent = data.commentCount;
    } catch (error) {
        console.error('加载统计数据失败:', error);
        document.getElementById('visitCount').textContent = '加载失败';
        document.getElementById('uptime').textContent = '加载失败';
        document.getElementById('commentCount').textContent = '加载失败';
    }
}

// 增加访问量
async function incrementVisit() {
    try {
        await fetch(`${API_BASE}/visit`, { method: 'POST' });
    } catch (error) {
        console.error('记录访问失败:', error);
    }
}

// 获取评论列表
async function loadComments() {
    try {
        const response = await fetch(`${API_BASE}/comments`);
        const comments = await response.json();
             
        const commentsList = document.getElementById('commentsList');
             
        if (comments.length === 0) {
            commentsList.innerHTML = '<div class="loading">暂无评论，快来发表第一条评论吧！</div>';
            return;
        }
             
        commentsList.innerHTML = comments.map(comment => `
            <div class="comment-item">
                <div class="comment-header">
                    <span class="comment-name">${comment.name}</span>
                    <span class="comment-time">${new Date(comment.created_at).toLocaleString()}</span>
                </div>
                <div class="comment-content">${comment.content}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('加载评论失败:', error);
        document.getElementById('commentsList').innerHTML = '<div class="loading">加载评论失败</div>';
    }
}

// 提交评论
async function submitComment() {
    const name = document.getElementById('commentName').value.trim();
    const content = document.getElementById('commentContent').value.trim();
    
    if (!name || !content) {
        alert('请填写昵称和评论内容！');
        return;
    }
    
    if (name.length > 20) {
        alert('昵称不能超过20个字符！');
        return;
    }
    
    if (content.length > 200) {
        alert('评论内容不能超过200个字符！');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, content })
        });
        
        if (response.ok) {
            document.getElementById('commentName').value = '';
            document.getElementById('commentContent').value = '';
            loadComments(); // 重新加载评论列表
            loadStats(); // 更新评论数量统计
            alert('评论提交成功！');
        } else {
            alert('评论提交失败，请稍后重试！');
        }
    } catch (error) {
        console.error('提交评论失败:', error);
        alert('评论提交失败，请稍后重试！');
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    observeElements();
    setupSmoothScroll();
    setupNavbarScroll();
    setupQRCode();
    
    // 记录访问量
    incrementVisit();
    
    // 加载数据
    loadStats();
    loadComments();
});

// 鼠标跟随效果
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.bg-animation::before');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
});