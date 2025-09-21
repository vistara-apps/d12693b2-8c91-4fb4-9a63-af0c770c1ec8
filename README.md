# Forkd - Base Mini App

Discover and book unique culinary experiences with local chefs.

## Features

- 🍴 **Chef Profiles**: Browse verified local chefs and their specialties
- 📅 **Experience Booking**: Book cooking classes and dining events
- 💳 **Integrated Payments**: Secure payments via Base wallet
- 🌐 **Virtual & In-Person**: Support for both virtual and in-person experiences
- ⭐ **Reviews & Ratings**: Community-driven chef and experience ratings
- 📱 **Mobile-First**: Optimized for mobile experience in Base App

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base network integration via MiniKit
- **Wallet**: OnchainKit for wallet functionality
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your OnchainKit API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/products/onchainkit)

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Base App**:
   Navigate to `http://localhost:3000` in Base App or compatible Farcaster client

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # MiniKit & OnchainKit providers
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── AppShell.tsx      # Main app layout
│   ├── ChefCard.tsx      # Chef profile cards
│   └── ExperienceCard.tsx # Experience listing cards
├── lib/                  # Utilities and types
│   ├── types.ts          # TypeScript definitions
│   ├── utils.ts          # Helper functions
│   └── mock-data.ts      # Sample data
└── public/               # Static assets
```

## Key Components

### Chef Profiles
- Verified chef badges
- Cuisine specialties
- Ratings and reviews
- Profile photos and bios

### Experience Listings
- Detailed descriptions
- Pricing and duration
- Virtual/in-person options
- Availability scheduling
- Ingredient kit details

### Booking System
- Real-time availability
- Secure payment processing
- Booking confirmations
- Calendar integration

## Design System

The app uses a custom design system with:
- **Primary Color**: `hsl(346, 80%, 58%)` (Pink/Red)
- **Accent Color**: `hsl(198, 88%, 50%)` (Blue)
- **Dark Theme**: Optimized for Base App
- **Mobile-First**: Responsive design patterns
- **Accessibility**: ARIA labels and keyboard navigation

## Base Mini App Features

- **Frame Actions**: Book experiences, view profiles
- **Wallet Integration**: Connect Base wallet for payments
- **Social Identity**: Leverage Farcaster profiles
- **Notifications**: Booking confirmations and reminders

## Development

### Adding New Features

1. Define types in `lib/types.ts`
2. Create components in `components/`
3. Add mock data in `lib/mock-data.ts`
4. Implement pages in `app/`

### Styling Guidelines

- Use Tailwind utility classes
- Follow the design system tokens
- Ensure mobile-first responsive design
- Maintain accessibility standards

## Deployment

The app is optimized for deployment on Vercel or similar platforms that support Next.js 15.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
