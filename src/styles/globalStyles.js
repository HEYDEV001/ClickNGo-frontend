export const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,700&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

:root {
  --yellow: #FFE033;
  --yellow2: #FFC700;
  --yellow-dim: rgba(255,224,51,0.12);
  --yellow-glow: rgba(255,224,51,0.35);
  --black: #08080f;
  --black2: #10101a;
  --black3: #18182a;
  --white: #ffffff;
  --off: #f5f5fa;
  --gray-bg: #f0f0f6;
  --gray-line: #e2e2ec;
  --gray-mid: #9898b0;
  --gray-text: #60607a;
  --green: #22c55e;
  --green-dim: rgba(34,197,94,0.15);
  --red: #ef4444;
  --red-dim: rgba(239,68,68,0.15);
  --blue: #3b82f6;

  --glass: rgba(255,255,255,0.10);
  --glass-strong: rgba(255,255,255,0.16);
  --glass-border: rgba(255,255,255,0.22);
  --glass-border-strong: rgba(255,255,255,0.35);
  --glass-shadow: 0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.18);
  --glass-blur: blur(22px) saturate(200%);

  --r: 20px;
  --r-sm: 12px;
  --ease: cubic-bezier(.4,0,.2,1);
}

*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  font-family:'DM Sans',sans-serif;
  background:var(--black);
  color:var(--white);
  min-height:100vh;
  overflow-x:hidden;
}
input,textarea,select{font-family:'DM Sans',sans-serif;}
button{font-family:'DM Sans',sans-serif;cursor:pointer;}

.glass{
  background:var(--glass);
  backdrop-filter:var(--glass-blur);
  -webkit-backdrop-filter:var(--glass-blur);
  border:1px solid var(--glass-border);
  box-shadow:var(--glass-shadow);
}
.glass-strong{
  background:var(--glass-strong);
  backdrop-filter:var(--glass-blur);
  -webkit-backdrop-filter:var(--glass-blur);
  border:1px solid var(--glass-border-strong);
  box-shadow:var(--glass-shadow);
}
.glass-card{
  background:rgba(255,255,255,0.07);
  backdrop-filter:blur(16px) saturate(160%);
  -webkit-backdrop-filter:blur(16px) saturate(160%);
  border:1px solid rgba(255,255,255,0.12);
  box-shadow:0 4px 24px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.1);
  border-radius:var(--r);
}
.glass-yellow{
  background:rgba(255,224,51,0.10);
  backdrop-filter:blur(20px) saturate(180%);
  -webkit-backdrop-filter:blur(20px) saturate(180%);
  border:1px solid rgba(255,224,51,0.25);
  box-shadow:0 4px 24px rgba(255,224,51,0.1);
}

::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:99px;}

@keyframes fadeUp{
  from{opacity:0;transform:translateY(28px);}
  to{opacity:1;transform:translateY(0);}
}
@keyframes fadeIn{
  from{opacity:0;}
  to{opacity:1;}
}
@keyframes scaleIn{
  from{opacity:0;transform:scale(0.93);}
  to{opacity:1;transform:scale(1);}
}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes float{
  0%,100%{transform:translateY(0) rotate(0deg);}
  50%{transform:translateY(-20px) rotate(3deg);}
}
@keyframes pulse{
  0%,100%{opacity:1;transform:scale(1);}
  50%{opacity:0.6;transform:scale(0.97);}
}
@keyframes slideIn{
  from{transform:translateX(-100%);}
  to{transform:translateX(0);}
}
@keyframes shimmer{
  0%{background-position:-200% 0;}
  100%{background-position:200% 0;}
}
@keyframes liquidBlob{
  0%,100%{border-radius:60% 40% 30% 70% / 60% 30% 70% 40%;}
  25%{border-radius:30% 60% 70% 40% / 50% 60% 30% 60%;}
  50%{border-radius:50% 60% 30% 60% / 30% 40% 70% 60%;}
  75%{border-radius:60% 40% 60% 30% / 60% 70% 30% 40%;}
}
@keyframes toastIn{
  from{opacity:0;transform:translateX(-50%) translateY(20px);}
  to{opacity:1;transform:translateX(-50%) translateY(0);}
}

.animate-fade-up{animation:fadeUp 0.5s var(--ease) both;}
.animate-fade-in{animation:fadeIn 0.4s ease both;}
.animate-scale{animation:scaleIn 0.4s var(--ease) both;}

.d1{animation-delay:.05s!important;}
.d2{animation-delay:.1s!important;}
.d3{animation-delay:.15s!important;}
.d4{animation-delay:.2s!important;}
.d5{animation-delay:.25s!important;}
.d6{animation-delay:.3s!important;}

.toast{
  position:fixed;bottom:32px;left:50%;
  transform:translateX(-50%) translateY(20px);
  background:rgba(10,10,15,0.9);
  backdrop-filter:blur(20px);
  border:1px solid rgba(255,224,51,0.3);
  color:#fff;
  padding:14px 28px;
  border-radius:999px;
  font-size:14px;font-weight:500;
  box-shadow:0 8px 30px rgba(0,0,0,0.3);
  z-index:9999;
  animation:toastIn 0.4s var(--ease) both;
  pointer-events:none;
  white-space:nowrap;
}

.nav{
  position:fixed;top:0;left:0;right:0;
  height:64px;
  display:flex;align-items:center;
  padding:0 32px;
  gap:20px;
  z-index:500;
  background:rgba(8,8,15,0.6);
  backdrop-filter:blur(24px) saturate(200%);
  -webkit-backdrop-filter:blur(24px) saturate(200%);
  border-bottom:1px solid rgba(255,255,255,0.08);
  box-shadow:0 2px 24px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.05);
}
.nav-logo{
  font-family:'Playfair Display',serif;
  font-size:22px;font-weight:700;
  color:var(--white);
  white-space:nowrap;
  letter-spacing:-0.5px;
  cursor:pointer;
}
.nav-logo span{color:var(--yellow);}
.nav-loc{
  display:flex;align-items:center;gap:6px;
  color:var(--gray-mid);font-size:13px;
  white-space:nowrap;
}
.nav-search{
  flex:1;max-width:360px;
  background:rgba(255,255,255,0.07);
  border:1px solid rgba(255,255,255,0.1);
  border-radius:999px;
  padding:8px 16px 8px 38px;
  color:#fff;font-size:13px;
  transition:all .25s;
  position:relative;
}
.nav-search:focus{
  background:rgba(255,255,255,0.11);
  border-color:rgba(255,224,51,0.4);
  box-shadow:0 0 0 3px rgba(255,224,51,0.1);
}
.nav-search::placeholder{color:rgba(255,255,255,0.3);}
.nav-search-wrap{position:relative;flex:1;max-width:360px;}
.nav-search-icon{
  position:absolute;left:12px;top:50%;transform:translateY(-50%);
  color:rgba(255,255,255,0.3);pointer-events:none;
}
.nav-tabs{display:flex;gap:2px;margin-left:auto;}
.nav-tab{
  padding:7px 16px;
  border-radius:999px;
  font-size:13px;font-weight:500;
  color:rgba(255,255,255,0.5);
  cursor:pointer;
  transition:all .2s;
  border:1px solid transparent;
}
.nav-tab:hover{color:#fff;background:rgba(255,255,255,0.06);}
.nav-tab.active{
  background:var(--yellow);
  color:var(--black);
  font-weight:700;
  border-color:transparent;
}
.nav-right{display:flex;align-items:center;gap:12px;flex-shrink:0;}
.nav-btn{
  padding:7px 18px;
  border-radius:999px;
  font-size:13px;font-weight:600;
  cursor:pointer;
  transition:all .2s;
  border:1px solid rgba(255,255,255,0.15);
  background:transparent;
  color:#fff;
}
.nav-btn:hover{background:rgba(255,255,255,0.08);}
.nav-btn.primary{
  background:var(--yellow);
  color:var(--black);
  border-color:transparent;
}
.nav-btn.primary:hover{
  background:#ffd000;
  box-shadow:0 4px 16px var(--yellow-glow);
}
.nav-user{
  display:flex;align-items:center;gap:10px;
  cursor:pointer;
  padding:5px 14px 5px 5px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,0.1);
  background:rgba(255,255,255,0.05);
  transition:all .2s;
}
.nav-user:hover{background:rgba(255,255,255,0.1);}
.nav-avatar{
  width:32px;height:32px;border-radius:50%;
  background:linear-gradient(135deg,#2a2a3a,#3a3a5a);
  display:flex;align-items:center;justify-content:center;
  font-size:13px;font-weight:700;color:var(--yellow);
  border:1.5px solid rgba(255,224,51,0.3);
}

.page{
  min-height:100vh;
  padding-top:64px;
}

.hero-bg{
  position:absolute;inset:0;
  overflow:hidden;pointer-events:none;
}
.blob{
  position:absolute;
  border-radius:50%;
  filter:blur(80px);
  animation:liquidBlob 8s ease-in-out infinite;
}

.section{padding:72px 48px;}
.section-title{
  font-family:'Playfair Display',serif;
  font-size:clamp(28px,4vw,42px);
  font-weight:700;
  line-height:1.15;
}
.section-sub{
  font-size:16px;
  color:var(--gray-mid);
  margin-top:10px;
  line-height:1.6;
}

.card-hover{
  transition:transform .25s var(--ease),box-shadow .25s var(--ease);
  cursor:pointer;
}
.card-hover:hover{
  transform:translateY(-4px);
  box-shadow:0 16px 48px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.12);
}

.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:13px 28px;
  border-radius:999px;
  font-size:15px;font-weight:600;
  cursor:pointer;
  transition:all .2s;
  border:none;
  letter-spacing:0.1px;
}
.btn-yellow{
  background:var(--yellow);
  color:var(--black);
}
.btn-yellow:hover{
  background:#ffd000;
  transform:translateY(-2px);
  box-shadow:0 8px 28px var(--yellow-glow);
}
.btn-glass{
  background:var(--glass);
  backdrop-filter:var(--glass-blur);
  -webkit-backdrop-filter:var(--glass-blur);
  border:1px solid var(--glass-border);
  color:#fff;
}
.btn-glass:hover{
  background:var(--glass-strong);
  transform:translateY(-2px);
}
.btn-outline{
  background:transparent;
  border:1.5px solid rgba(255,255,255,0.2);
  color:#fff;
}
.btn-outline:hover{
  background:rgba(255,255,255,0.06);
  border-color:rgba(255,255,255,0.35);
}

.form-input{
  width:100%;
  padding:13px 18px;
  border-radius:var(--r-sm);
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.1);
  color:#fff;
  font-size:14px;
  transition:all .2s;
}
.form-input:focus{
  background:rgba(255,255,255,0.09);
  border-color:rgba(255,224,51,0.4);
  box-shadow:0 0 0 3px rgba(255,224,51,0.08);
}
.form-input::placeholder{color:rgba(255,255,255,0.3);}
.form-label{
  font-size:12px;font-weight:600;
  color:var(--gray-mid);
  text-transform:uppercase;letter-spacing:.6px;
  margin-bottom:6px;display:block;
}

.chip{
  display:inline-flex;align-items:center;gap:6px;
  padding:8px 18px;
  border-radius:999px;
  font-size:13px;font-weight:500;
  cursor:pointer;
  transition:all .2s;
  border:1px solid rgba(255,255,255,0.12);
  background:rgba(255,255,255,0.05);
  color:rgba(255,255,255,0.7);
}
.chip:hover{border-color:rgba(255,255,255,0.25);color:#fff;}
.chip.active{
  background:var(--yellow);
  color:var(--black);
  border-color:transparent;
  font-weight:700;
}

.stars{display:flex;align-items:center;gap:2px;}
.star{color:#FFB800;font-size:13px;}
.star.empty{color:rgba(255,255,255,0.15);}

.badge{
  display:inline-flex;align-items:center;
  padding:3px 10px;border-radius:999px;
  font-size:11px;font-weight:600;
  text-transform:uppercase;letter-spacing:.4px;
}
.badge-green{background:var(--green-dim);color:var(--green);}
.badge-red{background:var(--red-dim);color:var(--red);}
.badge-yellow{background:var(--yellow-dim);color:var(--yellow2);}

.divider{
  display:flex;align-items:center;gap:16px;
  color:var(--gray-text);font-size:13px;
  margin:20px 0;
}
.divider::before,.divider::after{
  content:'';flex:1;
  height:1px;background:rgba(255,255,255,0.1);
}

.social-btn{
  width:100%;
  padding:12px;
  border-radius:var(--r-sm);
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.1);
  color:#fff;
  font-size:14px;font-weight:500;
  display:flex;align-items:center;justify-content:center;gap:10px;
  transition:all .2s;
}
.social-btn:hover{background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.2);}

.cal-wrap{border-radius:var(--r);overflow:hidden;}
.cal-nav{
  display:flex;align-items:center;justify-content:space-between;
  padding:16px 20px 12px;
}
.cal-month-label{font-size:15px;font-weight:700;}
.cal-arrow{
  width:32px;height:32px;border-radius:50%;
  background:rgba(255,255,255,0.07);
  border:1px solid rgba(255,255,255,0.12);
  color:#fff;font-size:16px;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;
}
.cal-arrow:hover:not(:disabled){background:var(--yellow);color:var(--black);border-color:transparent;}
.cal-arrow:disabled{opacity:.25;cursor:not-allowed;}
.cal-grid{
  display:grid;grid-template-columns:repeat(7,1fr);
  gap:3px;padding:0 16px 16px;
}
.cal-hdr{
  text-align:center;
  font-size:10px;font-weight:700;
  color:var(--gray-text);
  text-transform:uppercase;letter-spacing:.5px;
  padding-bottom:8px;
}
.cal-day{
  aspect-ratio:1;
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  border-radius:10px;
  font-size:13px;font-weight:500;
  cursor:pointer;
  transition:all .2s;
  position:relative;
  border:1.5px solid transparent;
}
.cal-day:not(.cal-empty):not(.cal-past):hover{
  background:rgba(255,255,255,0.08);
  border-color:rgba(255,255,255,0.12);
}
.cal-day.cal-today{color:var(--blue);font-weight:700;}
.cal-day.cal-today::after{
  content:'';position:absolute;bottom:4px;
  width:4px;height:4px;border-radius:50%;background:var(--blue);
}
.cal-day.cal-selected{
  background:var(--yellow)!important;
  color:var(--black)!important;
  border-color:transparent!important;
  font-weight:800!important;
}
.cal-day.cal-selected::after{display:none;}
.cal-day.cal-past{color:rgba(255,255,255,0.2);cursor:not-allowed;}
.cal-day.cal-has-slots::before{
  content:'';position:absolute;bottom:4px;
  width:4px;height:4px;border-radius:50%;background:var(--green);
}
.cal-day.cal-selected.cal-has-slots::before{background:var(--black);}
.cal-day.cal-empty{cursor:default;}

.time-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.time-slot{
  padding:10px 6px;border-radius:10px;
  border:1px solid rgba(255,255,255,0.1);
  background:rgba(255,255,255,0.04);
  font-size:13px;font-weight:500;text-align:center;
  cursor:pointer;color:rgba(255,255,255,0.8);
  transition:all .2s;
}
.time-slot:hover:not(.unavail){
  background:rgba(255,255,255,0.1);
  border-color:rgba(255,255,255,0.2);
}
.time-slot.selected{
  background:var(--yellow);
  color:var(--black);
  border-color:transparent;
  font-weight:700;
}
.time-slot.unavail{
  opacity:.3;cursor:not-allowed;
  text-decoration:line-through;
}

.provider-card{
  display:flex;align-items:flex-start;gap:16px;
  padding:20px;
  border-radius:var(--r);
  cursor:pointer;
  transition:all .25s;
}
.provider-card:hover{
  background:rgba(255,255,255,0.06);
  transform:translateX(4px);
}
.provider-img{
  width:64px;height:64px;border-radius:14px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  font-size:26px;
  background:rgba(255,255,255,0.05);
  border:1px solid rgba(255,255,255,0.08);
}

.footer{
  background:rgba(255,255,255,0.02);
  border-top:1px solid rgba(255,255,255,0.06);
  padding:48px;
  margin-top:auto;
}

@keyframes checkPop{
  0%{transform:scale(0);opacity:0;}
  60%{transform:scale(1.2);}
  100%{transform:scale(1);opacity:1;}
}
.check-anim{animation:checkPop .5s var(--ease) both;}

@media(max-width:768px){
  .nav{padding:0 16px;gap:10px;}
  .nav-tabs{display:none;}
  .section{padding:48px 20px;}
}
`;
