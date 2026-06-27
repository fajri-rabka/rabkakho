# Architecture & Tech Stack

This document outlines the architecture, technology stack, and directory structure of the Portfolio Website project.

## Technology Stack

The project is built with a modern, performance-oriented web development stack, utilizing the following core technologies:

### Framework & Core
- **[Next.js](https://nextjs.org/) (v16)**: The core React framework used for building the application. It leverages the App Router for routing, Server Components for performance, and API routes for backend functionality.
- **[React](https://react.dev/) (v19)**: The foundational UI library.
- **[TypeScript](https://www.typescriptlang.org/)**: Used across the entire project for static type checking, improving maintainability and developer experience.

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/) (v4)**: Utility-first CSS framework for rapid, responsive, and consistent UI development.
- **[Framer Motion](https://www.framer.com/motion/)**: Used for smooth, complex micro-animations and page transitions to create a premium feel.
- **[Three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)**: For rendering 3D graphics and interactive webGL elements seamlessly within the React ecosystem.
- **[Lucide React](https://lucide.dev/)**: A library of clean, consistent SVG icons.
- **clsx & tailwind-merge**: Utilities for conditionally joining class names and safely merging Tailwind classes without style conflicts.

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)**: For efficient, flexible, and performant form handling with minimal re-renders.
- **[Zod](https://zod.dev/)**: For rigorous schema-based data validation.
- **@hookform/resolvers**: Integrates Zod schemas seamlessly with React Hook Form.

### Backend & Security
- **[Nodemailer](https://nodemailer.com/)**: Utilized within Next.js server-side API routes to handle sending outgoing emails (e.g., handling Contact Form submissions).
- **Cloudflare Turnstile (@marsidev/react-turnstile)**: Integrated for privacy-preserving bot protection and spam prevention on public forms.

## Project Structure

The repository follows a standard and scalable Next.js layout, organized by feature and responsibility:

```text
rabkakho/
├── app/                  # Next.js App Router (pages, layouts, API routes)
├── components/           # Reusable React components (UI elements, forms, 3D scenes)
├── context/              # React Context providers for global state management
├── hooks/                # Custom React hooks encapsulating reusable client-side logic
├── lib/                  # Utility functions, helpers, Zod schemas, and configurations
├── public/               # Static assets (images, fonts, 3D models) served at the root `/`
├── scripts/              # Custom Node.js scripts (e.g., for build steps or utilities)
└── docs/                 # Project documentation (Architecture, setup guides, etc.)
```

### Key Architectural Concepts

- **Server and Client Components**: The application leverages Next.js App Router, defaulting to React Server Components. This optimizes performance by significantly reducing the client-side JavaScript bundle size. Client components (`"use client"`) are used selectively for interactivity, animations, and 3D rendering.
- **Declarative 3D**: The project uses `@react-three/fiber` to declaratively create and manage 3D scenes. This allows 3D elements to natively react to standard React application state and context.
- **Secure Form Processing**: Client-side forms are heavily optimized using `react-hook-form` and validated via `zod`. Before server processing (like sending emails), submissions are gated by Cloudflare Turnstile to ensure security against automated spam.
