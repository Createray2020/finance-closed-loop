import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 公開路由：登入/註冊頁與 health 檢查
const isPublic = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/health',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublic(req)) {
    await auth.protect(); // 其餘一律需登入
  }
});

export const config = {
  matcher: [
    // 跳過 Next 內部與所有含副檔名的靜態檔（含 /prototype.html）
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
