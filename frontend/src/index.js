import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />
 
);


let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show custom install button after 3 seconds
  setTimeout(() => {
    const banner = document.createElement('div');
    banner.id = 'install-banner';
    banner.innerHTML = `
      <div style="
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(3,14,5,0.96);
        border: 0.5px solid rgba(98,222,68,0.4);
        borderRadius: 40px;
        padding: 14px 24px;
        display: flex;
        align-items: center;
        gap: 14px;
        zIndex: 99999;
        backdropFilter: blur(20px);
        boxShadow: 0 0 40px rgba(40,180,40,0.2);
        fontFamily: Georgia, serif;
        cursor: pointer;
        animation: fadeUp 0.5s ease;
      ">
        <span style="font-size:20px">🌿</span>
        <span style="color:rgba(172,242,142,0.96);font-size:13px;font-style:italic;letter-spacing:0.08em;">
          Add Chianya to your home screen
        </span>
        <span style="
          color:rgba(98,222,68,0.5);
          font-size:11px;
          cursor:pointer;
          padding: 2px 8px;
        " id="dismiss-install">✕</span>
      </div>
    `;
    
    document.body.appendChild(banner);
    
    banner.addEventListener('click', async (e) => {
      if (e.target.id === 'dismiss-install') {
        banner.remove();
        return;
      }
      banner.remove();
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
    });
    
    // Auto dismiss after 8 seconds
    setTimeout(() => banner?.remove(), 8000);
  }, 3000);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then(() => {
      console.log("Chianya SW registered");
    }).catch((err) => {
      console.log("SW registration failed:", err);
    });
  });
}