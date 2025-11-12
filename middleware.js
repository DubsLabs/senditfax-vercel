import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Пропускаємо статичні ресурси Next.js та API routes
  if (pathname.startsWith('/_next/') || 
      pathname.startsWith('/api/') || 
      pathname === '/favicon.ico') {
    return NextResponse.next();
  }

  // Перевіряємо, чи це запит до блогу
  const isBlogPath = pathname === '/blog' || 
                     pathname.startsWith('/blog/') || 
                     /^\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)$/.test(pathname);
  
  if (isBlogPath) {
    try {
      // Створюємо новий URL для проксування до WordPress
      const blogUrl = new URL(`https://blog.senditfax.com${pathname}${search}`);
      
      // Виконуємо запит до WordPress
      const response = await fetch(blogUrl.toString(), {
        headers: {
          'User-Agent': request.headers.get('user-agent') || '',
          'Accept': request.headers.get('accept') || 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': request.headers.get('accept-language') || 'en-US,en;q=0.9',
        },
      });
      
      if (!response.ok) {
        return NextResponse.next();
      }
      
      // Перевіряємо тип контенту - обробляємо тільки HTML
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('text/html')) {
        // Для не-HTML контенту (CSS, JS, зображення) повертаємо оригінальну відповідь
        const body = await response.arrayBuffer();
        return new NextResponse(body, {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
        });
      }
      
      // Отримуємо HTML контент
      const html = await response.text();
      
      // Замінюємо всі посилання blog.senditfax.com на senditfax.com
      const modifiedHtml = html
        .replace(/https?:\/\/blog\.senditfax\.com/gi, 'https://senditfax.com')
        .replace(/blog\.senditfax\.com/gi, 'senditfax.com')
        .replace(/href="https:\/\/blog\.senditfax\.com/gi, 'href="https://senditfax.com')
        .replace(/src="https:\/\/blog\.senditfax\.com/gi, 'src="https://senditfax.com')
        .replace(/action="https:\/\/blog\.senditfax\.com/gi, 'action="https://senditfax.com')
        .replace(/url\(https:\/\/blog\.senditfax\.com/gi, 'url(https://senditfax.com');
      
      // Створюємо нову відповідь з модифікованим HTML
      return new NextResponse(modifiedHtml, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      });
    } catch (error) {
      // У разі помилки просто продовжуємо з rewrites
      console.error('Blog proxy error:', error);
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/blog',
    '/blog/:path*',
    '/:year/:month/:day/:slug',
  ],
};

