# Human DesAIn - AI-Powered Human Design Platform

## 🚀 Overview

Human DesAIn is a revolutionary platform that combines the ancient wisdom of Human Design with cutting-edge artificial intelligence. Our platform provides precise, scientifically-grounded Human Design analysis without esoteric jargon.

## ✨ Features

- **AI-Powered Analysis**: Advanced algorithms for precise Human Design calculations
- **AI Coach**: Personalized insights powered by artificial intelligence
- **Relationship Analysis**: AI-driven insights into partnership and team dynamics
- **Transit & Cycles**: Real-time transits and AI-enhanced cycle predictions
- **Cross-Check System**: Double-verified chart calculations for maximum accuracy
- **GDPR Compliant**: Full data privacy and security compliance

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.5, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Backend**: Supabase
- **AI Integration**: OpenAI API
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/human-desain.git

# Navigate to the project directory
cd human-desain

# Install dependencies
npm install --legacy-peer-deps

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🚀 Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the production application
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── chart/             # Chart creation and viewing
│   ├── dashboard/         # User dashboard
│   └── relationship/      # Relationship analysis
├── components/            # React components
│   ├── ai-coach/         # AI coach chat interface
│   ├── charts/           # Chart visualization
│   ├── forms/            # Form components
│   └── ui/               # UI components
├── config/               # Configuration files
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   └── hd-engine/       # Human Design calculation engine
├── services/             # API services
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🌟 Support

For support, email support@humandesain.ai or open an issue on GitHub.

---

Built with ❤️ by the Human DesAIn Team