# CariSTPM 🎓

![Screenshot (52)](https://github.com/user-attachments/assets/5611973c-41ef-4b3b-b686-0693142bcbbb)
A modern web application for finding and comparing Form 6 (STPM) schools in Malaysia. CariSTPM helps students, parents, and educators make informed decisions about their educational journey.

## 📊 Data Source

All school and subject package data is scraped from the official MOE Form 6 Central Information System ([SST6](https://sst6.moe.gov.my/form6/pakejt6.cfm)).

### Last Data Update: April 5, 2025

The scraper collects comprehensive information about:
- Schools across all states in Malaysia
- Available subject packages for each semester
- Core and elective subjects for both Science and Arts streams

### Data Format
Each record contains:
- State (Negeri)
- District (PPD)
- School/Center (Pusat)
- Semester (1 or 3)
- Stream (Bidang)
- Subject Package

## ✨ Features

- **School Search & Filtering**: Find schools by name, location, and available streams
- **Comprehensive Comparison**: Compare up to 4 schools side-by-side
- **Multilingual Support**: Available in English and Bahasa Malaysia
- **Smart Filtering**: Filter schools by states, subjects, and streams
- **Modern UI**: Beautiful, responsive design with dark mode support
- **AI-Powered Guidance**: Get personalized answers about entry requirements and eligibility

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) with App Router and Server Components
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [Supabase](https://supabase.com/)
- **Styling:** 
  - [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
  - [Shadcn UI](https://ui.shadcn.com/) for beautiful, accessible components
  - [Framer Motion](https://www.framer.com/motion/) for smooth animations
- **State Management:** 
  - [React Context](https://react.dev/reference/react/createContext) for app-wide state
  - [nuqs](https://nuqs.47ng.com/) for URL search params
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **UI Components:** [Radix UI](https://www.radix-ui.com/) for accessible primitives

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/CariSTPM.git
cd CariSTPM
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            # Reusable React components
│   ├── ui/               # Shadcn UI components
│   └── layout/           # Layout components
├── context/              # React Context providers
│   ├── language-context  # Multilingual support
│   └── comparison-context # School comparison state
└── lib/                  # Utilities and configurations
    └── supabase/        # Database client and queries
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/AmazingFeature
```

3. Follow our coding standards:
   - Use TypeScript for all new code
   - Follow functional programming patterns
   - Write descriptive commit messages using conventional commits
   - Ensure responsive design with Tailwind CSS
   - Optimize for performance using React Server Components when possible
   - Add bilingual support for all user-facing text

4. Commit your changes:
```bash
git commit -m "feat: Add amazing feature"
```

5. Push to your branch:
```bash
git push origin feature/AmazingFeature
```

6. Open a Pull Request

### Commit Message Guidelines

- Use conventional commits format
- Start with type: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Keep subject line under 50 characters
- Use imperative mood ("Add feature" not "Added feature")
- Wrap body at 72 characters
- Separate subject from body with blank line

Example:
```
feat(search): Add advanced filtering options

- Implement state-based filtering
- Add subject stream filters
- Support multiple filter combinations
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
