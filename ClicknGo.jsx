import { useState, useEffect } from "react";
import StarRating from "./src/components/common/StarRating";
import ReviewCard from "./src/components/common/ReviewCard";
import Footer from "./src/components/layout/Footer";

/* ═══════════════════════════════════════════════════
   GLOBAL STYLES — injected once
═══════════════════════════════════════════════════ */
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,700&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

:root {
  --yellow: #f2c94c;
  --yellow2: #e4b63f;
  --yellow-dim: rgba(242,201,76,0.16);
  --yellow-glow: rgba(242,201,76,0.24);
  --black: #ffffff;
  --black2: #f7f8fa;
  --black3: #edf1f5;
  --white: #1c2430;
  --off: #ffffff;
  --gray-bg: #f3f5f8;
  --gray-line: #d8dee7;
  --gray-mid: #5d6775;
  --gray-text: #7b8696;
  --green: #22c55e;
  --green-dim: rgba(34,197,94,0.15);
  --red: #ef4444;
  --red-dim: rgba(239,68,68,0.15);
  --blue: #3b82f6;

  /* Liquid Glass */
  --glass: rgba(255,255,255,0.10);
  --glass-strong: rgba(255,255,255,0.16);
  --glass-border: rgba(255,255,255,0.22);
  --glass-border-strong: rgba(255,255,255,0.35);
  --glass-shadow: 0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.18);
  --glass-blur: blur(22px) saturate(200%);

  --r: 36px;
  --r-sm: 18px;
  --ease: cubic-bezier(0.22,1,0.36,1);
}

*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  font-family:'DM Sans',sans-serif;
  background:
    radial-gradient(1200px 500px at -10% -20%, rgba(255,255,255,0.95), transparent 60%),
    radial-gradient(900px 420px at 110% -10%, rgba(232,238,247,0.55), transparent 58%),
    linear-gradient(180deg,#f6f8fc 0%, #edf2f8 100%);
  color:var(--white);
  min-height:100vh;
  overflow-x:hidden;
}
input,textarea,select{font-family:'DM Sans',sans-serif;}
button{font-family:'DM Sans',sans-serif;cursor:pointer;}

/* GLASS */
.glass{
  background:linear-gradient(160deg, rgba(255,255,255,0.72), rgba(255,255,255,0.45));
  border:1px solid rgba(255,255,255,0.72);
  box-shadow:0 16px 34px rgba(17,24,39,0.09), inset 0 1px 0 rgba(255,255,255,0.95);
  backdrop-filter:blur(22px) saturate(150%);
  -webkit-backdrop-filter:blur(22px) saturate(150%);
}
.glass-strong{
  background:linear-gradient(160deg, rgba(255,255,255,0.85), rgba(255,255,255,0.58));
  border:1px solid rgba(255,255,255,0.82);
  box-shadow:0 18px 40px rgba(17,24,39,0.1), inset 0 1px 0 rgba(255,255,255,0.98);
  backdrop-filter:blur(24px) saturate(170%);
  -webkit-backdrop-filter:blur(24px) saturate(170%);
}
.glass-card{
  background:linear-gradient(165deg, rgba(255,255,255,0.8), rgba(255,255,255,0.56));
  border:1px solid rgba(255,255,255,0.8);
  box-shadow:0 18px 44px rgba(17,24,39,0.12), inset 0 1px 0 rgba(255,255,255,0.98);
  backdrop-filter:blur(26px) saturate(170%);
  -webkit-backdrop-filter:blur(26px) saturate(170%);
  border-radius:var(--r);
  transition:transform .5s var(--ease), box-shadow .5s var(--ease), border-color .5s var(--ease);
}
.glass-yellow{
  background:rgba(255,224,51,0.10);
  backdrop-filter:blur(20px) saturate(180%);
  -webkit-backdrop-filter:blur(20px) saturate(180%);
  border:1px solid rgba(255,224,51,0.25);
  box-shadow:0 4px 24px rgba(255,224,51,0.1);
}

/* SCROLL */
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:99px;}

/* ANIMATIONS */
@keyframes fadeUp{
  from{opacity:0;transform:translateY(18px);}
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

.animate-fade-up{animation:fadeUp 0.8s var(--ease) both;}
.animate-fade-in{animation:fadeIn 0.7s var(--ease) both;}
.animate-scale{animation:scaleIn 0.7s var(--ease) both;}

/* STAGGER DELAYS */
.d1{animation-delay:.05s!important;}
.d2{animation-delay:.1s!important;}
.d3{animation-delay:.15s!important;}
.d4{animation-delay:.2s!important;}
.d5{animation-delay:.25s!important;}
.d6{animation-delay:.3s!important;}

/* TOAST */
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

/* NAV */
.nav{
  position:fixed;top:0;left:0;right:0;
  height:68px;
  display:flex;align-items:center;
  padding:0 22px;
  gap:14px;
  z-index:500;
  background:linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.58) 100%);
  border-bottom:1px solid rgba(255,255,255,0.65);
  box-shadow:0 10px 30px rgba(17,24,39,0.09), inset 0 1px 0 rgba(255,255,255,0.95);
  backdrop-filter:blur(24px) saturate(165%);
  -webkit-backdrop-filter:blur(24px) saturate(165%);
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
  background:rgba(255,255,255,0.46);
  border:1px solid rgba(255,255,255,0.72);
  border-radius:999px;
  padding:8px 16px 8px 38px;
  color:var(--white);font-size:13px;
  transition:all .45s var(--ease);
  position:relative;
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
}
.nav-search:focus{
  background:rgba(255,255,255,0.7);
  border-color:rgba(255,255,255,0.9);
  box-shadow:0 0 0 3px rgba(255,255,255,0.45), 0 8px 24px rgba(17,24,39,0.08);
}
.nav-search::placeholder{color:var(--gray-mid);}
.nav-search-wrap{position:relative;flex:1;max-width:360px;}
.nav-search-icon{
  position:absolute;left:12px;top:50%;transform:translateY(-50%);
  color:var(--gray-mid);pointer-events:none;
}
.nav-tabs{display:flex;gap:2px;margin-left:auto;}
.nav-tab{
  padding:7px 16px;
  border-radius:999px;
  font-size:13px;font-weight:500;
  color:var(--gray-mid);
  cursor:pointer;
  transition:all .35s var(--ease);
  border:1px solid rgba(255,255,255,0);
}
.nav-tab:hover{
  color:var(--white);
  background:rgba(255,255,255,0.5);
  border-color:rgba(255,255,255,0.76);
}
.nav-tab.active{
  background:rgba(255,255,255,0.74);
  color:var(--white);
  font-weight:700;
  border-color:rgba(255,255,255,0.9);
  box-shadow:0 8px 18px rgba(17,24,39,0.08);
}
.nav-right{display:flex;align-items:center;gap:12px;flex-shrink:0;}
.nav-btn{
  padding:7px 18px;
  border-radius:999px;
  font-size:13px;font-weight:600;
  cursor:pointer;
  transition:all .35s var(--ease);
  border:1px solid rgba(255,255,255,0.76);
  background:rgba(255,255,255,0.46);
  color:var(--white);
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
}
.nav-btn:hover{
  background:rgba(255,255,255,0.68);
  border-color:rgba(255,255,255,0.92);
}
.nav-btn.primary{
  background:linear-gradient(180deg,#ffffff 0%,#f7f9fc 100%);
  color:#1f2937;
  border-color:rgba(255,255,255,0.95);
  box-shadow:0 8px 22px rgba(17,24,39,0.1);
}
.nav-btn.primary:hover{
  background:#ffffff;
  box-shadow:0 10px 24px rgba(17,24,39,0.14);
}
.nav-user{
  display:flex;align-items:center;gap:10px;
  cursor:pointer;
  padding:5px 14px 5px 5px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,0.74);
  background:rgba(255,255,255,0.48);
  transition:all .35s var(--ease);
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
}
.nav-user:hover{
  background:rgba(255,255,255,0.7);
  border-color:rgba(255,255,255,0.92);
}
.nav-avatar{
  width:32px;height:32px;border-radius:50%;
  background:linear-gradient(145deg,#ffffff,#eef2f8);
  display:flex;align-items:center;justify-content:center;
  font-size:13px;font-weight:700;color:#334155;
  border:1.5px solid rgba(255,255,255,0.95);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.95), 0 4px 10px rgba(17,24,39,0.08);
}

/* PAGE WRAPPER */
.page{
  min-height:100vh;
  padding-top:64px;
}

/* HERO BG */
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

/* SECTION */
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

/* CARD HOVER */
.card-hover{
  transition:transform .5s var(--ease),box-shadow .5s var(--ease);
  cursor:pointer;
}
.card-hover:hover{
  transform:translateY(-10px) scale(1.015);
  box-shadow:0 26px 52px rgba(17,24,39,0.14);
}

/* BTN */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:13px 28px;
  border-radius:999px;
  font-size:15px;font-weight:600;
  cursor:pointer;
  transition:all .45s var(--ease);
  border:none;
  letter-spacing:0.1px;
}
.btn-yellow{
  background:linear-gradient(180deg,#d4b367 0%, #b7923f 100%);
  color:#ffffff;
}
.btn-yellow:hover{
  background:linear-gradient(180deg,#ddbb6f 0%, #c19d47 100%);
  transform:translateY(-3px);
  box-shadow:0 12px 32px rgba(183,146,63,0.28);
}
.btn-glass{
  background:#fff;
  border:1px solid var(--gray-line);
  color:var(--white);
  backdrop-filter:none;
  -webkit-backdrop-filter:none;
}
.btn-glass:hover{
  background:var(--gray-bg);
  transform:translateY(-2px);
}
.btn-outline{
  background:transparent;
  border:1.5px solid rgba(255,255,255,0.78);
  color:var(--white);
}
.btn-outline:hover{
  background:rgba(255,255,255,0.5);
  border-color:rgba(255,255,255,0.92);
}

/* FORM INPUTS */
.form-input{
  width:100%;
  padding:13px 18px;
  border-radius:var(--r-sm);
  background:rgba(255,255,255,0.72);
  border:1px solid rgba(255,255,255,0.82);
  color:var(--white);
  font-size:14px;
  transition:all .2s;
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
}
.form-input:focus{
  background:rgba(255,255,255,0.88);
  border-color:rgba(255,255,255,0.95);
  box-shadow:0 0 0 3px rgba(255,255,255,0.55), 0 10px 22px rgba(17,24,39,0.08);
}
.form-input::placeholder{color:var(--gray-mid);}
.form-label{
  font-size:12px;font-weight:600;
  color:var(--gray-mid);
  text-transform:uppercase;letter-spacing:.6px;
  margin-bottom:6px;display:block;
}

/* CHIP */
.chip{
  display:inline-flex;align-items:center;gap:6px;
  padding:8px 18px;
  border-radius:999px;
  font-size:13px;font-weight:500;
  cursor:pointer;
  transition:all .45s var(--ease);
  border:1px solid var(--gray-line);
  background:#fff;
  color:var(--gray-mid);
}
.chip:hover{border-color:var(--gray-mid);color:var(--white);}
.chip.active{
  background:var(--yellow);
  color:var(--black);
  border-color:transparent;
  font-weight:700;
}

/* STAR */
.stars{display:flex;align-items:center;gap:2px;}
.star{color:#FFB800;font-size:13px;}
.star.empty{color:#c7ced8;}

/* BADGE */
.badge{
  display:inline-flex;align-items:center;
  padding:3px 10px;border-radius:999px;
  font-size:11px;font-weight:600;
  text-transform:uppercase;letter-spacing:.4px;
}
.badge-green{background:var(--green-dim);color:var(--green);}
.badge-red{background:var(--red-dim);color:var(--red);}
.badge-yellow{background:var(--yellow-dim);color:var(--yellow2);}

/* DIVIDER */
.divider{
  display:flex;align-items:center;gap:16px;
  color:var(--gray-text);font-size:13px;
  margin:20px 0;
}
.divider::before,.divider::after{
  content:'';flex:1;
  height:1px;background:rgba(255,255,255,0.1);
}

/* SOCIAL BTN */
.social-btn{
  width:100%;
  padding:12px;
  border-radius:var(--r-sm);
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.1);
  color:var(--white);
  font-size:14px;font-weight:500;
  display:flex;align-items:center;justify-content:center;gap:10px;
  transition:all .45s var(--ease);
}
.social-btn:hover{background:var(--gray-bg);border-color:var(--gray-line);}

/* CALENDAR */
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
  color:var(--white);font-size:16px;
  display:flex;align-items:center;justify-content:center;
  transition:all .45s var(--ease);
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
  transition:all .45s var(--ease);
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
.cal-day.cal-past{color:#b5bfcc;cursor:not-allowed;}
.cal-day.cal-has-slots::before{
  content:'';position:absolute;bottom:4px;
  width:4px;height:4px;border-radius:50%;background:var(--green);
}
.cal-day.cal-selected.cal-has-slots::before{background:var(--black);}
.cal-day.cal-empty{cursor:default;}

/* TIME SLOTS */
.time-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.time-slot{
  padding:10px 6px;border-radius:10px;
  border:1px solid rgba(255,255,255,0.1);
  background:rgba(255,255,255,0.04);
  font-size:13px;font-weight:500;text-align:center;
  cursor:pointer;color:var(--white);
  transition:all .45s var(--ease);
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

/* PROVIDER LISTING CARD */
.provider-card{
  display:flex;align-items:flex-start;gap:16px;
  padding:34px;
  border-radius:var(--r);
  cursor:pointer;
  transition:all .5s var(--ease);
}
.provider-card:hover{
  background:rgba(255,255,255,0.65);
  transform:translateY(-8px) scale(1.01);
}
.provider-img{
  width:74px;height:74px;border-radius:20px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  font-size:22px;font-weight:700;
  background:rgba(255,255,255,0.65);
  border:1px solid rgba(255,255,255,0.88);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.95), 0 8px 16px rgba(17,24,39,0.08);
}

/* FOOTER */
.footer{
  background:rgba(255,255,255,0.02);
  border-top:1px solid rgba(255,255,255,0.06);
  padding:48px;
  margin-top:auto;
}

/* BOOKING CONFIRM ANIMATION */
@keyframes checkPop{
  0%{transform:scale(0);opacity:0;}
  60%{transform:scale(1.2);}
  100%{transform:scale(1);opacity:1;}
}
.check-anim{animation:checkPop .5s var(--ease) both;}

/* MOBILE NAV */
@media(max-width:768px){
  .nav{padding:0 12px;gap:8px;height:62px;}
  .nav-loc{display:none;}
  .nav-search-wrap{max-width:none;}
  .nav-search{padding:7px 12px 7px 34px;font-size:12px;}
  .nav-right{gap:8px;}
  .nav-btn{padding:6px 12px;font-size:12px;}
  .nav-user span{display:none;}
  .page{padding-top:62px;}
  .nav-tabs{display:none;}
  .section{padding:48px 20px;}
}

@media(max-width:1024px){
  .nav-tabs{display:none;}
  .nav-loc{display:none;}
  .nav{padding:0 16px;}
}
`;

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const CATEGORIES = [
  { id:"grooming", label:"Grooming", icon:"GR", color:"#9b59b6", bg:"rgba(155,89,182,0.15)", 
    subs:["Hair & Styling","Spa Services","Nail Care","Beard Trim","Hair Colour","Massage"] },
  { id:"realestate", label:"Real Estate", icon:"RE", color:"#27ae60", bg:"rgba(39,174,96,0.15)",
    subs:["Residential","Commercial","Rental","Property Valuation","Legal Aid","Interior Design"] },
  { id:"healthcare", label:"HealthCare", icon:"HC", color:"#2980b9", bg:"rgba(41,128,185,0.15)",
    subs:["Dental Care","Physical Therapy","Medicines","General Physician","Eye Care","Lab Tests"] },
  { id:"sports", label:"Sports & Gaming", icon:"SG", color:"#8e44ad", bg:"rgba(142,68,173,0.15)",
    subs:["Gaming Hubs","Turfs","Arcade Parlour","Cricket Ground","Badminton Court","Swimming Pool"] },
];

const PROVIDERS = {
  grooming:[
    {id:1,name:"Standard Salon",sub:"Hair & Beauty",rating:4.2,reviews:138,dist:"5.3km",time:"10am–8pm",price:299,icon:"SS",tags:["Hair-cut","Styling","Beard"]},
    {id:2,name:"Glow Spa Studio",sub:"Spa & Wellness",rating:4.7,reviews:214,dist:"2.1km",time:"9am–9pm",price:599,icon:"GS",tags:["Massage","Facial","Scrub"]},
    {id:3,name:"Nail Artistry",sub:"Nail Care",rating:4.5,reviews:89,dist:"3.8km",time:"10am–7pm",price:349,icon:"NA",tags:["Manicure","Pedicure","Art"]},
    {id:4,name:"The Barber's Bench",sub:"Barbershop",rating:4.9,reviews:312,dist:"1.2km",time:"8am–8pm",price:199,icon:"BB",tags:["Shave","Cut","Beard"]},
  ],
  realestate:[
    {id:5,name:"Prime Properties",sub:"Residential Sales",rating:4.6,reviews:87,dist:"4.5km",time:"9am–6pm",price:0,icon:"PP",tags:["Buy","Sell","Rent"]},
    {id:6,name:"Urban Spaces Co.",sub:"Commercial Real Estate",rating:4.3,reviews:45,dist:"2.9km",time:"10am–7pm",price:0,icon:"US",tags:["Office","Shop","Warehouse"]},
    {id:7,name:"HomeFinder Plus",sub:"Rental Services",rating:4.8,reviews:193,dist:"1.7km",time:"9am–8pm",price:0,icon:"HF",tags:["Apartments","PG","Villa"]},
  ],
  healthcare:[
    {id:8,name:"SmileCare Dental",sub:"Dental Clinic",rating:4.7,reviews:156,dist:"3.2km",time:"9am–7pm",price:499,icon:"SD",tags:["Cleaning","Braces","Implant"]},
    {id:9,name:"PhysioFit Centre",sub:"Physical Therapy",rating:4.5,reviews:98,dist:"4.1km",time:"7am–9pm",price:699,icon:"PF",tags:["Rehab","Sports","Pain"]},
    {id:10,name:"QuickMeds Pharmacy",sub:"Medicines & Lab",rating:4.4,reviews:234,dist:"0.8km",time:"24/7",price:0,icon:"QM",tags:["Medicines","Tests","Reports"]},
  ],
  sports:[
    {id:11,name:"GameZone Hub",sub:"Gaming Centre",rating:4.8,reviews:412,dist:"2.3km",time:"10am–12am",price:149,icon:"GZ",tags:["PS5","PC","VR"]},
    {id:12,name:"GreenTurf Arena",sub:"Football & Cricket",rating:4.6,reviews:178,dist:"3.5km",time:"6am–10pm",price:399,icon:"GT",tags:["Football","Cricket","Hockey"]},
    {id:13,name:"Retro Arcade Palace",sub:"Arcade Gaming",rating:4.3,reviews:95,dist:"5.1km",time:"11am–11pm",price:99,icon:"RA",tags:["Arcade","Billiards","Air Hockey"]},
  ],
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS_SHORT = ["Su","Mo","Tu","We","Th","Fr","Sa"];

const RECENT_BOOKINGS = [
  {service:"Haircut & Styling",provider:"Standard Salon",date:"Jan 15, 2024",status:"completed",icon:"HS"},
  {service:"Full Body Massage",provider:"Wellness Spa",date:"Jan 10, 2024",status:"completed",icon:"BM"},
  {service:"Manicure",provider:"Beauty Studio",date:"Jan 5, 2024",status:"cancelled",icon:"MN"},
  {service:"Gaming Session",provider:"GameZone Hub",date:"Dec 28, 2023",status:"completed",icon:"GS"},
];

const REVIEWS = [
  {name:"Priya Sharma",rating:5,text:"Absolutely loved the experience! Booking was seamless and the salon was top-notch. Will definitely return.",date:"Mar 12, 2024",avatar:"PS"},
  {name:"Rahul Verma",rating:4,text:"Great platform. Saved me so much time. The real-time calendar is a game changer for busy people like me.",date:"Mar 8, 2024",avatar:"RV"},
  {name:"Ananya Singh",rating:5,text:"The GameZone Hub booking via ClicknGo was super easy. Instant confirmation and no waiting!",date:"Feb 28, 2024",avatar:"AS"},
  {name:"Arjun Mehta",rating:4,text:"Very convenient. Found a dentist near me in minutes. The review system helped me choose the right one.",date:"Feb 20, 2024",avatar:"AM"},
];

function getSlots(date) {
  if(!date) return [];
  const dow = date.getDay();
  if(dow===0) return [];
  const d = date.getDate();
  return [
    {t:"10:00 AM",a:true},{t:"10:45 AM",a:d%3!==0},{t:"11:30 AM",a:true},
    {t:"12:15 PM",a:d%4!==1},{t:"02:00 PM",a:true},{t:"03:00 PM",a:d%2===0},
    {t:"04:30 PM",a:true},{t:"05:30 PM",a:d%5!==2},{t:"06:30 PM",a:d%3!==1},
  ].map(s=> d%7===0 ? {...s,a:false} : s);
}

/* ═══════════════════════════════════════════════════
   TOAST SYSTEM
═══════════════════════════════════════════════════ */
function useToast(){
  const [msg,setMsg]=useState(null);
  const show=(m)=>{
    setMsg(m);
    setTimeout(()=>setMsg(null),3000);
  };
  return {msg,show};
}

/* ═══════════════════════════════════════════════════
   NAV COMPONENT
═══════════════════════════════════════════════════ */
function Nav({page,setPage,user,setUser}){
  const [searchQ,setSearchQ]=useState("");
  const cats = CATEGORIES.map(c=>c.id);
  const isCategory = cats.includes(page);

  function handleSearch(e){
    if(e.key==="Enter" && searchQ.trim()) setPage("search:"+searchQ.trim());
  }

  return (
    <nav className="nav">
      <div className="nav-logo" onClick={()=>setPage("home")}>
        Click<span>n</span>Go
      </div>
      <div className="nav-loc">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
        Street 133, Times Square, NYC
      </div>
      <div className="nav-search-wrap">
        <span className="nav-search-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </span>
        <input
          className="nav-search"
          style={{width:"100%"}}
          placeholder="search services..."
          value={searchQ}
          onChange={e=>setSearchQ(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      <div className="nav-tabs">
        {CATEGORIES.map(c=>(
          <div key={c.id} className={`nav-tab${page===c.id?" active":""}`} onClick={()=>setPage(c.id)}>
            {c.label}
          </div>
        ))}
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <div className="nav-user" onClick={()=>setPage("profile")}>
              <div className="nav-avatar">{user.name[0]}</div>
              <span style={{fontSize:13,fontWeight:500}}>{user.name.split(" ")[0]}</span>
            </div>
          </>
        ) : (
          <>
            <button className="nav-btn" onClick={()=>setPage("login")}>Login</button>
            <button className="nav-btn primary" onClick={()=>setPage("signup")}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════
   SPLASH PAGE
═══════════════════════════════════════════════════ */
function SplashPage({onDone}){
  useEffect(()=>{
    const t = setTimeout(onDone, 2800);
    return ()=>clearTimeout(t);
  },[]);
  return (
    <div style={{
      position:"fixed",inset:0,
      background:"var(--yellow)",
      display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",
      zIndex:9999,
      animation:"fadeIn .3s ease"
    }}>
      {/* Animated blobs */}
      <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
        {[
          {w:350,h:350,top:"10%",left:"5%",bg:"rgba(255,199,0,0.5)",delay:"0s"},
          {w:280,h:280,top:"60%",right:"8%",bg:"rgba(255,180,0,0.4)",delay:"2s"},
          {w:200,h:200,bottom:"15%",left:"20%",bg:"rgba(255,220,80,0.35)",delay:"4s"},
        ].map((b,i)=>(
          <div key={i} style={{
            position:"absolute",
            width:b.w,height:b.h,
            top:b.top,left:b.left,right:b.right,bottom:b.bottom,
            background:b.bg,
            borderRadius:"50%",
            filter:"blur(60px)",
            animation:`liquidBlob 6s ease-in-out ${b.delay} infinite`,
          }}/>
        ))}
      </div>

      <div style={{position:"relative",textAlign:"center"}}>
        {/* Icons */}
        <div style={{
          display:"flex",gap:32,marginBottom:40,justifyContent:"center",
          animation:"fadeUp .6s .2s var(--ease) both"
        }}>
          {[
            {icon:"HC",label:"HealthCare"},
            {icon:"GR",label:"Grooming"},
            {icon:"SG",label:"Gaming"},
            {icon:"RE",label:"Real Estate"},
          ].map((item,i)=>(
            <div key={i} style={{
              display:"flex",flexDirection:"column",alignItems:"center",gap:8,
              animationDelay:`${.1+i*.08}s`,animation:"fadeUp .6s var(--ease) both"
            }}>
              <div style={{
                width:72,height:72,
                background:"rgba(0,0,0,0.08)",
                backdropFilter:"blur(10px)",
                borderRadius:20,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:30,
                border:"1.5px solid rgba(0,0,0,0.1)",
                boxShadow:"0 8px 24px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
                animation:`float ${3+i*.5}s ease-in-out ${i*.3}s infinite`,
              }}>{item.icon}</div>
            </div>
          ))}
        </div>
        <div style={{
          fontFamily:"'Playfair Display',serif",
          fontSize:"clamp(48px,8vw,80px)",
          fontWeight:900,
          color:"var(--black)",
          letterSpacing:"-2px",
          lineHeight:1,
          animation:"fadeUp .7s .5s var(--ease) both"
        }}>
          ClicknGo
        </div>
        <div style={{
          fontSize:16,color:"rgba(0,0,0,0.55)",
          marginTop:12,fontWeight:500,
          animation:"fadeUp .6s .7s var(--ease) both"
        }}>
          Book Local. Live Better.
        </div>
        <div style={{
          marginTop:36,
          animation:"fadeIn .5s 1.6s ease both"
        }}>
          <div style={{
            width:36,height:4,borderRadius:99,
            background:"rgba(0,0,0,0.15)",margin:"0 auto",overflow:"hidden"
          }}>
            <div style={{
              height:"100%",
              background:"rgba(0,0,0,0.4)",
              borderRadius:99,
              animation:"shimmer 1.2s 1.6s ease-in-out both",
              backgroundImage:"linear-gradient(90deg,transparent,rgba(0,0,0,0.3),transparent)",
              backgroundSize:"200%",
            }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════ */
function HomePage({setPage, user}){
  return (
    <div className="page" style={{background:"var(--black)"}}>
      {/* HERO */}
      <div style={{
        position:"relative",
        minHeight:"92vh",
        display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",
        overflow:"hidden",
        padding:"80px 32px 48px"
      }}>
        {/* BG blobs */}
        <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
          <div style={{position:"absolute",width:600,height:600,top:"-10%",left:"-5%",background:"rgba(255,224,51,0.08)",borderRadius:"50%",filter:"blur(100px)",animation:"liquidBlob 10s ease-in-out infinite"}}/>
          <div style={{position:"absolute",width:400,height:400,bottom:"5%",right:"5%",background:"rgba(155,89,182,0.1)",borderRadius:"50%",filter:"blur(80px)",animation:"liquidBlob 8s ease-in-out 3s infinite"}}/>
          <div style={{position:"absolute",width:300,height:300,top:"50%",left:"40%",background:"rgba(39,174,96,0.07)",borderRadius:"50%",filter:"blur(80px)",animation:"liquidBlob 12s ease-in-out 1s infinite"}}/>
          {/* Grid lines */}
          <div style={{
            position:"absolute",inset:0,
            backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
            backgroundSize:"60px 60px",
          }}/>
        </div>

        <div style={{position:"relative",textAlign:"center",maxWidth:800}}>
          {/* Pill tag */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:8,
            padding:"6px 18px",borderRadius:999,
            background:"rgba(255,224,51,0.1)",
            border:"1px solid rgba(255,224,51,0.25)",
            backdropFilter:"blur(10px)",
            fontSize:13,fontWeight:600,color:"var(--yellow2)",
            marginBottom:24,
            animation:"fadeUp .5s .1s var(--ease) both"
          }}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"var(--yellow)",display:"inline-block",animation:"pulse 2s infinite"}}/>
            Trusted by 50,000+ users across the city
          </div>

          <h1 style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:"clamp(42px,7vw,82px)",
            fontWeight:900,
            lineHeight:1.05,
            letterSpacing:"-2px",
            animation:"fadeUp .6s .2s var(--ease) both"
          }}>
            Book Local.<br/>
            <span style={{
              background:"linear-gradient(135deg,var(--yellow),var(--yellow2))",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            }}>Live Better.</span>
          </h1>
          <p style={{
            fontSize:"clamp(15px,2vw,18px)",color:"var(--gray-mid)",
            marginTop:20,lineHeight:1.7,maxWidth:520,margin:"20px auto 0",
            animation:"fadeUp .6s .35s var(--ease) both"
          }}>
            Discover and book trusted services around you — whether it's a haircut, a massage, or home repairs — all in a few taps.
          </p>

          <div style={{display:"flex",gap:14,justifyContent:"center",marginTop:36,flexWrap:"wrap",animation:"fadeUp .5s .45s var(--ease) both"}}>
            <button className="btn btn-yellow" onClick={()=>setPage("grooming")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 3l14 9-14 9V3z"/></svg>
              Book Now
            </button>
            <button className="btn btn-glass" onClick={()=>setPage("list-business")}>
              List Your Business
            </button>
          </div>
        </div>

        {/* Floating category icons */}
        <div style={{
          display:"flex",gap:20,marginTop:64,flexWrap:"wrap",justifyContent:"center",
          animation:"fadeUp .6s .55s var(--ease) both"
        }}>
          {CATEGORIES.map((c,i)=>(
            <div key={c.id} className="glass card-hover" onClick={()=>setPage(c.id)} style={{
              padding:"14px 22px",borderRadius:16,
              display:"flex",alignItems:"center",gap:10,
              cursor:"pointer",
              animationDelay:`${.6+i*.1}s`,
            }}>
              <span style={{fontSize:22}}>{c.icon}</span>
              <span style={{fontSize:14,fontWeight:600}}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* EVERYTHING YOU NEED */}
      <div style={{background:"var(--black2)",padding:"clamp(36px,6vw,72px) clamp(18px,4vw,48px)"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <h2 className="section-title animate-fade-up">Everything you need,<br/>All in One App</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:24}}>
            {CATEGORIES.map((cat,i)=>(
              <div key={cat.id} className="glass-card card-hover animate-fade-up" style={{
                padding:28,animationDelay:`${i*.1}s`,cursor:"pointer",
              }} onClick={()=>setPage(cat.id)}>
                <div style={{
                  width:52,height:52,borderRadius:14,
                  background:cat.bg,
                  border:`1px solid ${cat.color}30`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:24,marginBottom:16
                }}>{cat.icon}</div>
                <div style={{fontSize:17,fontWeight:700,marginBottom:10}}>{cat.label}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                  {cat.subs.slice(0,3).map(s=>(
                    <span key={s} style={{
                      padding:"4px 12px",borderRadius:999,
                      background:"rgba(255,255,255,0.06)",
                      border:"1px solid rgba(255,255,255,0.08)",
                      fontSize:12,color:"var(--gray-mid)"
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{padding:"clamp(36px,6vw,72px) clamp(18px,4vw,48px)"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <h2 className="section-title" style={{textAlign:"center",marginBottom:48}}>How it Works</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:24}}>
            {[
              {n:"1",title:"Browse Services",desc:"Choose from a wide range of local providers categorized by your needs.",icon:"01"},
              {n:"2",title:"Pick a Time",desc:"View real-time availability and lock in a time that suits you perfectly.",icon:"02"},
              {n:"3",title:"Book & Pay Securely",desc:"Pay online and get instant confirmation. It's that simple.",icon:"03"},
            ].map((step,i)=>(
              <div key={i} className="glass-card animate-fade-up" style={{padding:28,animationDelay:`${i*.12}s`}}>
                <div style={{
                  fontFamily:"'Playfair Display',serif",
                  fontSize:52,fontWeight:900,
                  color:"var(--yellow)",opacity:.9,
                  lineHeight:1,marginBottom:12
                }}>{step.n}</div>
                <div style={{fontSize:32,marginBottom:12}}>{step.icon}</div>
                <div style={{fontSize:17,fontWeight:700,marginBottom:8}}>{step.title}</div>
                <div style={{fontSize:14,color:"var(--gray-mid)",lineHeight:1.6}}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY US */}
      <div style={{background:"var(--black2)",padding:"clamp(36px,6vw,72px) clamp(18px,4vw,48px)"}}>
        <div style={{maxWidth:1000,margin:"0 auto"}}>
          <h2 className="section-title" style={{textAlign:"center",marginBottom:48}}>Why Choose Us?</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20}}>
            {[
              {icon:"RT",title:"Real-Time Booking Calendar",desc:"See instantly when your provider is available — powered by live data."},
              {icon:"SP",title:"Secure Payments",desc:"Safe and fast transactions through Razorpay or Stripe. Fully encrypted."},
              {icon:"IN",title:"Instant Notifications",desc:"Stay informed with SMS and email updates at every step."},
              {icon:"BD",title:"Business Dashboard",desc:"Manage services and appointments from one powerful place."},
            ].map((f,i)=>(
              <div key={i} className="glass-card animate-fade-up" style={{padding:24,display:"flex",gap:16,alignItems:"flex-start",animationDelay:`${i*.1}s`}}>
                <div style={{
                  width:44,height:44,borderRadius:12,
                  background:"var(--yellow-dim)",
                  border:"1px solid rgba(255,224,51,0.2)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:20,flexShrink:0
                }}>{f.icon}</div>
                <div>
                  <div style={{fontSize:15,fontWeight:700,marginBottom:5}}>{f.title}</div>
                  <div style={{fontSize:13,color:"var(--gray-mid)",lineHeight:1.6}}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REVIEWS PREVIEW */}
      <div style={{padding:"clamp(36px,6vw,72px) clamp(18px,4vw,48px)"}}>
        <div style={{maxWidth:1000,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:36}}>
            <h2 className="section-title">What People Say</h2>
            <button className="btn btn-glass" style={{fontSize:13,padding:"9px 20px"}} onClick={()=>setPage("reviews")}>View All</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20}}>
            {REVIEWS.slice(0,3).map((r,i)=>(
              <ReviewCard key={i} r={r} i={i}/>
            ))}
          </div>
        </div>
      </div>

      {/* CTA FOOTER */}
      <div style={{
        margin:"0 clamp(18px,4vw,48px) clamp(32px,6vw,72px)",borderRadius:24,overflow:"hidden",position:"relative",
        background:"linear-gradient(135deg,rgba(255,224,51,0.15),rgba(255,224,51,0.05))",
        border:"1px solid rgba(255,224,51,0.2)",
        padding:"56px 48px",textAlign:"center",
        backdropFilter:"blur(20px)",
      }}>
        <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
          <div style={{position:"absolute",width:300,height:300,top:"-30%",right:"-5%",background:"rgba(255,224,51,0.08)",borderRadius:"50%",filter:"blur(60px)"}}/>
        </div>
        <div style={{position:"relative"}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,4vw,42px)",fontWeight:800,marginBottom:12}}>
            Try the Easiest Way to<br/>Book Local Services
          </h2>
          <p style={{color:"var(--gray-mid)",fontSize:16,marginBottom:32}}>Join thousands who trust us for their daily needs.</p>
          <button className="btn btn-yellow" style={{fontSize:16,padding:"15px 36px"}} onClick={()=>setPage("signup")}>
            Get Started
          </button>
        </div>
      </div>

      <Footer setPage={setPage}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CATEGORY LISTING PAGE
═══════════════════════════════════════════════════ */
function CategoryPage({catId, setPage}){
  const cat = CATEGORIES.find(c=>c.id===catId);
  const providers = PROVIDERS[catId]||[];
  const [activeFilter,setActiveFilter]=useState("All");
  const filters = ["All",...(cat?.subs||[]).slice(0,5)];

  const filteredProviders = activeFilter === "All"
    ? providers
    : providers.filter((p) => {
        const filterLower = activeFilter.toLowerCase();
        const subLower = (p.sub || "").toLowerCase();
        const tagsLower = (p.tags || []).map((t) => t.toLowerCase());
        const filterWords = filterLower.split(/[\s&]+/).filter((w) => w.length > 2);
        const matchesFilter = (text) =>
          text.includes(filterLower) || filterWords.some((w) => text.includes(w));
        return matchesFilter(subLower) || tagsLower.some(matchesFilter);
      });

  return (
    <div className="page" style={{background:"var(--black)",minHeight:"100vh"}}>
      {/* Header band */}
      <div style={{
        position:"relative",
        padding:"48px 48px 36px",
        background:`linear-gradient(135deg,${cat?.bg||"rgba(255,255,255,0.05)"},transparent)`,
        borderBottom:"1px solid rgba(255,255,255,0.06)",
        overflow:"hidden",
      }}>
        <div style={{
          position:"absolute",inset:0,
          background:`radial-gradient(ellipse at 80% 50%,${cat?.color||"#fff"}15 0%,transparent 70%)`,
        }}/>
        <div style={{position:"relative"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
            <span style={{
              width:52,height:52,borderRadius:16,
              background:cat?.bg,border:`1px solid ${cat?.color}40`,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,
              backdropFilter:"blur(10px)",
            }}>{cat?.icon}</span>
            <div>
              <div style={{fontSize:24,fontWeight:800,fontFamily:"'Playfair Display',serif"}}>{cat?.label}</div>
              <div style={{fontSize:13,color:"var(--gray-mid)"}}>{filteredProviders.length} provider{filteredProviders.length!==1?"s":""} near you</div>
            </div>
          </div>
          {/* Filter chips */}
          <div style={{display:"flex",gap:9,flexWrap:"wrap",marginTop:20}}>
            {filters.map(f=>(
              <div key={f} className={`chip${activeFilter===f?" active":""}`}
                onClick={()=>setActiveFilter(f)}
                style={activeFilter===f?{}:{borderColor:`${cat?.color}30`,color:"var(--gray-mid)"}}
              >{f}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Provider list */}
      <div style={{maxWidth:900,margin:"0 auto",padding:"clamp(20px,4vw,32px) clamp(16px,4vw,48px)"}}>
        <div style={{
          borderRadius:"var(--r)",overflow:"hidden",
          border:"1px solid rgba(255,255,255,0.07)",
          background:"rgba(255,255,255,0.02)",
        }}>
          {filteredProviders.length === 0 ? (
            <div style={{padding:48,textAlign:"center",color:"var(--gray-mid)",fontSize:15}}>
              No providers match "{activeFilter}". Try another filter.
            </div>
          ) : (
            filteredProviders.map((p,i)=>(
              <div key={p.id}>
                <ProviderRow p={p} onClick={()=>setPage("detail:"+p.id)} accentColor={cat?.color}/>
                {i<filteredProviders.length-1 && <div style={{height:1,background:"rgba(255,255,255,0.05)",margin:"0 20px"}}/>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function ProviderRow({p,onClick,accentColor}){
  return (
    <div className="provider-card animate-fade-up" onClick={onClick}>
      <div className="provider-img" style={{background:`${accentColor||"#fff"}10`,border:`1px solid ${accentColor||"#fff"}20`}}>
        {p.icon}
      </div>
      <div style={{flex:1}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
          <div style={{fontSize:16,fontWeight:700}}>{p.name}</div>
          {p.price>0 && <div style={{fontSize:13,fontWeight:700,color:"var(--yellow)"}}>₹{p.price}</div>}
        </div>
        <div style={{fontSize:13,color:"var(--gray-mid)",marginBottom:8}}>{p.sub}</div>
        <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
          <StarRating rating={p.rating} count={p.reviews}/>
          <span style={{fontSize:12,color:"var(--gray-text)",display:"flex",alignItems:"center",gap:4}}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            {p.dist}
          </span>
          <span style={{fontSize:12,color:"var(--gray-text)",display:"flex",alignItems:"center",gap:4}}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {p.time}
          </span>
        </div>
        <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
          {p.tags.map(t=>(
            <span key={t} style={{padding:"3px 10px",borderRadius:999,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",fontSize:11,color:"var(--gray-mid)"}}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SERVICE DETAIL + BOOKING PAGE
═══════════════════════════════════════════════════ */
function DetailPage({providerId, setPage, showToast}){
  // Find provider
  let provider = null;
  let catId = null;
  for(const [cid,list] of Object.entries(PROVIDERS)){
    const found = list.find(p=>p.id===parseInt(providerId));
    if(found){provider=found;catId=cid;break;}
  }
  if(!provider) return null;
  const cat = CATEGORIES.find(c=>c.id===catId);

  const [selService,setSelService]=useState(provider.tags[0]);
  const today = new Date(); today.setHours(0,0,0,0);
  const [calYear,setCalYear]=useState(today.getFullYear());
  const [calMonth,setCalMonth]=useState(today.getMonth());
  const [selDate,setSelDate]=useState(null);
  const [selTime,setSelTime]=useState(null);

  const slots = getSlots(selDate);
  const hasAny = slots.some(s=>s.a);

  function changeMonth(d){
    let m=calMonth+d, y=calYear;
    if(m>11){m=0;y++;}
    if(m<0){m=11;y--;}
    setCalMonth(m);setCalYear(y);
    setSelDate(null);setSelTime(null);
  }

  function confirmBooking(){
    if(!selDate||!selTime) return;
    setPage("confirm:"+provider.id+":"+selTime+":"+selService);
  }

  // Calendar grid
  const firstDay = new Date(calYear,calMonth,1).getDay();
  const daysInMonth = new Date(calYear,calMonth+1,0).getDate();
  const isCurrentMonth = calYear===today.getFullYear()&&calMonth===today.getMonth();

  return (
    <div className="page" style={{background:"var(--black)"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"clamp(20px,4vw,32px) clamp(16px,4vw,48px)",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:28,alignItems:"start"}}>

        {/* LEFT */}
        <div>
          {/* Breadcrumb */}
          <div style={{display:"flex",gap:8,alignItems:"center",fontSize:13,color:"var(--gray-text)",marginBottom:24}}>
            <span style={{cursor:"pointer"}} onClick={()=>setPage("home")}>Home</span>
            <span>›</span>
            <span style={{cursor:"pointer"}} onClick={()=>setPage(catId)}>{cat?.label}</span>
            <span>›</span>
            <span style={{color:"var(--white)"}}>{provider.name}</span>
          </div>

          {/* Provider header */}
          <div className="glass-card animate-fade-up" style={{marginBottom:20}}>
            <div style={{padding:"28px 28px 20px",borderBottom:"1px solid rgba(255,255,255,0.06)",display:"flex",gap:20}}>
              <div style={{
                width:80,height:80,borderRadius:20,
                background:cat?.bg,border:`1px solid ${cat?.color}30`,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:36,flexShrink:0
              }}>{provider.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,marginBottom:6}}>
                  {provider.name}
                </div>
                <StarRating rating={provider.rating} count={provider.reviews}/>
                <div style={{display:"flex",gap:16,marginTop:10,flexWrap:"wrap"}}>
                  <div style={{display:"flex",alignItems:"center",gap:5,fontSize:13,color:"var(--gray-mid)"}}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                    Street 133, Times Square, NYC · {provider.dist}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:5,fontSize:13,color:"var(--gray-mid)"}}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {provider.time}
                  </div>
                </div>
              </div>
              {provider.price>0 && (
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:12,color:"var(--gray-mid)"}}>starting from</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:"var(--yellow)"}}>₹{provider.price}</div>
                </div>
              )}
            </div>
            <div style={{padding:"20px 28px",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
              <p style={{fontSize:14,color:"var(--gray-mid)",lineHeight:1.75}}>
                We are a full-service {cat?.label} studio bringing premium quality to your doorstep. Our experienced team uses top-grade equipment and follows the highest standards to ensure you walk out completely satisfied. Instant booking, secure payment, and real-time availability — all in one place.
              </p>
            </div>
            <div style={{padding:"20px 28px"}}>
              <div style={{fontSize:14,fontWeight:700,marginBottom:14}}>Select a Service</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:9}}>
                {provider.tags.map(tag=>(
                  <div key={tag} className={`chip${selService===tag?" active":""}`}
                    onClick={()=>setSelService(tag)}>{tag}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews mini */}
          <div className="glass-card animate-fade-up" style={{animationDelay:".15s",padding:24}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontWeight:700}}>Recent Reviews</div>
              <button className="btn btn-glass" style={{fontSize:12,padding:"6px 14px"}} onClick={()=>setPage("reviews")}>View All</button>
            </div>
            {REVIEWS.slice(0,2).map((r,i)=><ReviewCard key={i} r={r} i={i} compact/>)}
          </div>
        </div>

        {/* RIGHT: BOOKING CALENDAR */}
        <div className="glass-card animate-fade-up" style={{animationDelay:".1s",position:"sticky",top:80,overflow:"hidden"}}>
          <div style={{
            padding:"18px 20px 14px",
            borderBottom:"1px solid rgba(255,255,255,0.07)",
            background:"rgba(255,255,255,0.03)"
          }}>
            <div style={{fontSize:15,fontWeight:700}}>Pick a Date & Time</div>
            <div style={{fontSize:12,color:"var(--gray-text)",marginTop:2}}>Real-time availability · Instant confirmation</div>
          </div>

          {/* CALENDAR */}
          <div style={{padding:"16px 16px 8px"}}>
            <div className="cal-nav">
              <button className="cal-arrow" disabled={isCurrentMonth} onClick={()=>changeMonth(-1)}>‹</button>
              <div className="cal-month-label">{MONTHS[calMonth]} {calYear}</div>
              <button className="cal-arrow" onClick={()=>changeMonth(1)}>›</button>
            </div>

            <div className="cal-grid">
              {DAYS_SHORT.map(d=><div key={d} className="cal-hdr">{d}</div>)}
              {Array(firstDay).fill(null).map((_,i)=><div key={"e"+i} className="cal-day cal-empty"/>)}
              {Array(daysInMonth).fill(null).map((_,i)=>{
                const d = i+1;
                const date = new Date(calYear,calMonth,d);
                const isPast = date < today;
                const isToday = date.getTime()===today.getTime();
                const isSel = selDate&&date.getTime()===selDate.getTime();
                const hasSl = !isPast && getSlots(date).some(s=>s.a);
                let cls="cal-day";
                if(isPast) cls+=" cal-past";
                if(isToday) cls+=" cal-today";
                if(isSel) cls+=" cal-selected";
                if(hasSl) cls+=" cal-has-slots";
                return (
                  <div key={d} className={cls}
                    onClick={()=>!isPast&&(setSelDate(date),setSelTime(null))}>
                    {d}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{display:"flex",gap:14,padding:"6px 4px 12px",justifyContent:"center"}}>
              {[["var(--green)","Available"],["var(--yellow)","Selected"],["rgba(255,255,255,0.2)","Past"]].map(([c,l])=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"var(--gray-text)"}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:c}}/>
                  {l}
                </div>
              ))}
            </div>
          </div>

          {/* TIME SLOTS */}
          {selDate && (
            <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",padding:"16px 20px"}}>
              <div style={{fontSize:13,fontWeight:600,color:"var(--gray-mid)",marginBottom:12,display:"flex",justifyContent:"space-between"}}>
                <span>Available slots</span>
                <span style={{
                  background:"rgba(255,255,255,0.06)",
                  padding:"2px 10px",borderRadius:999,fontSize:12
                }}>
                  {selDate.toLocaleDateString("en-US",{month:"short",day:"numeric"})}
                </span>
              </div>
              {slots.length===0 ? (
                <div style={{textAlign:"center",padding:"16px 0",fontSize:13,color:"var(--gray-text)"}}>
                  Closed on Sundays
                </div>
              ) : !hasAny ? (
                <div style={{textAlign:"center",padding:"16px 0",fontSize:13,color:"var(--gray-text)"}}>
                  Fully booked for this day
                </div>
              ) : (
                <div className="time-grid">
                  {slots.map((s,i)=>(
                    <div key={i}
                      className={`time-slot${s.a?selTime===s.t?" selected":"": " unavail"}`}
                      onClick={()=>s.a&&setSelTime(s.t)}
                    >{s.t}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CONFIRM */}
          <div style={{padding:"16px 20px 20px",borderTop:"1px solid rgba(255,255,255,0.07)"}}>
            {selDate&&selTime&&(
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,fontSize:13,color:"var(--gray-mid)"}}>
                <span>{selService} · {selDate.toLocaleDateString("en-US",{month:"short",day:"numeric"})} · {selTime}</span>
                {provider.price>0&&<span style={{fontWeight:700,color:"var(--yellow)",fontSize:15}}>₹{provider.price}</span>}
              </div>
            )}
            <button
              className="btn btn-yellow"
              style={{width:"100%",borderRadius:12,padding:14,fontSize:14,
                opacity:selDate&&selTime?1:0.4,cursor:selDate&&selTime?"pointer":"not-allowed"}}
              disabled={!selDate||!selTime}
              onClick={confirmBooking}
            >
              {selDate&&selTime?"Confirm Booking":"Select date & time"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   BOOKING CONFIRMATION
═══════════════════════════════════════════════════ */
function ConfirmPage({params, setPage}){
  const [providerId,time,...rest] = params.split(":");
  const service = rest.join(":");
  let provider = null;
  for(const list of Object.values(PROVIDERS)){
    const f = list.find(p=>p.id===parseInt(providerId));
    if(f){provider=f;break;}
  }
  const bookingId = "CNG"+Math.floor(Math.random()*900000+100000);

  useEffect(()=>{
    const el = document.getElementById("confetti-wrap");
    if(!el) return;
    for(let i=0;i<60;i++){
      const d=document.createElement("div");
      const colors=["#FFE033","#22c55e","#3b82f6","#ef4444","#fff"];
      d.style.cssText=`
        position:absolute;
        width:${4+Math.random()*6}px;height:${8+Math.random()*8}px;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        left:${Math.random()*100}%;top:-10px;
        border-radius:2px;
        animation:fall ${1.5+Math.random()*2}s ${Math.random()*1}s linear both;
      `;
      el.appendChild(d);
    }
  },[]);

  return (
    <div className="page" style={{background:"var(--black)",display:"flex",alignItems:"center",justifyContent:"center",padding:"80px 24px"}}>
      <style>{`@keyframes fall{to{transform:translateY(100vh) rotate(360deg);opacity:0;}}`}</style>
      <div id="confetti-wrap" style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden"}}/>
      <div className="glass-card animate-scale" style={{maxWidth:480,width:"100%",padding:48,textAlign:"center"}}>
        {/* Check */}
        <div className="check-anim" style={{
          width:80,height:80,borderRadius:"50%",
          background:"var(--green-dim)",border:"2px solid var(--green)",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:36,margin:"0 auto 28px",
        }}>OK</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:800,marginBottom:8}}>
          Booking Confirmed!
        </h2>
        <p style={{color:"var(--gray-mid)",fontSize:14,marginBottom:32,lineHeight:1.6}}>
          Your appointment has been booked successfully. A confirmation has been sent to your email and phone.
        </p>
        <div style={{
          background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",
          borderRadius:14,padding:20,marginBottom:28,textAlign:"left"
        }}>
          {[
            ["Provider",provider?.name||"Standard Salon"],
            ["Service",service||"Hair-cut"],
            ["Time",time],
            ["Booking ID",bookingId],
            ["Status","Confirmed"],
          ].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
              <span style={{fontSize:13,color:"var(--gray-text)"}}>{k}</span>
              <span style={{fontSize:13,fontWeight:600,color:k==="Status"?"var(--green)":"#fff"}}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:12,justifyContent:"center"}}>
          <button className="btn btn-yellow" onClick={()=>setPage("profile")}>View Bookings</button>
          <button className="btn btn-glass" onClick={()=>setPage("home")}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PROFILE PAGE
═══════════════════════════════════════════════════ */
function ProfilePage({setPage,user}){
  const [activeTab,setActiveTab]=useState("bookings");
  const u = user||{name:"Sarah Anderson",email:"sarah.anderson@email.com",phone:"+1 (555) 123-4567",address:"Street 398, route 65, Las Vegas, USA",joined:"2023"};

  return (
    <div className="page" style={{background:"var(--black)"}}>
      <div style={{maxWidth:980,margin:"0 auto",padding:"clamp(20px,4vw,32px) clamp(16px,4vw,48px)"}}>
        {/* Profile header */}
        <div className="glass-card animate-fade-up" style={{padding:28,marginBottom:24,display:"flex",gap:24,alignItems:"center"}}>
          <div style={{
            width:90,height:90,borderRadius:"50%",
            background:"linear-gradient(135deg,var(--black3),#2a2a4a)",
            border:"2.5px solid rgba(255,224,51,0.35)",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:32,fontWeight:800,color:"var(--yellow)",
            flexShrink:0,
          }}>{u.name[0]}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,marginBottom:4}}>{u.name}</div>
            <div style={{fontSize:13,color:"var(--gray-mid)",marginBottom:3}}>{u.email} · {u.phone}</div>
            <div style={{fontSize:13,color:"var(--gray-mid)"}}>{u.address}</div>
          </div>
          <button className="btn btn-glass" style={{fontSize:13,padding:"9px 20px",flexShrink:0}}>
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:14,marginBottom:24}}>
          {[
            {label:"Total Bookings",val:"12",icon:"TB"},
            {label:"Completed",val:"10",icon:"CP"},
            {label:"Cancelled",val:"2",icon:"CN"},
            {label:"Member Since",val:u.joined,icon:"MS"},
          ].map((s,i)=>(
            <div key={i} className="glass-card animate-fade-up" style={{padding:18,textAlign:"center",animationDelay:`${i*.08}s`}}>
              <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:"var(--yellow)"}}>{s.val}</div>
              <div style={{fontSize:11,color:"var(--gray-text)",marginTop:3}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:"flex",gap:4,marginBottom:20,background:"rgba(255,255,255,0.04)",borderRadius:12,padding:4,border:"1px solid rgba(255,255,255,0.08)"}}>
          {["bookings","saved","settings"].map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{
              flex:1,padding:"9px 0",border:"none",borderRadius:9,
              background:activeTab===tab?"var(--yellow)":"transparent",
              color:activeTab===tab?"var(--black)":"var(--gray-mid)",
              fontWeight:activeTab===tab?700:500,fontSize:13,
              textTransform:"capitalize",transition:"all .2s"
            }}>{tab}</button>
          ))}
        </div>

        {activeTab==="bookings" && (
          <div className="glass-card animate-fade-in" style={{overflow:"hidden"}}>
            <div style={{padding:"18px 24px",borderBottom:"1px solid rgba(255,255,255,0.06)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontWeight:700}}>Recent Bookings</div>
              <span style={{fontSize:12,color:"var(--gray-text)"}}>View all</span>
            </div>
            {RECENT_BOOKINGS.map((b,i)=>(
              <div key={i} style={{
                display:"flex",alignItems:"center",gap:16,
                padding:"16px 24px",
                borderBottom:i<RECENT_BOOKINGS.length-1?"1px solid rgba(255,255,255,0.04)":"none",
                transition:"background .2s",cursor:"pointer",
              }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.03)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >
                <div style={{
                  width:44,height:44,borderRadius:12,
                  background:"rgba(255,255,255,0.05)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:20,flexShrink:0
                }}>{b.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:600}}>{b.service}</div>
                  <div style={{fontSize:12,color:"var(--gray-text)"}}>{b.provider}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:12,color:"var(--gray-mid)"}}>{b.date}</div>
                  <span className={`badge ${b.status==="completed"?"badge-green":"badge-red"}`} style={{marginTop:4}}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab==="saved" && (
          <div className="glass-card animate-fade-in" style={{padding:32,textAlign:"center"}}>
            <div style={{fontSize:40,marginBottom:12}}>SV</div>
            <div style={{fontWeight:600,marginBottom:6}}>No saved providers yet</div>
            <div style={{fontSize:13,color:"var(--gray-text)",marginBottom:20}}>Bookmark your favourite services for quick re-booking</div>
            <button className="btn btn-yellow" style={{fontSize:13,padding:"10px 24px"}} onClick={()=>setPage("grooming")}>Explore Services</button>
          </div>
        )}

        {activeTab==="settings" && (
          <div className="glass-card animate-fade-in" style={{padding:28}}>
            <div style={{fontSize:15,fontWeight:700,marginBottom:20}}>Account Settings</div>
            <div style={{display:"grid",gap:16}}>
              {[["Display Name",u.name],["Email",u.email],["Phone",u.phone]].map(([label,val])=>(
                <div key={label}>
                  <label className="form-label">{label}</label>
                  <input className="form-input" defaultValue={val}/>
                </div>
              ))}
              <button className="btn btn-yellow" style={{marginTop:8,alignSelf:"flex-start"}}>Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════════════════ */
function LoginPage({setPage, setUser, showToast}){
  const [phone,setPhone]=useState("");
  const [pass,setPass]=useState("");

  function handleLogin(){
    if(!phone||!pass){showToast("Please fill all fields");return;}
    setUser({name:"Sarah Anderson",phone,email:"sarah@email.com"});
    showToast("Welcome back, Sarah.");
    setPage("home");
  }

  return (
    <div className="page" style={{
      background:"var(--black)",
      display:"flex",alignItems:"center",justifyContent:"center",
      padding:"80px 24px",position:"relative",overflow:"hidden"
    }}>
      {/* BG blobs */}
      <div style={{position:"absolute",width:500,height:500,top:"-10%",right:"-5%",background:"rgba(255,224,51,0.06)",borderRadius:"50%",filter:"blur(100px)",animation:"liquidBlob 10s ease-in-out infinite"}}/>
      <div style={{position:"absolute",width:350,height:350,bottom:"5%",left:"-5%",background:"rgba(155,89,182,0.08)",borderRadius:"50%",filter:"blur(80px)",animation:"liquidBlob 8s ease-in-out 3s infinite"}}/>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:36,maxWidth:980,width:"100%",alignItems:"center"}}>
        {/* Left branding */}
        <div className="animate-fade-up" style={{padding:"20px 0"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(40px,5vw,56px)",fontWeight:900,lineHeight:1.1,marginBottom:20}}>
            Welcome<br/>back to<br/><span style={{color:"var(--yellow)"}}>ClicknGo</span>
          </div>
          <p style={{fontSize:15,color:"var(--gray-mid)",lineHeight:1.7}}>
            Your trusted platform for booking local services — from grooming to gaming, healthcare to home.
          </p>
          <div style={{display:"flex",flexDirection:"column",gap:12,marginTop:32}}>
            {[{icon:"GR",text:"Grooming"},{icon:"RE",text:"Real Estate"},{icon:"HC",text:"HealthCare"},{icon:"SG",text:"Sports & Gaming"}].map((item,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,fontSize:14,color:"var(--gray-mid)",animationDelay:`${.1+i*.08}s`}} className="animate-fade-up">
                <span style={{width:32,height:32,borderRadius:9,background:"var(--yellow-dim)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div className="glass-card animate-scale" style={{padding:36}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,marginBottom:4}}>Login Now</h2>
          <p style={{fontSize:13,color:"var(--gray-text)",marginBottom:28}}>Enter your details to continue</p>

          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div>
              <label className="form-label">Contact No.</label>
              <input className="form-input" placeholder="+1 (555) 000-0000" value={phone} onChange={e=>setPhone(e.target.value)}/>
            </div>
            <div>
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Enter your password" value={pass} onChange={e=>setPass(e.target.value)}/>
            </div>
            <div style={{textAlign:"right",marginTop:-8}}>
              <span style={{fontSize:12,color:"var(--yellow)",cursor:"pointer"}}>Forgot Password?</span>
            </div>
            <button className="btn btn-yellow" style={{width:"100%",borderRadius:12,padding:14}} onClick={handleLogin}>
              Log In
            </button>
            <div style={{textAlign:"center",fontSize:13,color:"var(--gray-text)"}}>
              Have no account?{" "}
              <span style={{color:"var(--yellow)",cursor:"pointer",fontWeight:600}} onClick={()=>setPage("signup")}>Create Now</span>
            </div>
            <div className="divider">or</div>
            <button className="social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Continue with Apple
            </button>
            <button className="social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SIGNUP PAGE
═══════════════════════════════════════════════════ */
function SignupPage({setPage, setUser, showToast}){
  const [form,setForm]=useState({first:"",last:"",phone:"",pass:"",confirm:""});
  function set(k){return e=>setForm(f=>({...f,[k]:e.target.value}));}

  function handleSignup(){
    if(!form.first||!form.last||!form.phone||!form.pass){showToast("Please fill all fields");return;}
    if(form.pass!==form.confirm){showToast("Passwords do not match");return;}
    setUser({name:`${form.first} ${form.last}`,phone:form.phone,email:""});
    showToast(`Welcome to ClicknGo, ${form.first}.`);
    setPage("home");
  }

  return (
    <div className="page" style={{
      background:"var(--black)",
      display:"flex",alignItems:"center",justifyContent:"center",
      padding:"80px 24px",position:"relative",overflow:"hidden"
    }}>
      <div style={{position:"absolute",width:500,height:500,top:"-10%",left:"-5%",background:"rgba(255,224,51,0.05)",borderRadius:"50%",filter:"blur(100px)",animation:"liquidBlob 10s ease-in-out infinite"}}/>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:36,maxWidth:980,width:"100%",alignItems:"center"}}>
        <div className="glass-card animate-scale" style={{padding:36}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,marginBottom:4}}>Sign Up</h2>
          <p style={{fontSize:13,color:"var(--gray-text)",marginBottom:28}}>Create your ClicknGo account</p>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:14}}>
              <div>
                <label className="form-label">First Name</label>
                <input className="form-input" placeholder="First name" value={form.first} onChange={set("first")}/>
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input className="form-input" placeholder="Last name" value={form.last} onChange={set("last")}/>
              </div>
            </div>
            <div>
              <label className="form-label">Contact No.</label>
              <input className="form-input" placeholder="+1 (555) 000-0000" value={form.phone} onChange={set("phone")}/>
            </div>
            <div>
              <label className="form-label">Create Password</label>
              <input className="form-input" type="password" placeholder="Min. 8 characters" value={form.pass} onChange={set("pass")}/>
            </div>
            <div>
              <label className="form-label">Confirm Password</label>
              <input className="form-input" type="password" placeholder="Repeat password" value={form.confirm} onChange={set("confirm")}/>
            </div>
            <button className="btn btn-yellow" style={{width:"100%",borderRadius:12,padding:14,marginTop:4}} onClick={handleSignup}>
              Sign Up
            </button>
            <div style={{textAlign:"center",fontSize:13,color:"var(--gray-text)"}}>
              Already have an account?{" "}
              <span style={{color:"var(--yellow)",cursor:"pointer",fontWeight:600}} onClick={()=>setPage("login")}>Log In</span>
            </div>
            <div className="divider">or</div>
            <button className="social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Continue with Apple
            </button>
            <button className="social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
          </div>
        </div>

        <div className="animate-fade-up">
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,5vw,52px)",fontWeight:900,lineHeight:1.1,marginBottom:20}}>
            Join<br/><span style={{color:"var(--yellow)"}}>ClicknGo</span><br/>Today
          </div>
          <p style={{fontSize:15,color:"var(--gray-mid)",lineHeight:1.7,marginBottom:28}}>
            Thousands of users trust ClicknGo every day to discover and book the best local services.
          </p>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {["Free to join, zero hidden fees","Instant booking confirmation","Secure payments via Razorpay / Stripe","Manage all your bookings in one place"].map((t,i)=>(
              <div key={i} className="animate-fade-up" style={{display:"flex",gap:12,alignItems:"center",animationDelay:`${.2+i*.08}s`}}>
                <div style={{width:22,height:22,borderRadius:"50%",background:"var(--green-dim)",border:"1px solid var(--green)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"var(--green)",flexShrink:0}}>OK</div>
                <span style={{fontSize:14,color:"var(--gray-mid)"}}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   REVIEWS PAGE
═══════════════════════════════════════════════════ */
function ReviewsPage({setPage}){
  const [rating,setRating]=useState(0);
  const [hov,setHov]=useState(0);
  const [text,setText]=useState("");
  const [submitted,setSubmitted]=useState(false);

  const allReviews = [...REVIEWS,
    {name:"Kavya Nair",rating:5,text:"Booked a dentist through ClicknGo and the experience was flawless. 10/10 would recommend to everyone!",date:"Feb 10, 2024",avatar:"KN"},
    {name:"Rohan Das",rating:3,text:"Good concept, but the Sports & Gaming section needs more providers in my area. Hope they expand soon.",date:"Jan 30, 2024",avatar:"RD"},
  ];

  return (
    <div className="page" style={{background:"var(--black)"}}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"clamp(24px,4vw,40px) clamp(16px,4vw,48px)"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:32,fontWeight:800,marginBottom:4}}>Reviews & Ratings</div>
        <p style={{color:"var(--gray-mid)",fontSize:14,marginBottom:36}}>What the ClicknGo community is saying</p>

        {/* Stats */}
        <div className="glass-card animate-fade-up" style={{padding:24,marginBottom:28,display:"flex",gap:32,alignItems:"center"}}>
          <div style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:52,fontWeight:900,color:"var(--yellow)",lineHeight:1}}>4.6</div>
            <div className="stars" style={{justifyContent:"center",marginTop:6}}>
              {[1,2,3,4,5].map(s=><span key={s} className={`star${s>5?" empty":""}`}>★</span>)}
            </div>
            <div style={{fontSize:12,color:"var(--gray-text)",marginTop:4}}>{allReviews.length} reviews</div>
          </div>
          <div style={{flex:1}}>
            {[5,4,3,2,1].map(n=>{
              const cnt = allReviews.filter(r=>r.rating===n).length;
              const pct = (cnt/allReviews.length)*100;
              return (
                <div key={n} style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                  <span style={{fontSize:12,color:"var(--gray-mid)",width:6}}>{n}</span>
                  <span style={{color:"#FFB800",fontSize:12}}>★</span>
                  <div style={{flex:1,height:6,background:"rgba(255,255,255,0.07)",borderRadius:99,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${pct}%`,background:"var(--yellow)",borderRadius:99,transition:"width .6s"}}/>
                  </div>
                  <span style={{fontSize:11,color:"var(--gray-text)",width:14}}>{cnt}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews list */}
        <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:32}}>
          {allReviews.map((r,i)=><ReviewCard key={i} r={r} i={i}/>)}
        </div>

        {/* Write review */}
        <div className="glass-card animate-fade-up" style={{padding:28}}>
          <div style={{fontSize:17,fontWeight:700,marginBottom:20}}>Write a Review</div>
          {submitted ? (
            <div style={{textAlign:"center",padding:"24px 0"}}>
              <div style={{fontSize:36,marginBottom:10}}>Done</div>
              <div style={{fontWeight:700,marginBottom:4}}>Thank you for your review!</div>
              <div style={{fontSize:13,color:"var(--gray-text)"}}>Your feedback helps the community make better choices.</div>
            </div>
          ) : (
            <>
              <div style={{marginBottom:16}}>
                <label className="form-label">Your Rating</label>
                <div style={{display:"flex",gap:6,marginTop:6}}>
                  {[1,2,3,4,5].map(s=>(
                    <span key={s} onClick={()=>setRating(s)} onMouseEnter={()=>setHov(s)} onMouseLeave={()=>setHov(0)}
                      style={{fontSize:28,cursor:"pointer",color:s<=(hov||rating)?"#FFB800":"rgba(255,255,255,0.15)",transition:"all .15s",transform:s<=(hov||rating)?"scale(1.2)":"scale(1)"}}>★</span>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:16}}>
                <label className="form-label">Your Review</label>
                <textarea className="form-input" rows={4} style={{resize:"vertical"}} placeholder="Share your experience..." value={text} onChange={e=>setText(e.target.value)}/>
              </div>
              <button className="btn btn-yellow" onClick={()=>{if(rating&&text)setSubmitted(true);}}>
                Submit Review
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SEARCH RESULTS
═══════════════════════════════════════════════════ */
function SearchPage({query, setPage}){
  const q = query.toLowerCase();
  const results = [];
  for(const [catId,list] of Object.entries(PROVIDERS)){
    list.forEach(p=>{
      if(p.name.toLowerCase().includes(q)||p.sub.toLowerCase().includes(q)||p.tags.some(t=>t.toLowerCase().includes(q))){
        results.push({...p,catId});
      }
    });
  }

  return (
    <div className="page" style={{background:"var(--black)"}}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"clamp(24px,4vw,40px) clamp(16px,4vw,48px)"}}>
        <div style={{marginBottom:8,fontSize:13,color:"var(--gray-text)"}}>Search results for</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:800,marginBottom:4}}>"{query}"</div>
        <div style={{fontSize:13,color:"var(--gray-mid)",marginBottom:32}}>{results.length} result{results.length!==1?"s":""} found</div>

        {results.length===0 ? (
          <div className="glass-card" style={{padding:48,textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:12}}>NA</div>
            <div style={{fontWeight:700,marginBottom:6}}>No results found</div>
            <div style={{fontSize:13,color:"var(--gray-text)",marginBottom:20}}>Try searching for "Salon", "Dental", "Gaming" etc.</div>
            <button className="btn btn-yellow" style={{fontSize:13,padding:"10px 24px"}} onClick={()=>setPage("home")}>Go Home</button>
          </div>
        ) : (
          <div style={{border:"1px solid rgba(255,255,255,0.07)",borderRadius:20,overflow:"hidden",background:"rgba(255,255,255,0.02)"}}>
            {results.map((p,i)=>{
              const cat = CATEGORIES.find(c=>c.id===p.catId);
              return (
                <div key={p.id}>
                  <ProviderRow p={p} onClick={()=>setPage("detail:"+p.id)} accentColor={cat?.color}/>
                  {i<results.length-1 && <div style={{height:1,background:"rgba(255,255,255,0.05)",margin:"0 20px"}}/>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   LIST YOUR BUSINESS PAGE
═══════════════════════════════════════════════════ */
function ListBusinessPage({setPage, showToast}){
  const [step,setStep]=useState(1);
  const [form,setForm]=useState({name:"",category:"",address:"",phone:"",desc:""});
  function set(k){return e=>setForm(f=>({...f,[k]:e.target.value}));}

  return (
    <div className="page" style={{background:"var(--black)"}}>
      {/* Hero */}
      <div style={{
        position:"relative",
        padding:"64px 48px 48px",
        textAlign:"center",
        overflow:"hidden",
        borderBottom:"1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 100%,rgba(255,224,51,0.08),transparent 70%)"}}/>
        <div style={{position:"relative"}}>
          <span className="badge badge-yellow" style={{marginBottom:16,display:"inline-flex"}}>For Business Owners</span>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,5vw,52px)",fontWeight:900,marginBottom:16}}>
            Grow Your Business<br/>with ClicknGo
          </h1>
          <p style={{fontSize:16,color:"var(--gray-mid)",maxWidth:540,margin:"0 auto"}}>
            Join 3,000+ local businesses already using ClicknGo to manage bookings, reach new customers, and grow revenue.
          </p>
        </div>
      </div>

      {/* Features */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20,maxWidth:980,margin:"48px auto",padding:"0 clamp(16px,4vw,48px)"}}>
        {[
          {icon:"SD",title:"Smart Dashboard",desc:"Track bookings, revenue, and customer reviews in real-time."},
          {icon:"BC",title:"Booking Calendar",desc:"Manage your availability. Customers book only when you're free."},
          {icon:"IP",title:"Instant Payouts",desc:"Get paid instantly via Razorpay or Stripe. Zero delays."},
        ].map((f,i)=>(
          <div key={i} className="glass-card animate-fade-up" style={{padding:24,animationDelay:`${i*.1}s`,textAlign:"center"}}>
            <div style={{fontSize:32,marginBottom:12}}>{f.icon}</div>
            <div style={{fontWeight:700,marginBottom:8}}>{f.title}</div>
            <div style={{fontSize:13,color:"var(--gray-mid)",lineHeight:1.6}}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{maxWidth:580,margin:"0 auto 64px",padding:"0 48px"}}>
        <div className="glass-card animate-scale" style={{padding:36}}>
          {/* Step indicator */}
          <div style={{display:"flex",gap:8,marginBottom:28}}>
            {[1,2,3].map(s=>(
              <div key={s} style={{flex:1,height:4,borderRadius:99,
                background:s<=step?"var(--yellow)":"rgba(255,255,255,0.1)",
                transition:"background .4s"}}/>
            ))}
          </div>
          <div style={{fontSize:12,color:"var(--gray-text)",marginBottom:4}}>Step {step} of 3</div>
          <div style={{fontSize:18,fontWeight:700,marginBottom:24}}>
            {step===1?"Business Details":step===2?"Service Info":"Review & Submit"}
          </div>

          {step===1 && (
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <div><label className="form-label">Business Name</label><input className="form-input" placeholder="e.g. Standard Salon" value={form.name} onChange={set("name")}/></div>
              <div><label className="form-label">Category</label>
                <select className="form-input" value={form.category} onChange={set("category")} style={{background:"#fff",color:"var(--white)"}}>
                  <option value="">Select category</option>
                  {CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div><label className="form-label">Address</label><input className="form-input" placeholder="Street, City, State" value={form.address} onChange={set("address")}/></div>
              <div><label className="form-label">Contact Number</label><input className="form-input" placeholder="+1 (555) 000-0000" value={form.phone} onChange={set("phone")}/></div>
              <button className="btn btn-yellow" style={{marginTop:8}} onClick={()=>setStep(2)}>Next</button>
            </div>
          )}
          {step===2 && (
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <div><label className="form-label">Business Description</label><textarea className="form-input" rows={4} placeholder="Describe your services..." value={form.desc} onChange={set("desc")} style={{resize:"vertical"}}/></div>
              <div><label className="form-label">Working Hours</label><input className="form-input" placeholder="e.g. 10:00 AM – 8:00 PM"/></div>
              <div><label className="form-label">Services Offered</label><input className="form-input" placeholder="e.g. Haircut, Styling, Beard Trim"/></div>
              <div style={{display:"flex",gap:12}}>
                <button className="btn btn-outline" style={{flex:1}} onClick={()=>setStep(1)}>Back</button>
                <button className="btn btn-yellow" style={{flex:1}} onClick={()=>setStep(3)}>Next</button>
              </div>
            </div>
          )}
          {step===3 && (
            <div>
              <div style={{background:"rgba(255,255,255,0.04)",borderRadius:12,padding:20,marginBottom:20,border:"1px solid rgba(255,255,255,0.07)"}}>
                {[["Business",form.name||"—"],["Category",form.category||"—"],["Address",form.address||"—"],["Phone",form.phone||"—"]].map(([k,v])=>(
                  <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                    <span style={{fontSize:13,color:"var(--gray-text)"}}>{k}</span>
                    <span style={{fontSize:13,fontWeight:500}}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:12}}>
                <button className="btn btn-outline" style={{flex:1}} onClick={()=>setStep(2)}>Back</button>
                <button className="btn btn-yellow" style={{flex:1}} onClick={()=>{showToast("Business listed. We'll review within 24 hours.");setPage("home");}}>Submit Listing</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer setPage={setPage}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   404 PAGE
═══════════════════════════════════════════════════ */
function NotFoundPage({setPage}){
  return (
    <div className="page" style={{display:"flex",alignItems:"center",justifyContent:"center",background:"var(--black)"}}>
      <div className="animate-scale" style={{textAlign:"center",padding:48}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(80px,15vw,140px)",fontWeight:900,color:"var(--yellow)",lineHeight:1,opacity:.7}}>404</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,marginBottom:8}}>Page Not Found</div>
        <p style={{fontSize:14,color:"var(--gray-mid)",marginBottom:28}}>The page you're looking for doesn't exist or was moved.</p>
        <button className="btn btn-yellow" onClick={()=>setPage("home")}>Back to Home</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════ */
export default function App(){
  const [showSplash,setShowSplash]=useState(true);
  const [page,setPage]=useState("home");
  const [user,setUser]=useState(null);
  const {msg,show:showToast}=useToast();

  // Inject global styles
  useEffect(()=>{
    const el=document.createElement("style");
    el.textContent=STYLE;
    document.head.appendChild(el);
    return()=>el.remove();
  },[]);

  // Scroll to top on page change
  useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"});},[page]);

  function navigate(p){setPage(p);}

  function renderPage(){
    if(page==="home") return <HomePage setPage={navigate} user={user}/>;
    if(page==="login") return <LoginPage setPage={navigate} setUser={setUser} showToast={showToast}/>;
    if(page==="signup") return <SignupPage setPage={navigate} setUser={setUser} showToast={showToast}/>;
    if(page==="profile") return <ProfilePage setPage={navigate} user={user}/>;
    if(page==="reviews") return <ReviewsPage setPage={navigate}/>;
    if(page==="list-business") return <ListBusinessPage setPage={navigate} showToast={showToast}/>;
    if(CATEGORIES.some(c=>c.id===page)) return <CategoryPage catId={page} setPage={navigate}/>;
    if(page.startsWith("detail:")) return <DetailPage providerId={page.split(":")[1]} setPage={navigate} showToast={showToast}/>;
    if(page.startsWith("confirm:")) return <ConfirmPage params={page.replace("confirm:","")} setPage={navigate}/>;
    if(page.startsWith("search:")) return <SearchPage query={page.replace("search:","")} setPage={navigate}/>;
    return <NotFoundPage setPage={navigate}/>;
  }

  return (
    <>
      {showSplash && <SplashPage onDone={()=>setShowSplash(false)}/>}
      <Nav page={page} setPage={navigate} user={user} setUser={setUser}/>
      {renderPage()}
      {msg && <div className="toast">{msg}</div>}
    </>
  );
}
