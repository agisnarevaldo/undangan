# 💌 Wedding Invitation Website - Next.js Version

![Thumbnail](/public/assets/images/banner.webp)

This is a modern Next.js 14+ version of the wedding invitation website, migrated from the original vanilla HTML/CSS/JavaScript implementation.

## 🚀 What's New

This project has been migrated to **Next.js 14+** with the following improvements:

- ✅ **Modern App Router**: Using Next.js 14+ app directory structure
- ✅ **TypeScript**: Full TypeScript support for better type safety
- ✅ **Static Site Generation**: Optimized static export for fast loading
- ✅ **React Components**: Modular, reusable components
- ✅ **SEO Optimized**: Enhanced metadata and SEO tags
- ✅ **Performance**: Improved build optimization and code splitting

## 📦 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The application will automatically reload when you make changes to the code.

### Production Build

```bash
# Create optimized production build
npm run build

# The static files will be generated in the 'out' directory
```

### Deployment

The built website can be deployed to any static hosting service:

1. **GitHub Pages**: Upload the `out/` directory
2. **Netlify**: Connect your repository and deploy automatically
3. **Vercel**: Deploy with one click (recommended for Next.js)
4. **Any CDN or Static Host**: Upload the contents of `out/` directory

## 📂 Project Structure

```
.
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home/guest page
│   ├── globals.css        # Global styles
│   └── dashboard/         # Admin dashboard
│       └── page.tsx
├── components/            # React components
│   ├── GuestPage.tsx     # Main guest invitation page
│   └── DashboardPage.tsx # Admin dashboard component
├── public/               # Static assets (images, CSS, etc.)
│   ├── assets/          # Images, music, videos
│   └── css/             # Original CSS files
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Customization

### Update Wedding Information

Edit the following files to customize the wedding details:

1. **Guest Page** (`components/GuestPage.tsx`):
   - Bride and groom names
   - Wedding date and countdown
   - Event details (time, location)
   - Gallery images

2. **Metadata** (`app/layout.tsx`):
   - Page title and description
   - OpenGraph tags for social sharing
   - Icons and theme colors

### Styling

- Global styles: `app/globals.css`
- Original CSS files are imported from `public/css/`
- Bootstrap 5.3.8 is loaded via CDN
- FontAwesome 7.1.0 for icons

## 🔧 Features

### Guest Page Features

- ✅ Countdown timer to wedding date
- ✅ Guest name from URL parameter (`?to=Name`)
- ✅ Responsive design (mobile and desktop)
- ✅ Image gallery with Bootstrap carousel
- ✅ Google Maps integration
- ✅ Animated welcome screen
- ✅ AOS (Animate On Scroll) animations

### Dashboard Features

- ✅ Simple authentication UI
- ✅ Statistics display (comments, attendance)
- ✅ Responsive admin interface

## 📝 Scripts

```bash
# Development
npm run dev              # Start Next.js dev server

# Production
npm run build           # Build for production
npm run start           # Start production server

# Linting
npm run lint            # Run Next.js linter
npm run lint:js         # Lint JavaScript files
npm run lint:css        # Lint CSS files
npm run lint:html       # Lint HTML files

# Legacy (original build system)
npm run dev:legacy      # Start esbuild dev server
npm run build:legacy    # Build with esbuild
```

## 🌐 Environment Variables

For production deployment, you can configure:

- `NEXT_PUBLIC_API_URL`: Backend API URL (if using comments feature)
- `NEXT_PUBLIC_TENOR_KEY`: Tenor API key for GIFs

## ⚙️ Tech Stack

### Core
- **Next.js 16.0.8**: React framework with app router
- **React 19.2**: UI library
- **TypeScript 5.9**: Type safety

### UI Framework
- **Bootstrap 5.3.8**: CSS framework
- **FontAwesome 7.1.0**: Icon library
- **AOS 2.3.4**: Scroll animations
- **Google Fonts**: Josefin Sans font

### Build Tools
- **Turbopack**: Fast Next.js bundler
- **ESLint**: Code linting
- **Stylelint**: CSS linting

## 🔄 Migration Notes

This project was migrated from vanilla HTML/CSS/JavaScript to Next.js while:

- ✅ Preserving all original features and content
- ✅ Maintaining the same visual design
- ✅ Keeping CSS files for compatibility
- ✅ Converting JavaScript to React/TypeScript
- ✅ Using modern Next.js best practices

### Key Differences from Original

1. **Static Export**: The Next.js version uses static site generation
2. **Component-Based**: Pages are split into reusable React components
3. **TypeScript**: Better type safety and developer experience
4. **Modern Tooling**: Next.js provides better optimization and development experience

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐞 Security Vulnerabilities

If you find any security vulnerabilities, please email [dewanakretarta29@gmail.com](mailto:dewanakretarta29@gmail.com).

## 📜 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 🙏 Credits

- Original template by [dewanakl](https://github.com/dewanakl)
- Migrated to Next.js 14+
- All visual assets sourced from Pixabay

---

**Built with ❤️ using Next.js**
