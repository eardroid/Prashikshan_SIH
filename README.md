# Prashiskshan - Verified Internships Platform

A high-fidelity, production-ready institutional internship platform with ultra-minimal design, cinematic animations, and comprehensive features.

## 🚀 Features

- **Role-Based Portals**: Tailored experiences for Students, Faculty, Industry, and Government
- **Micro-Learning Hub**: AI-powered skill development with readiness tracking
- **SOS System**: Immediate incident response with severity-based triage
- **Analytics Dashboards**: Website metrics and stakeholder-specific insights
- **Blockchain Verification**: Immutable certificate verification with QR holograms
- **3D Animations**: React Three Fiber for interactive globe and certificate displays
- **Responsive Design**: Mobile-first approach with buttery smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion + GSAP + React Three Fiber
- **Forms**: React Hook Form + Zod validation
- **State Management**: SWR for data fetching
- **Testing**: Playwright (E2E) + Jest (Unit) + Axe (Accessibility)
- **CI/CD**: GitHub Actions

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Lint code
npm run lint
```

## 📁 Project Structure

```
/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── NavBar.tsx
│   │   ├── HeroGlobe.tsx
│   │   ├── ReadinessMeter.tsx
│   │   ├── SkillCard.tsx
│   │   ├── AIMentorWidget.tsx
│   │   ├── SOSForm.tsx
│   │   ├── MetricCard.tsx
│   │   ├── CaseTimeline.tsx
│   │   └── QRHologram.tsx
│   ├── pages/               # Next.js pages
│   │   ├── index.tsx        # Landing page
│   │   ├── micro-learning.tsx
│   │   ├── sos.tsx
│   │   ├── developers.tsx
│   │   ├── portals/
│   │   │   ├── student.tsx
│   │   │   ├── faculty.tsx
│   │   │   └── industry.tsx
│   │   ├── analytics/
│   │   │   ├── website.tsx
│   │   │   └── stakeholder.tsx
│   │   ├── auth/
│   │   │   └── login.tsx
│   │   └── api/             # API routes
│   │       ├── auth/
│   │       ├── courses.ts
│   │       ├── sos.ts
│   │       ├── analytics.ts
│   │       └── verify.ts
│   ├── lib/                 # Utility functions
│   │   ├── api.ts
│   │   └── auth.ts
│   ├── data/                # Mock data
│   │   └── seed.json
│   └── styles/              # Global styles
│       ├── globals.css
│       └── motion.css
├── tests/
│   ├── e2e/                 # Playwright tests
│   │   └── smoke.spec.ts
│   └── unit/                # Jest tests
│       ├── ReadinessMeter.test.tsx
│       ├── SkillCard.test.tsx
│       └── accessibility.test.tsx
└── public/                  # Static assets
```

## 🎨 Design System

### Colors
- **Primary**: Neon Blue (#00d4ff) to Primary (#0ea5e9)
- **Accent**: Neon Purple (#a855f7)
- **Success**: Neon Green (#10b981)
- **Warning**: Orange (#f97316)
- **Error**: Red (#ef4444)

### Typography
- **Font Family**: Inter (system-ui fallback)
- **Display**: 5.5rem - 2.5rem with tight tracking
- **Body**: 1rem - 1.25rem with relaxed leading

### Animations
- **Easing**: cubic-bezier(0.22, 0.9, 0.35, 1)
- **Duration**: 500ms - 800ms for entrances
- **Hover Scale**: 1.03 with 150ms transition

## 🔐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_MICROSOFT_CLIENT_ID=your_microsoft_client_id
```

## 📊 API Documentation

### Authentication
```
POST /api/auth/login
Body: { email, password, role }
Response: { success, token, user }
```

### Courses
```
GET /api/courses?category=technical&limit=10
Response: { success, data, meta }
```

### SOS
```
POST /api/sos
Body: { severity, description, evidence, geoTag, anonymous }
Response: { success, caseId, sla, status }
```

### Analytics
```
GET /api/analytics?type=website
GET /api/analytics?type=stakeholder&role=colleges
Response: { success, data }
```

### Verification
```
POST /api/verify
Body: { certificateId, type }
Response: { success, verified, certificate }
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t prashiskshan .
docker run -p 3000:3000 prashiskshan
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

Built with ❤️ by the Prashiskshan team

## 📞 Support

- Email: support@prashiskshan.in
- Documentation: https://docs.prashiskshan.in
- Discord: https://discord.gg/prashiskshan

---

**Note**: This is a production-ready prototype. All authentication, payment processing, and blockchain integrations are mocked for demonstration purposes. Implement proper security measures before deploying to production.
