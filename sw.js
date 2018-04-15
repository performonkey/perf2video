/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/YYPcyY
 */

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.6/workbox-sw.js"
);

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "build/performance-to-video.css",
    "revision": "719cbf3034cab99d2a4e1487cebf2823"
  },
  {
    "url": "build/performance-to-video.js",
    "revision": "b219294ff74c4615251c8b84aff7b542"
  },
  {
    "url": "build/performance-to-video/mzx2zlts.es5.js",
    "revision": "c48ac8afc510dfb3d25f85a9b848b0cf"
  },
  {
    "url": "build/performance-to-video/mzx2zlts.js",
    "revision": "b5e9fd9bd5813e8155d513de3c365f2c"
  },
  {
    "url": "build/performance-to-video/mzx2zlts.sc.es5.js",
    "revision": "8018506ecdd8735bbf7f680e57a890d7"
  },
  {
    "url": "build/performance-to-video/mzx2zlts.sc.js",
    "revision": "2fb4a457c933456e0cb17cca073575bf"
  },
  {
    "url": "build/performance-to-video/performance-to-video.u3t7nnbl.js",
    "revision": "5941cf8445800bea32583378d4b2ed5d"
  },
  {
    "url": "build/performance-to-video/performance-to-video.xtzeldzg.js",
    "revision": "6793346d8c2ee2974fb628a62caaaee0"
  },
  {
    "url": "index.html",
    "revision": "65b87a4c632105b295ef1a162863e607"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
