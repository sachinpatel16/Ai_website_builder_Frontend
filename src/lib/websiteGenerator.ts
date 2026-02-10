import { Page } from './supabase';

interface GeneratedWebsite {
  title: string;
  html_content: string;
  css_content: string;
  pages: Page[];
}

export function generateWebsite(prompt: string): GeneratedWebsite {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('portfolio') || lowerPrompt.includes('resume')) {
    return generatePortfolio(prompt);
  } else if (lowerPrompt.includes('landing') || lowerPrompt.includes('product')) {
    return generateLandingPage(prompt);
  } else if (lowerPrompt.includes('blog')) {
    return generateBlog(prompt);
  } else if (lowerPrompt.includes('ecommerce') || lowerPrompt.includes('shop') || lowerPrompt.includes('store')) {
    return generateEcommerce(prompt);
  } else if (lowerPrompt.includes('dashboard') || lowerPrompt.includes('admin')) {
    return generateDashboard(prompt);
  } else {
    return generateGenericWebsite(prompt);
  }
}

function generatePortfolio(prompt: string): GeneratedWebsite {
  const title = extractTitle(prompt, 'My Portfolio');

  return {
    title,
    html_content: `
      <div class="website-container">
        <header class="hero-section">
          <h1>${title}</h1>
          <p class="tagline">Creative Professional & Problem Solver</p>
        </header>

        <section class="about-section">
          <h2>About Me</h2>
          <p>I'm a passionate professional dedicated to creating amazing experiences. With years of experience in my field, I bring creativity and technical expertise to every project.</p>
        </section>

        <section class="projects-section">
          <h2>Featured Projects</h2>
          <div class="project-grid">
            <div class="project-card">
              <h3>Project One</h3>
              <p>An innovative solution that solved complex challenges.</p>
            </div>
            <div class="project-card">
              <h3>Project Two</h3>
              <p>A creative approach to modern problems.</p>
            </div>
            <div class="project-card">
              <h3>Project Three</h3>
              <p>Collaborative effort that exceeded expectations.</p>
            </div>
          </div>
        </section>

        <section class="contact-section">
          <h2>Get In Touch</h2>
          <p>Let's work together on your next project.</p>
          <button class="cta-button">Contact Me</button>
        </section>
      </div>
    `,
    css_content: `
      .website-container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
      .hero-section { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 20px; text-align: center; }
      .hero-section h1 { font-size: 3rem; margin: 0; }
      .tagline { font-size: 1.2rem; opacity: 0.9; margin-top: 10px; }
      section { padding: 60px 20px; max-width: 1200px; margin: 0 auto; }
      h2 { font-size: 2rem; margin-bottom: 30px; color: #333; }
      .project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
      .project-card { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s; }
      .project-card:hover { transform: translateY(-5px); box-shadow: 0 8px 12px rgba(0,0,0,0.15); }
      .project-card h3 { color: #667eea; margin-bottom: 10px; }
      .contact-section { text-align: center; background: #f8f9fa; }
      .cta-button { background: #667eea; color: white; border: none; padding: 15px 40px; border-radius: 25px; font-size: 1rem; cursor: pointer; transition: background 0.3s; }
      .cta-button:hover { background: #5568d3; }
    `,
    pages: []
  };
}

function generateLandingPage(prompt: string): GeneratedWebsite {
  const title = extractTitle(prompt, 'Amazing Product');

  return {
    title,
    html_content: `
      <div class="website-container">
        <nav class="navbar">
          <div class="logo">${title}</div>
          <button class="nav-cta">Get Started</button>
        </nav>

        <section class="hero">
          <h1>Transform Your Business Today</h1>
          <p class="hero-subtitle">The ultimate solution for modern businesses looking to scale</p>
          <button class="hero-cta">Start Free Trial</button>
        </section>

        <section class="features">
          <h2>Why Choose Us</h2>
          <div class="feature-grid">
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Optimized performance that keeps you ahead</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔒</div>
              <h3>Secure</h3>
              <p>Enterprise-grade security you can trust</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📊</div>
              <h3>Analytics</h3>
              <p>Deep insights to drive your decisions</p>
            </div>
          </div>
        </section>

        <section class="cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of satisfied customers</p>
          <button class="final-cta">Sign Up Now</button>
        </section>
      </div>
    `,
    css_content: `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      .website-container { font-family: 'Arial', sans-serif; }
      .navbar { display: flex; justify-content: space-between; align-items: center; padding: 20px 50px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      .logo { font-size: 1.5rem; font-weight: bold; color: #2563eb; }
      .nav-cta { background: #2563eb; color: white; border: none; padding: 10px 25px; border-radius: 6px; cursor: pointer; }
      .hero { text-align: center; padding: 120px 20px; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; }
      .hero h1 { font-size: 3.5rem; margin-bottom: 20px; }
      .hero-subtitle { font-size: 1.3rem; opacity: 0.95; margin-bottom: 40px; }
      .hero-cta { background: white; color: #2563eb; border: none; padding: 18px 45px; border-radius: 30px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: transform 0.3s; }
      .hero-cta:hover { transform: scale(1.05); }
      .features { padding: 80px 20px; max-width: 1200px; margin: 0 auto; }
      .features h2 { text-align: center; font-size: 2.5rem; margin-bottom: 60px; color: #1e293b; }
      .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; }
      .feature-card { text-align: center; padding: 40px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.08); }
      .feature-icon { font-size: 3rem; margin-bottom: 20px; }
      .feature-card h3 { font-size: 1.5rem; margin-bottom: 15px; color: #1e293b; }
      .feature-card p { color: #64748b; line-height: 1.6; }
      .cta-section { text-align: center; padding: 100px 20px; background: #f8fafc; }
      .cta-section h2 { font-size: 2.5rem; margin-bottom: 15px; color: #1e293b; }
      .cta-section p { font-size: 1.2rem; color: #64748b; margin-bottom: 40px; }
      .final-cta { background: #2563eb; color: white; border: none; padding: 18px 45px; border-radius: 30px; font-size: 1.1rem; font-weight: bold; cursor: pointer; }
    `,
    pages: []
  };
}

function generateBlog(prompt: string): GeneratedWebsite {
  const title = extractTitle(prompt, 'My Blog');

  return {
    title,
    html_content: `
      <div class="website-container">
        <header class="blog-header">
          <h1>${title}</h1>
          <p>Thoughts, stories, and ideas</p>
        </header>

        <div class="blog-layout">
          <main class="blog-content">
            <article class="blog-post">
              <h2>Welcome to My Blog</h2>
              <div class="post-meta">Published on January 8, 2026</div>
              <p>This is where I share my thoughts, experiences, and insights on various topics. Stay tuned for more content!</p>
            </article>

            <article class="blog-post">
              <h2>Getting Started</h2>
              <div class="post-meta">Published on January 7, 2026</div>
              <p>Welcome to this new journey. I'm excited to share my knowledge and learn from this community.</p>
            </article>
          </main>

          <aside class="blog-sidebar">
            <div class="sidebar-widget">
              <h3>About</h3>
              <p>A blog about life, technology, and everything in between.</p>
            </div>
            <div class="sidebar-widget">
              <h3>Categories</h3>
              <ul>
                <li>Technology</li>
                <li>Lifestyle</li>
                <li>Travel</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    `,
    css_content: `
      .website-container { font-family: Georgia, serif; background: #fafafa; min-height: 100vh; }
      .blog-header { background: white; padding: 60px 20px; text-align: center; border-bottom: 1px solid #e5e5e5; }
      .blog-header h1 { font-size: 2.5rem; margin-bottom: 10px; color: #1a1a1a; }
      .blog-header p { color: #666; font-style: italic; }
      .blog-layout { display: grid; grid-template-columns: 1fr 300px; gap: 40px; max-width: 1200px; margin: 40px auto; padding: 0 20px; }
      .blog-post { background: white; padding: 40px; margin-bottom: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
      .blog-post h2 { font-size: 1.8rem; margin-bottom: 15px; color: #1a1a1a; }
      .post-meta { color: #999; font-size: 0.9rem; margin-bottom: 20px; font-family: Arial, sans-serif; }
      .blog-post p { line-height: 1.8; color: #333; }
      .blog-sidebar { }
      .sidebar-widget { background: white; padding: 25px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
      .sidebar-widget h3 { font-size: 1.2rem; margin-bottom: 15px; color: #1a1a1a; }
      .sidebar-widget ul { list-style: none; }
      .sidebar-widget li { padding: 8px 0; color: #666; cursor: pointer; }
      .sidebar-widget li:hover { color: #000; }
      @media (max-width: 768px) { .blog-layout { grid-template-columns: 1fr; } }
    `,
    pages: [
      {
        name: 'Home',
        path: '/',
        content: 'home'
      },
      {
        name: 'About',
        path: '/about',
        content: 'about'
      },
      {
        name: 'Archive',
        path: '/archive',
        content: 'archive'
      }
    ]
  };
}

function generateEcommerce(prompt: string): GeneratedWebsite {
  const title = extractTitle(prompt, 'Online Store');

  return {
    title,
    html_content: `
      <div class="website-container">
        <nav class="shop-nav">
          <div class="shop-logo">${title}</div>
          <div class="nav-links">
            <span>Shop</span>
            <span>About</span>
            <span>Cart (0)</span>
          </div>
        </nav>

        <section class="shop-hero">
          <h1>New Collection</h1>
          <p>Discover our latest products</p>
          <button class="shop-btn">Shop Now</button>
        </section>

        <section class="products-section">
          <h2>Featured Products</h2>
          <div class="product-grid">
            <div class="product-card">
              <div class="product-image">📦</div>
              <h3>Product One</h3>
              <p class="price">$99.00</p>
              <button class="add-to-cart">Add to Cart</button>
            </div>
            <div class="product-card">
              <div class="product-image">📦</div>
              <h3>Product Two</h3>
              <p class="price">$149.00</p>
              <button class="add-to-cart">Add to Cart</button>
            </div>
            <div class="product-card">
              <div class="product-image">📦</div>
              <h3>Product Three</h3>
              <p class="price">$79.00</p>
              <button class="add-to-cart">Add to Cart</button>
            </div>
            <div class="product-card">
              <div class="product-image">📦</div>
              <h3>Product Four</h3>
              <p class="price">$199.00</p>
              <button class="add-to-cart">Add to Cart</button>
            </div>
          </div>
        </section>
      </div>
    `,
    css_content: `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      .website-container { font-family: 'Arial', sans-serif; }
      .shop-nav { display: flex; justify-content: space-between; align-items: center; padding: 20px 50px; background: #1f2937; color: white; }
      .shop-logo { font-size: 1.5rem; font-weight: bold; }
      .nav-links { display: flex; gap: 30px; }
      .nav-links span { cursor: pointer; transition: opacity 0.3s; }
      .nav-links span:hover { opacity: 0.7; }
      .shop-hero { text-align: center; padding: 100px 20px; background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: white; }
      .shop-hero h1 { font-size: 3rem; margin-bottom: 20px; }
      .shop-hero p { font-size: 1.2rem; margin-bottom: 30px; }
      .shop-btn { background: white; color: #f59e0b; border: none; padding: 15px 40px; border-radius: 25px; font-size: 1rem; font-weight: bold; cursor: pointer; }
      .products-section { padding: 80px 20px; max-width: 1200px; margin: 0 auto; }
      .products-section h2 { text-align: center; font-size: 2.5rem; margin-bottom: 50px; color: #1f2937; }
      .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; }
      .product-card { background: white; border-radius: 12px; padding: 30px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s; }
      .product-card:hover { transform: translateY(-5px); box-shadow: 0 8px 12px rgba(0,0,0,0.15); }
      .product-image { font-size: 4rem; margin-bottom: 20px; }
      .product-card h3 { font-size: 1.3rem; margin-bottom: 10px; color: #1f2937; }
      .price { font-size: 1.5rem; font-weight: bold; color: #f59e0b; margin: 15px 0; }
      .add-to-cart { background: #1f2937; color: white; border: none; padding: 12px 30px; border-radius: 6px; cursor: pointer; transition: background 0.3s; }
      .add-to-cart:hover { background: #374151; }
    `,
    pages: [
      {
        name: 'Products',
        path: '/products',
        content: 'products'
      },
      {
        name: 'Cart',
        path: '/cart',
        content: 'cart'
      },
      {
        name: 'Checkout',
        path: '/checkout',
        content: 'checkout'
      }
    ]
  };
}

function generateDashboard(prompt: string): GeneratedWebsite {
  const title = extractTitle(prompt, 'Dashboard');

  return {
    title,
    html_content: `
      <div class="website-container">
        <div class="dashboard-layout">
          <aside class="sidebar">
            <div class="sidebar-header">
              <h2>${title}</h2>
            </div>
            <nav class="sidebar-nav">
              <div class="nav-item active">📊 Overview</div>
              <div class="nav-item">📈 Analytics</div>
              <div class="nav-item">👥 Users</div>
              <div class="nav-item">⚙️ Settings</div>
            </nav>
          </aside>

          <main class="dashboard-main">
            <header class="dashboard-header">
              <h1>Overview</h1>
            </header>

            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-label">Total Users</div>
                <div class="stat-value">1,234</div>
                <div class="stat-change positive">+12.5%</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Revenue</div>
                <div class="stat-value">$45,678</div>
                <div class="stat-change positive">+8.2%</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Active Sessions</div>
                <div class="stat-value">456</div>
                <div class="stat-change negative">-3.1%</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Conversion Rate</div>
                <div class="stat-value">3.24%</div>
                <div class="stat-change positive">+0.5%</div>
              </div>
            </div>

            <div class="dashboard-content">
              <div class="content-card">
                <h3>Recent Activity</h3>
                <div class="activity-list">
                  <div class="activity-item">New user registration</div>
                  <div class="activity-item">Payment received</div>
                  <div class="activity-item">Report generated</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    `,
    css_content: `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      .website-container { font-family: 'Arial', sans-serif; background: #f3f4f6; min-height: 100vh; }
      .dashboard-layout { display: grid; grid-template-columns: 250px 1fr; min-height: 100vh; }
      .sidebar { background: #1f2937; color: white; padding: 20px; }
      .sidebar-header h2 { font-size: 1.5rem; margin-bottom: 30px; }
      .sidebar-nav { }
      .nav-item { padding: 12px 15px; margin-bottom: 5px; border-radius: 6px; cursor: pointer; transition: background 0.3s; }
      .nav-item:hover { background: #374151; }
      .nav-item.active { background: #4f46e5; }
      .dashboard-main { padding: 30px; }
      .dashboard-header { margin-bottom: 30px; }
      .dashboard-header h1 { font-size: 2rem; color: #1f2937; }
      .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 30px; }
      .stat-card { background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
      .stat-label { color: #6b7280; font-size: 0.9rem; margin-bottom: 10px; }
      .stat-value { font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 8px; }
      .stat-change { font-size: 0.9rem; }
      .stat-change.positive { color: #10b981; }
      .stat-change.negative { color: #ef4444; }
      .dashboard-content { }
      .content-card { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
      .content-card h3 { font-size: 1.3rem; margin-bottom: 20px; color: #1f2937; }
      .activity-list { }
      .activity-item { padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #4b5563; }
      .activity-item:last-child { border-bottom: none; }
    `,
    pages: [
      {
        name: 'Overview',
        path: '/',
        content: 'overview'
      },
      {
        name: 'Analytics',
        path: '/analytics',
        content: 'analytics'
      },
      {
        name: 'Users',
        path: '/users',
        content: 'users'
      }
    ]
  };
}

function generateGenericWebsite(prompt: string): GeneratedWebsite {
  const title = extractTitle(prompt, 'My Website');

  return {
    title,
    html_content: `
      <div class="website-container">
        <header class="header">
          <h1>${title}</h1>
          <nav class="nav">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <main class="main-content">
          <section class="section">
            <h2>Welcome</h2>
            <p>${prompt}</p>
          </section>

          <section class="section">
            <h2>Our Services</h2>
            <div class="cards">
              <div class="card">
                <h3>Service One</h3>
                <p>Quality service tailored to your needs</p>
              </div>
              <div class="card">
                <h3>Service Two</h3>
                <p>Expert solutions for modern challenges</p>
              </div>
              <div class="card">
                <h3>Service Three</h3>
                <p>Innovative approaches to your goals</p>
              </div>
            </div>
          </section>
        </main>

        <footer class="footer">
          <p>&copy; 2026 ${title}. All rights reserved.</p>
        </footer>
      </div>
    `,
    css_content: `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      .website-container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; min-height: 100vh; display: flex; flex-direction: column; }
      .header { background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 30px 50px; }
      .header h1 { font-size: 2rem; margin-bottom: 15px; }
      .nav { display: flex; gap: 25px; }
      .nav a { color: white; text-decoration: none; opacity: 0.9; transition: opacity 0.3s; }
      .nav a:hover { opacity: 1; }
      .main-content { flex: 1; padding: 60px 50px; max-width: 1200px; margin: 0 auto; width: 100%; }
      .section { margin-bottom: 60px; }
      .section h2 { font-size: 2rem; margin-bottom: 20px; color: #1e293b; }
      .section p { line-height: 1.8; color: #475569; font-size: 1.1rem; }
      .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-top: 30px; }
      .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s; }
      .card:hover { transform: translateY(-5px); box-shadow: 0 8px 12px rgba(0,0,0,0.15); }
      .card h3 { color: #0ea5e9; margin-bottom: 10px; font-size: 1.3rem; }
      .card p { color: #64748b; line-height: 1.6; }
      .footer { background: #1e293b; color: white; text-align: center; padding: 30px; }
    `,
    pages: []
  };
}

function extractTitle(prompt: string, defaultTitle: string): string {
  const titleMatch = prompt.match(/(?:for|called|named)\s+["']?([^"'\n]+)["']?/i);
  if (titleMatch) {
    return titleMatch[1].trim();
  }

  const words = prompt.split(' ');
  if (words.length > 0 && words.length <= 5) {
    return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  return defaultTitle;
}
