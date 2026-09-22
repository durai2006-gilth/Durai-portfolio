# Durai's Personal Portfolio Website

A modern, responsive, and futuristic dark-themed developer portfolio for **Durai**, a 3rd-year **B.Tech Information Technology** student looking for internship opportunities.

---

## 🚀 Features

- **3D Particle Background**: GPU-accelerated 3D glowing particle system built with Three.js. Automatically adapts particle density for mobile devices and honors `prefers-reduced-motion`.
- **Glassmorphism Design System**: Modern semi-transparent dark panels (`backdrop-filter: blur()`), soft cyan/purple neon glows, gradient typography, and 3D tilt effects on hover.
- **Editable Contact System**: Manage all contact info (Email, Phone, Location, GitHub, LinkedIn, Resume) from a single JavaScript configuration object (`portfolioData` in `script.js`).
- **Responsive Layout**: Designed for mobile, tablet, laptop, and desktop screens with a mobile hamburger navigation menu.
- **Form Validation**: Contact form with input validation and clear guidance for connecting email backend services (Formspree, EmailJS, Web3Forms).

---

## 🛠️ Project Structure

```text
portfolio/
│
├── index.html       # Main HTML5 structure with semantic elements & accessibility
├── style.css        # Futuristic dark neon styling, glassmorphism, responsive queries
├── script.js        # Config object, Three.js 3D particles, 3D tilt, form handling
└── README.md        # Documentation and customization guide
```

---

## ⚙️ How to Edit Personal Details

All personal details are central in **`script.js`** near the top of the file:

```javascript
const portfolioData = {
    name: "Durai",
    email: "duraikarthick0512@gmail.com",
    phone: "+91 86108 69163",
    location: "Thoothukudi",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    resume: "#"
};
```

### Updating Links:
1. **GitHub**: Replace `"https://github.com/yourusername"` with your actual GitHub profile URL.
2. **LinkedIn**: Replace `"https://linkedin.com/in/yourusername"` with your actual LinkedIn profile URL.
3. **Resume**: Replace `"#"` with the link to your Google Drive resume or local PDF file (e.g., `"assets/Durai_Resume.pdf"`).

---

## 📬 Connecting the Contact Form to Email Backend

By default, the contact form validates input and shows a confirmation message. To receive actual emails sent by visitors:

1. Sign up for a free form backend like [Formspree](https://formspree.io/) or [Web3Forms](https://web3forms.com/).
2. Copy your unique form endpoint URL.
3. Open `script.js` and paste your endpoint into `formEndpoint`:

```javascript
const formEndpoint = "https://formspree.io/f/your_form_id";
```

---

## 🌐 How to Preview Locally

Open `index.html` in any modern web browser or start a lightweight server:

### Python 3:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

### Node / npx:
```bash
npx serve .
```
