# ELOYCE University — Smart Campus Assistance System

A complete web application that enables students to submit campus service requests and complaints while empowering university authorities to triage, assign departments, track SLAs, and resolve issues in real time.

## Features Implemented

### Core Features
- **Student Registration & Login:** Full authentication modal supporting new student registration, login, and instant role switching between Student accounts and University Authority Admin.
- **Submit a Complaint or Service Request:** Structured submission form with location, category, priority, automatic department routing, and quick test scenario presets.
- **Categorize Requests:** Supports 7 campus categories (`Classroom`, `IT & Network`, `Maintenance`, `Transport`, `Lost Belongings`, `Academic Support`, and `Administrative`).
- **View Submitted Requests:** Dedicated student and campus-wide ticket views with detailed modal inspection.
- **Track Request Status:** Visual 4-step resolution progress bar (`Submitted` → `Assigned` → `In Progress` → `Resolved`) and timestamped audit trail.
- **Admin Dashboard:** University Authority operations center with live KPI counters and inline triage controls.
- **Update Request Status:** Inline and modal status updates that append audit history and notify students immediately.
- **Search & Filter Requests:** Real-time keyword search and multi-filter dropdowns by Category, Status, Priority, and Department.

### Advanced Features & Bonus Challenge
- **Priority-Based Complaint Management:** 4 priority tiers (`Critical`, `High`, `Medium`, `Low`) with SLA targets and priority queue sorting.
- **Dashboard Statistics & Charts:** Interactive Chart.js visualizations for Requests by Category, Priority Distribution, and Department Workload.
- **Request Assignment to Departments:** Automatic and manual routing across 6 official university departments.
- **Real-Time Status Change Notifications:** Live toast alerts and slide-out Notification Center with unread badge tracking.
- **Bonus Challenge — Automatic Priority Recommendation Engine:** Live keyword, phrase, and category analyzer that recommends a priority tier, confidence score, and target department as the student types.

## Project Structure

```text
eloyce-smart-campus/
├── index.html          # Main application entry point
├── css/
│   └── styles.css      # Custom styles, animations, and hero banner styling
├── js/
│   └── app.js          # State management, AI priority recommender, charts, and UI logic
├── assets/
│   └── hero-archway.jpg # ELOYCE University campus archway header image
├── .gitignore          # Git ignore rules
├── LICENSE             # MIT License
└── README.md           # Project documentation
```

## Quick Start & GitHub Pages Deployment

1. **Run Locally:** Open `index.html` in any modern browser, or serve the folder with `npx serve .` or `python3 -m http.server 8000`.
2. **Publish to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ELOYCE University Smart Campus Assistance System"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. **Enable GitHub Pages:** Go to your repository **Settings → Pages**, select **Deploy from a branch**, choose `main` and `/ (root)`, and click **Save**.
