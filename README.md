# Next-Gen Learning Dashboard

Welcome to the **Next-Gen Learning Dashboard**! This is a modern, dark-mode, responsive learning portal built as a Frontend Intern Challenge assignment. It incorporates student progress tracking, a learning activity heatmap, and responsive layouts.

The visual design is inspired by high-quality dark themes like Linear, Vercel, and Notion dark mode, focusing on sleek border strokes, glassmorphic grids, and micro-animations, while remaining clean, maintainable, and realistic.

---

## 🛠️ Tech Stack
* **Framework**: Next.js 16+ (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS v4
* **Animations**: Framer Motion
* **Database / Backend**: Supabase
* **Icons**: Lucide React

---

## 📐 Architecture Decisions

### 1. Component Separation & Reusability
The project structure keeps components focused, modular, and reusable:
* `components/BentoGrid.tsx`: Controls the responsive grid structure and handles staggered animations.
* `components/Sidebar.tsx`: Manages complex responsive navigation (collapsible on desktop, icon-only on tablet, and bottom bar on mobile).
* `components/HeroCard.tsx` / `CourseCard.tsx` / `ActivityCard.tsx`: Standalone grid tiles encapsulating their respective layouts and internal animations.
* `components/LoadingSkeleton.tsx`: Custom skeleton templates designed to map exactly to the dashboard structure.

### 2. Server vs Client Component Division
To optimize performance and meet requirements, components are split cleanly between the server and client:
* **Server Components**:
  * `src/app/page.tsx`: Fetches the courses from Supabase. By conducting database calls on the server, we eliminate client-side fetching overhead, keep secrets secure, and enable instant rendering.
* **Client Components**:
  * `components/DashboardClient.tsx`: Acts as the parent controller. It accepts initial courses from the server page, manages the active navigation tab state, and swaps panels.
  * `components/Sidebar.tsx`: Manages toggle states and active hover menu indicator overlays using Framer Motion.
  * `components/BentoGrid.tsx` & Cards: Utilize Client hooks from Framer Motion for animations.

---

## 🗄️ Supabase Integration

### Schema & Tables
We define a `courses` table containing:
* `id` (`uuid`, primary key, defaults to `gen_random_uuid()`)
* `title` (`text`, non-empty)
* `progress` (`integer`, representing percentage $0 - 100$)
* `icon_name` (`text`, mapping to a Lucide icon component name)
* `created_at` (`timestamp with time zone`)

A complete database creation script and sample seeds are located in [supabase_schema.sql](file:///Users/anuragkumar/.gemini/antigravity/scratch/next-gen-learning-dashboard/supabase_schema.sql).

### Error Boundaries & Developer UX
If a database request fails (e.g. wrong credentials, network outage), Next.js catches it at the server boundary and redirects to `src/app/error.tsx`. The error page displays:
1. The error description.
2. A step-by-step troubleshooting checklist.
3. An active "Try Again" retry trigger.

*Frictionless Reviewer Mocking*: If the environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are empty or placeholders, the server gracefully prints a console warning and displays local high-fidelity mock data. This ensures the dashboard works immediately upon launching `npm run dev` without crashing.

---

## ✨ Animation Strategy (Framer Motion)

Animations are configured to add polish without distracting from usability:
* **Page Load Stagger**: The `BentoGrid` uses a staggered entry transition (`staggerChildren`). Each card shifts upwards slightly ($y: 20 \rightarrow 0$) and fades in sequentially.
* **Spring Physics**: Card hovers utilize a precise spring transition (`stiffness: 300`, `damping: 20`) to scale between $1.01$ and $1.02$.
* **Glow Hover Effects**: On hover, cards gain a subtle background gradient tint and an accent blue border-shadow glow (`rgba(59,130,246,0.08)`).
* **Progress Bar Mount**: Course cards animate their progress bar width from $0\%$ to their actual value using a custom ease transition, highlighting active progress.
* **Sidebar Active Slide**: Both the desktop sidebar and mobile bottom nav use Framer Motion `layoutId` on their active markers. Clicking a tab causes the highlight pill to slide dynamically between items.

---

## 📱 Responsive Layout Details

* **Desktop** ($1024\text{px}+$): Fully detailed sidebar (collapsible manually using the chevron control), multi-column Bento Grid (3-columns layout).
* **Tablet** ($768\text{px} - 1023\text{px}$): Sidebar collapses automatically to icon-only. Bento Grid renders in a 2-column format.
* **Mobile** ($<768\text{px}$): The sidebar hidden. A fixed glassmorphic bottom navigation bar handles tab selection. The Bento Grid stacks vertically into a single-column layout.

---

## 🚀 Running the Project Locally

### 1. Configure Credentials
Create a `.env.local` file at the root of the project:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Set Up Database
1. Go to your [Supabase Console](https://supabase.com/dashboard) and open your SQL Editor.
2. Paste the queries in [supabase_schema.sql](file:///Users/anuragkumar/.gemini/antigravity/scratch/next-gen-learning-dashboard/supabase_schema.sql) and hit **Run**.

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💡 Challenges Faced & Solutions
1. **Next.js 16 & React 19 Framer Motion Hydration Warnings**: In React 19, server rendering element positions might conflict with initial client layout markers. Placing `AnimatePresence` and conditional rendering guards inside client components prevents hydration flicker.
2. **Double Render layoutId Conflict**: The sidebar active indicator could conflict if desktop sidebar and mobile bottom nav share the same active `layoutId` while mounting. Splitting them into distinct layouts (`activeHighlightDesktop` and `activeHighlightMobile`) keeps sliding animations localized and clean.
