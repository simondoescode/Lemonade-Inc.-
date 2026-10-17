import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

const base=process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  base,
  plugins:[VitePWA({
    registerType:'autoUpdate',
    injectRegister:'auto',
    includeAssets:['icon.svg'],
    manifest:{
      id:base,
      name:'Lemonade Inc. — Business Simulator',
      short_name:'Lemonade Inc.',
      description:'Build a lemonade empire in this original business simulation game.',
      start_url:base,
      scope:base,
      display:'standalone',
      orientation:'any',
      theme_color:'#123b48',
      background_color:'#e9f4eb',
      icons:[{src:'icon.svg',sizes:'any',type:'image/svg+xml',purpose:'any'}]
    },
    workbox:{
      globPatterns:['**/*.{html,css,js,svg,png,webp,ico}'],
      cleanupOutdatedCaches:true,
      navigateFallback:'index.html',
      maximumFileSizeToCacheInBytes:3*1024*1024
    },
    devOptions:{enabled:false}
  })],
  build:{outDir:'dist'}
});
