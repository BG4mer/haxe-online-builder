Haxe Online Builder — Self-Hosted
---------------------------------

This repository includes:
- A GitHub-Pages frontend code editor (Monaco + basic file tree)
- A VPS build server (Node.js + multer + Docker runner)
- A Docker container containing Haxe, Lime, and hxcpp for compilation

Directory structure:
frontend/   → GitHub Pages UI
server/     → Node backend (upload, job queue, docker run, download)
docker/     → Docker build environment (Haxe + Lime + hxcpp)

-------------------------------------------------
FRONTEND DEPLOYMENT (GitHub Pages)
-------------------------------------------------
1. Upload /frontend to a GitHub repo
2. Go to Settings → Pages → Deploy from main → folder = /frontend
3. Replace "YOUR_VPS_DOMAIN_OR_IP" inside frontend/app.js with your VPS URL

-------------------------------------------------
SERVER DEPLOYMENT (VPS)
-------------------------------------------------
1. Install Docker + Node.js
2. Upload server/ to VPS
3. Run:
   cd server
   npm install
4. Build Docker image:
   cd ../docker/haxe-build
   docker build -t haxe-builder:latest .
5. Start server:
   PORT=443 node index.js
6. Put behind NGINX reverse proxy + HTTPS

-------------------------------------------------
BUILD PROCESS
-------------------------------------------------
1. Frontend zips project files and POSTs → /compile
2. Server creates job directory
3. Docker container compiles Haxe → produces artifact ZIP
4. User polls /status/<jobId>
5. When done, /download/<jobId> returns built ZIP

-------------------------------------------------
SECURITY WARNING
-------------------------------------------------
You MUST enforce:
- request size limits
- API key or basic auth
- Docker resource limits
- nginx rate limiting
Otherwise someone can abuse your compiler
