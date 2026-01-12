# 🧬 health-trace

> **Helping humans detect health patterns through comprehensive lifestyle tracking and descriptive data synthesis.**

`health-trace` is a full-stack health-tracking tool designed to help people having health issues organize and present their daily data. By capturing the interplay between diet, activity, medication, and symptoms, it provides a clear, objective snapshot for users to share with their healthcare providers.

---

### ⚠️ Portfolio Disclaimer
**This project is a technical showcase for a developer portfolio.**
* **Purely Descriptive:** `health-trace` does not provide medical advice, diagnosis, treatment plans, or clinical assessments. 
* **No Diagnostic Logic:** The AI integration is strictly limited to summarizing user-logged data into a readable, descriptive format. This is not a diagnostic tool.
* **Data Privacy:** This is currently a demonstration environment. Users are advised not to enter real-world sensitive health information (PHI) at this time. 

---

## 🚀 The Problem: The "Clinical Gap"
Most clinical visits last only **15 minutes**. For patients with complex health needs, it is nearly impossible to accurately report the interactions between their diet, stress levels, medication adherence, and symptom flares. This clinical gap often leads to missed patterns and delayed treatment adjustments. 

`health-trace` addresses this by acting as a digital archive, ensuring that a month of daily life can be communicated clearly in seconds.



---

## ✨ Key Features

### 1. 360° Multi-Factor Tracking
A centralized interface to log the variables that impact daily well-being:
* **Subjective Well-being:** 1-10 scales for mental and physical states.
* **Symptom Documentation:** Structured logs for tracking the frequency and characteristics of specific physical events.
* **Intake & Activity:** Quick-log tags for food, hydration, caffeine/alcohol/nicotine, and physical activities.
* **Medication Adherence:** Simple daily checklists to document compliance with existing treatment.
* **Contextual Factors:** Tracking for stress levels and mood to capture environmental triggers.

### 2. The "One-Click" Demo (The Alex Profile)
To provide a frictionless review for demo and privacy purposes, the app features a **Seeded Demo Profile**:
* **User Persona:** "Alex", a patient tracking chronic fatigue, headaches and recurring symptoms.
* **Seeded Data:** 30 days of pre-populated logs demonstrating high-intensity tracking.
* **Immediate Review:** Ability to see the data visualization and AI summary features in action without manual entry.

### 3. Descriptive AI Synthesis (OpenAI GPT-4o)
The AI engine acts as a "Data Scribe," transforming scattered daily logs into a structured, descriptive summary:
* **Trend Identification:** Aggregates raw logs into frequency reports (e.g., "User reported #Fatigue on 12 out of 30 days").
* **Correlation Mapping:** Highlights concurrent data points (e.g., "Symptoms often coincided with logs of < 6 hours of sleep").
* **Objective Focus:** The system is engineered to avoid providing medical opinions, focusing entirely on descriptive data visualization.

### 4. The "Doctor's Handout"
Generates a professional **PDF Dashboard** designed to be reviewed by a clinician. It prioritizes high-level trend lines and frequency charts, allowing the provider to see a month’s worth of data at a glance.

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **NextJS** | Provides the full-stack architecture, utilizing API routes for OpenAI integration and SSR for generating static, printable reports. |
| **Frontend** | **React** | Interactive UI for high-speed, low-friction logging. |
| **Database / ORM** | **Prisma** | Type-safe schema management for complex health variables. |
| **Authentication** | **NextAuth.js / OAuth 2.0** | Secure, modern authentication and profile management. |
| **Synthesis Layer** | **OpenAI API** | Pattern recognition and descriptive data formatting. |



---

## 🧠 Technical Highlights

### Data Modeling with Prisma
I designed a relational schema to handle the "Many-to-One" relationship between various lifestyle logs and symptom events. This ensures that every food tag, medication checkmark, and stress score is correctly associated with a specific timeframe for accurate correlation.

### Secure OAuth 2.0 Integration
By implementing **NextAuth** and **OAuth 2.0**, I’ve prioritized security, privacy and ease of access. The app uses OAuth 2.0 to handle identity verification, ensuring a professional-grade authentication flow that protects the user's data integrity.

### Strict AI Guardrails
To ensure the app remains a documentation tool and not a diagnostic one, the **OpenAI System Prompt** is strictly limited. It is instructed to only describe the data provided and is explicitly forbidden from suggesting medical causes, treatments, or plans.

---

<!-- ## 📸 Demo Preview
*(Add your screenshots here)*
| Daily Log View | Trend Dashboard | Synthesis Report |
| :---: | :---: | :---: |
| [Image] | [Image] | [Image] |

--- -->

<!-- ## 🛠️ Installation & Setup
1. Clone the repository: `git clone https://github.com/your-username/health-trace.git`
2. Install dependencies: `npm install`
3. Configure your `.env` file (Prisma Database URL, OpenAI Key, NextAuth Secret).
4. Synchronize the database: `npx prisma db push`
5. Run the dev server: `npm run dev`

--- -->

**Developed by Kendra McVay** *Focused on helping doctors help people feel better faster.*
