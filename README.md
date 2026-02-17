# Portfolio Website

Modern portfolio website built with Next.js 16, TypeScript, and Tailwind CSS, featuring atomic design architecture.

## 🚀 Quick Start

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

Visit [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
portfolio-website/
├── app/                    # Next.js app directory
├── components/
│   ├── atoms/             # Basic components (Button, Text, Container)
│   ├── molecules/         # Composite components (Navigation, ProjectCard)
│   └── organisms/         # Complex components (Hero, ProjectsSection, Footer)
├── lib/
│   ├── constants/         # Design tokens (colors, typography, spacing)
│   └── utils/             # Utility functions
└── public/                # Static assets
```

## ✨ Features

- 🎨 Modern dark theme with gradient effects
- 💫 Smooth animations and transitions
- 📱 Fully responsive design
- ⚡ Built with Next.js 16 App Router
- 🎯 TypeScript for type safety
- 🧩 Atomic design pattern
- 🎭 Glassmorphism effects

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)
- **Utilities**: clsx, tailwind-merge

## 📝 Customization

### Update Content

Edit components in `components/organisms/`:
- `Hero.tsx` - Hero section content
- `ProjectsSection.tsx` - Project listings
- `Footer.tsx` - Footer links and info

### Change Colors

Edit `lib/constants/colors.ts` to customize the color palette.

### Add New Sections

1. Create component in `components/organisms/`
2. Import and add to `app/page.tsx`

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
