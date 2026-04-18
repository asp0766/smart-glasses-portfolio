# 🕶️ Smart IoT Glasses — Portfolio Site

Production-ready marketing / portfolio site for an **IoT smart glasses** project that detects **drowsiness** via a camera and triggers a **speaker alert** after **4–5 seconds** of eye closure.

---

## 🌐 Live Demo

👉 https://smartspecsasp.netlify.app/

---

## 📌 How It Works (Working Logic)

This system is designed to monitor eye activity in real-time and detect signs of drowsiness.

### 🔁 Workflow:

1. 🎥 **Camera Input**
   - Captures real-time video of the user's face  

2. 👁 **Eye Detection**
   - Uses Computer Vision (OpenCV / MediaPipe)  
   - Detects whether eyes are open or closed  

3. ⏱ **Time Tracking**
   - Measures how long eyes remain closed  

4. 🚨 **Alert Trigger**
   - If eyes are closed for more than **4–5 seconds**  
   - Speaker/buzzer triggers an alert  

5. 🔄 **Continuous Monitoring**
   - System keeps running in a loop  

---

## 🧠 System Reasoning

- **Threshold-based detection** avoids false alerts from blinking  
- **Wearable design (glasses)** ensures accurate eye alignment  
- **Real-time processing** improves safety in critical scenarios  
- **IoT-based system** allows future scalability  

---

## 🌍 Use Cases

- 🚗 **Drivers** → Prevent accidents due to drowsiness  
- 🎓 **Students** → Detect fatigue during study  
- 🏭 **Industrial Workers** → Improve workplace safety  

---

## ⚙️ Tech Stack

- **React (Vite)**
- **Tailwind CSS v4**
- **React Three Fiber + Three.js (3D Interaction)**
- **Framer Motion (Animations)**

---

## 📁 Folder Structure


smart-glasses-portfolio/
├── public/
│ └── favicon.svg
├── src/
│ ├── components/
│ │ ├── Hero.jsx
│ │ ├── ModelViewer.jsx
│ │ ├── InfoPanel.jsx
│ │ ├── FlowSection.jsx
│ │ ├── CodeSection.jsx
│ │ ├── GithubSection.jsx
│ │ ├── Contact.jsx
│ │ ├── ScrollProgress.jsx
│ │ └── ThemeToggle.jsx
│ ├── context/
│ │ ├── themeContext.js
│ │ ├── ThemeProvider.jsx
│ │ └── useTheme.js
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── netlify.toml
├── vite.config.js
└── package.json


---

## 🧪 Setup

**Requirements:** Node.js 18+ (20+ recommended)

```bash
cd smart-glasses-portfolio
npm install
🚀 Commands
Command	Description
npm run dev	Start development server
npm run build	Production build
npm run preview	Preview build
🧩 3D Viewer
Built using React Three Fiber + Three.js
Interactive model with:
Rotation (OrbitControls)
Clickable components (Camera, ESP32, Speaker, Battery)
Each component shows detailed information
⚙️ Customization
GitHub link → GithubSection.jsx
Contact info → Contact.jsx
🚀 Deployment (Netlify)
Push project to GitHub
Connect repo on Netlify
Use:
Build command: npm run build
Publish directory: dist
⭐ Highlights
Real-time drowsiness detection concept
Interactive 3D product visualization
Clean and modern UI
Recruiter-friendly portfolio design
📞 Contact

Name: Anurag Parmar
Email: asp07660766@gmail.com

LinkedIn: https://www.linkedin.com/in/asp0766

Portfolio: https://asp0766.netlify.app/
