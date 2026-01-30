# Printoonline

An independent price comparison platform for online printing services. Compare prices from multiple verified printers for business cards, flyers, posters, and banners.

## Overview

Printoonline helps small businesses, freelancers, designers, and marketing agencies find the best printing deals by comparing prices from multiple printing services in seconds.

## Features

- **Price Comparison Engine**: Real-time comparison of printing prices from multiple verified printers
- **Multiple Product Types**: Support for business cards, flyers, posters, and banners
- **Flexible Options**: Standard and express delivery options
- **Quality Ratings**: View quality scores for each printing service
- **Responsive Design**: Professional B2B design that works on all devices
- **Independent Platform**: Completely unbiased comparisons with no printer affiliations

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React

## Project Structure

```
printoonline/
├── app/
│   ├── api/
│   │   └── compare/
│   │       └── route.ts          # Price comparison API endpoint
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── compare/
│   │   └── page.tsx              # Main comparison page (core feature)
│   ├── contact/
│   │   └── page.tsx              # Contact form page
│   ├── for-printers/
│   │   └── page.tsx              # Information for printing partners
│   ├── how-it-works/
│   │   └── page.tsx              # Explanation of platform
│   ├── layout.tsx                # Root layout with header/footer
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Site navigation header
│   │   └── Footer.tsx            # Site footer
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── mock-data.ts              # Mock printer data and pricing logic
│   ├── supabase.ts               # Legacy Supabase types (not used)
│   └── utils.ts                  # Utility functions
└── public/                       # Static assets

## Data Structure

The application uses in-memory mock data defined in `lib/mock-data.ts`:

### MVP Products (4 Total)

1. **Business Cards**
   - Orientation: Horizontal / Vertical
   - Sides: 1 / 2
   - Paper Weight: 250 / 300 / 350 gsm
   - Finish: Laminated / Unlaminated
   - Quantity: 100 / 250 / 500
   - Delivery: Standard / Express

2. **Flyers**
   - Size: A5 / A4 / DL
   - Sides: 1 / 2
   - Paper Weight: 90 / 135 / 170 gsm
   - Finish: Laminated / Unlaminated
   - Quantity: 100 / 250 / 500 / 1000
   - Delivery: Standard / Express

3. **Posters**
   - Size: A3 / A2 / A1
   - Sides: 1
   - Paper Weight: 135 / 170 / 250 gsm
   - Quantity: 100 / 250 / 500
   - Delivery: Standard / Express

4. **Large Format (Roll-up)**
   - Size: 85x200 / 100x200 cm
   - Sides: 1
   - Quantity: 1 / 2 / 5
   - Delivery: Standard / Express

### MockPrinter
- id (string)
- name (string) - Printer company name
- websiteUrl (string) - Printer's website
- qualityScore (number, 1-5) - Quality rating
- deliverySpeedFactor (number) - Delivery time multiplier
- description (string) - Brief description

### Pricing Logic
- Base price calculated from product type and selected attributes
- Printer variation multiplier (0.85 to 1.15) for realistic price differences
- **Quantity Multiplier:**
  - ≤100: 1.0
  - 101-250: 0.95 (5% discount)
  - 251-500: 0.90 (10% discount)
  - >500: 0.85 (15% discount)
- **Delivery Modifier:**
  - Standard: 1.0
  - Express: 1.25 (25% premium)
- **Total Price:** basePrice × printerMultiplier × quantityMultiplier × deliveryModifier

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

The application uses in-memory mock data for the price comparison engine, so no database configuration is required. The app works out of the box!

## Testing

See `TEST-COMPARISON.md` for detailed test cases and manual testing instructions.

## Key Pages

### Home (/)
- Clear value proposition
- Feature highlights
- How it works overview
- Call-to-action buttons

### Compare (/compare)
- Product selection form
- Quantity input
- Delivery time options
- Real-time price comparison results
- Sorted by price (cheapest first)
- Quality ratings and delivery estimates

### How It Works (/how-it-works)
- Step-by-step explanation
- Platform benefits
- Frequently asked questions

### For Printers (/for-printers)
- Partnership benefits
- How to join the platform
- Fair comparison commitment

### About (/about)
- Mission and values
- Independence statement
- Who we serve

### Contact (/contact)
- Contact form (UI only, no email sending)
- Multiple inquiry types
- Quick links to other pages

## API Endpoints

### POST /api/compare
Compare prices from multiple printers using in-memory mock data with product-specific attributes.

**Request Body Examples:**

Business Cards:
```json
{
  "productType": "business_cards",
  "orientation": "Horizontal",
  "sides": "2",
  "paperWeight": "300 gsm",
  "finish": "Laminated",
  "quantity": 250,
  "deliveryTime": "standard"
}
```

Flyers:
```json
{
  "productType": "flyers",
  "size": "A4",
  "sides": "2",
  "paperWeight": "135 gsm",
  "finish": "Unlaminated",
  "quantity": 500,
  "deliveryTime": "express"
}
```

Posters:
```json
{
  "productType": "posters",
  "size": "A2",
  "paperWeight": "170 gsm",
  "quantity": 100,
  "deliveryTime": "standard"
}
```

Large Format:
```json
{
  "productType": "large_format",
  "size": "85x200 cm",
  "quantity": 2,
  "deliveryTime": "express"
}
```

**Validation Rules:**
- `productType` must be one of: business_cards, flyers, posters, large_format
- `quantity` must match the allowed quantities for the product type
- `deliveryTime` must be either "standard" or "express" (case-insensitive)
- Product-specific attributes must match the allowed values for each product type

**Success Response (200):**
```json
{
  "success": true,
  "results": [
    {
      "printer_name": string,
      "price": number,
      "delivery_days": number,
      "quality_score": number,
      "website_url": string,
      "description": string
    }
  ],
  "query": {
    "productType": string,
    "quantity": number,
    "deliveryTime": string,
    ...attributes
  }
}
```

**Error Response (400/500):**
```json
{
  "error": string
}
```

## Design Philosophy

- **Professional B2B aesthetic**: Clean, neutral design focused on clarity
- **No startup clichés**: Avoiding typical SaaS design patterns
- **Responsive**: Works seamlessly on mobile, tablet, and desktop
- **Accessible**: Semantic HTML and proper ARIA labels
- **Performance**: Optimized for fast loading and smooth interactions

## Future Development

This MVP provides a solid foundation for:
- Real-time API integrations with actual printers
- User accounts and saved comparisons
- Advanced filtering and sorting options
- Printer dashboard for partners
- Analytics and reporting
- Email notifications
- Payment processing

## License

This project is a proprietary MVP for Printoonline.

## Support

For questions or issues, visit the Contact page or refer to the documentation.
