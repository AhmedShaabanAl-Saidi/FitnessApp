# 🏋️‍♂️ Super Fitness App

Super Fitness is a state-of-the-art, feature-rich web application designed to empower athletes and fitness enthusiasts. Built using the latest **Angular** framework, **Tailwind CSS v4**, and **PrimeNG**, it features a fully integrated **AI Smart Coach** and professional onboarding modules.

---

## ✨ Key Features

### 🤖 Smart Coach Chatbot
* **AI Personal Trainer:** A built-in AI chatbot powered by the **Google Gemini API** with real-time streaming responses.
* **Smart Context:** Offers personalized training advice, workout planning, and nutrition tips based on your fitness goals.
* **Interactive UI:** Smooth chat bubbles, customized avatars, and instant feedback.

### 🌍 Multilingual & Theme Support
* **Multi-language Support:** Complete internationalization (i18n) setup with custom language interceptors and on-the-fly language switching.
* **System/Custom Dark Mode:** Supports fluid theme switching between Light and Dark mode using the beautiful Aura preset from PrimeNG.

### 📋 Interactive Onboarding Sandbox
* **Dynamic Goal Setting:** Personalized onboarding experience that collects user metrics (weight, height, target goal, activity level).
* **Custom Number Pickers:** High-performance weight and height scroll-selectors for precise measurement input.

### 🏃‍♂️ Comprehensive Workout & Nutrition Guides
* **Personalized Plans:** Dynamic tabs and carousels showcasing category-specific workouts, difficulty levels, and healthy recipes.

---

## 🛠️ Tech Stack

* **Core:** [Angular](https://angular.dev/) (v22/v19), TypeScript
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (high-performance CSS-first setup)
* **UI Components:** [PrimeNG](https://primeng.org/) (styled with Aura preset)
* **Icons:** [Lucide Angular](https://lucide.dev/), [PrimeIcons](https://primeng.org/icons)
* **Testing:** [Vitest](https://vitest.dev/) (fast and modern test runner)
* **Documentation:** [Compodoc](https://compodoc.app/) (automatic project documentation engine)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AhmedShaabanAl-Saidi/FitnessApp.git
   cd FitnessApp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Run the Application
Start the development server:
```bash
npm start
```
*If your Node.js version is below `v22.22.3` and you get an Angular CLI version warning, you can run:*
```bash
node -r ./bypass-node.js ./node_modules/@angular/cli/bin/ng.js serve
```
Open **`http://localhost:4200`** in your browser.

---

## 📖 Interactive Documentation (Compodoc)

We use Compodoc to automatically parse, document, and map our codebase architecture.

### View Documentation Locally
1. Generate the documentation:
   ```bash
   npm run doc:generate
   ```
2. Run the interactive docs server:
   ```bash
   npm run doc:serve
   ```
3. Open **`http://localhost:8080`** in your browser.

---

## 🌐 Continuous Deployment (Vercel)

This application is configured for automatic CI/CD deployment on **Vercel**:
* **Main Application:** Hosted at your root production URL.
* **Interactive Documentation:** Hosted seamlessly under the `/docs` path (e.g., `https://your-domain.vercel.app/docs`).
