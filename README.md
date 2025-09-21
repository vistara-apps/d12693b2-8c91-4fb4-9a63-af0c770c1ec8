# Forkd - Culinary Experience Platform

A Base Mini App that connects food enthusiasts with local chefs for personalized cooking classes and exclusive dining events.

## Features

### Core Features
- **Chef Profile & Experience Listing**: Chefs create profiles showcasing their expertise and list specific culinary experiences
- **Booking & Scheduling System**: Simple interface for booking available slots for chef experiences
- **Integrated Payment Gateway**: Secure payment processing for bookings
- **User Reviews & Ratings**: Users can leave reviews and ratings for completed experiences

### Technical Features
- **Base Mini App**: Built for Farcaster frames with Base Wallet integration
- **Farcaster Identity**: Uses Farcaster profiles as primary user authentication
- **Responsive Design**: Mobile-first design with dark theme
- **Type-Safe**: Full TypeScript implementation

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base Network, Wagmi, Viem
- **Farcaster**: Frame SDK for mini app integration
- **State Management**: React Query for server state
- **Type Safety**: TypeScript throughout

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── chef/              # Chef-related pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

## API Endpoints

- `GET/POST /api/chefs` - Chef management
- `GET/POST /api/experiences` - Experience management
- `POST /api/bookings` - Booking creation

## Design System

### Colors
- Primary: `hsl(346, 80%, 58%)` - Vibrant pink
- Accent: `hsl(198, 88%, 50%)` - Bright blue
- Background: `hsl(220, 12%, 10%)` - Dark blue-gray
- Surface: `hsl(220, 14%, 16%)` - Medium blue-gray
- Text Primary: `hsl(220, 14%, 95%)` - Light gray
- Text Secondary: `hsl(220, 14%, 75%)` - Medium gray

### Typography
- Display: `text-5xl font-bold`
- Headline: `text-3xl font-semibold`
- Body: `text-base font-normal leading-7`
- Caption: `text-sm font-medium`

## Deployment

This app is designed to be deployed as a Base Mini App within Farcaster frames. Ensure you have:

1. Base Wallet integration configured
2. Farcaster Frame SDK properly set up
3. Environment variables for production

## Contributing

1. Follow the established code style and TypeScript types
2. Add tests for new features
3. Update documentation as needed
4. Ensure responsive design works across devices

## License

This project is licensed under the MIT License.

