export type ProductType = 'business_cards' | 'flyers' | 'posters' | 'large_format';

export type ProductAttributes = {
  orientation?: string;
  sides?: string;
  paperWeight?: string;
  finish?: string;
  size?: string;
  quantity: number;
  deliveryTime: string;
};

export type MockPrinter = {
  id: string;
  name: string;
  websiteUrl: string;
  qualityScore: number;
  deliverySpeedFactor: number;
  description: string;
};

export const mockPrinters: MockPrinter[] = [
  {
    id: '1',
    name: 'BudgetPrint',
    websiteUrl: 'https://budgetprint.com',
    qualityScore: 3.5,
    deliverySpeedFactor: 1.3,
    description: 'Budget-friendly printing for all needs',
  },
  {
    id: '2',
    name: 'EconoPress',
    websiteUrl: 'https://econopress.com',
    qualityScore: 3.8,
    deliverySpeedFactor: 1.2,
    description: 'Affordable printing without compromising quality',
  },
  {
    id: '3',
    name: 'PrintExpress',
    websiteUrl: 'https://printexpress.com',
    qualityScore: 4.5,
    deliverySpeedFactor: 0.9,
    description: 'Fast and reliable printing services with premium quality',
  },
  {
    id: '4',
    name: 'QuickPrint Pro',
    websiteUrl: 'https://quickprintpro.com',
    qualityScore: 4.2,
    deliverySpeedFactor: 0.8,
    description: 'Express printing solutions for businesses',
  },
  {
    id: '5',
    name: 'PremiumPrint',
    websiteUrl: 'https://premiumprint.com',
    qualityScore: 4.8,
    deliverySpeedFactor: 1.0,
    description: 'High-end printing for demanding projects',
  },
  {
    id: '6',
    name: 'SpeedyGraphics',
    websiteUrl: 'https://speedygraphics.com',
    qualityScore: 4.0,
    deliverySpeedFactor: 0.7,
    description: 'Lightning-fast turnaround times',
  },
];

export const productOptions = {
  business_cards: {
    label: 'Business Cards',
    orientation: ['Horizontal', 'Vertical'],
    sides: ['1', '2'],
    paperWeight: ['250 gsm', '300 gsm', '350 gsm'],
    finish: ['Laminated', 'Unlaminated'],
    quantity: [100, 250, 500],
  },
  flyers: {
    label: 'Flyers',
    size: ['A5', 'A4', 'DL'],
    sides: ['1', '2'],
    paperWeight: ['90 gsm', '135 gsm', '170 gsm'],
    finish: ['Laminated', 'Unlaminated'],
    quantity: [100, 250, 500, 1000],
  },
  posters: {
    label: 'Posters',
    size: ['A3', 'A2', 'A1'],
    sides: ['1'],
    paperWeight: ['135 gsm', '170 gsm', '250 gsm'],
    quantity: [100, 250, 500],
  },
  large_format: {
    label: 'Large Format (Roll-up)',
    size: ['85x200 cm', '100x200 cm'],
    sides: ['1'],
    quantity: [1, 2, 5],
  },
};

function calculateBasePrice(
  productType: ProductType,
  attributes: ProductAttributes
): number {
  let basePrice = 20;

  switch (productType) {
    case 'business_cards':
      basePrice = 15;
      if (attributes.orientation === 'Vertical') basePrice += 1;
      if (attributes.sides === '2') basePrice += 5;
      if (attributes.paperWeight === '300 gsm') basePrice += 3;
      if (attributes.paperWeight === '350 gsm') basePrice += 6;
      if (attributes.finish === 'Laminated') basePrice += 4;
      break;

    case 'flyers':
      basePrice = 25;
      if (attributes.size === 'A4') basePrice += 8;
      if (attributes.size === 'DL') basePrice += 3;
      if (attributes.sides === '2') basePrice += 10;
      if (attributes.paperWeight === '135 gsm') basePrice += 4;
      if (attributes.paperWeight === '170 gsm') basePrice += 8;
      if (attributes.finish === 'Laminated') basePrice += 6;
      break;

    case 'posters':
      basePrice = 30;
      if (attributes.size === 'A2') basePrice += 15;
      if (attributes.size === 'A1') basePrice += 30;
      if (attributes.paperWeight === '170 gsm') basePrice += 5;
      if (attributes.paperWeight === '250 gsm') basePrice += 10;
      break;

    case 'large_format':
      basePrice = 80;
      if (attributes.size === '100x200 cm') basePrice += 15;
      break;
  }

  return basePrice;
}

export function calculatePrice(
  productType: ProductType,
  attributes: ProductAttributes,
  printerVariation: number
): number {
  const basePrice = calculateBasePrice(productType, attributes);

  const printerMultiplier = 0.85 + printerVariation * 0.05;

  let quantityMultiplier = 1.0;
  if (attributes.quantity >= 100 && attributes.quantity <= 250) {
    quantityMultiplier = 0.95;
  } else if (attributes.quantity > 250 && attributes.quantity <= 500) {
    quantityMultiplier = 0.90;
  } else if (attributes.quantity > 500) {
    quantityMultiplier = 0.85;
  } else if (attributes.quantity <= 5) {
    quantityMultiplier = 1.0;
  }

  const deliveryMultiplier = attributes.deliveryTime === 'express' ? 1.25 : 1.0;

  return basePrice * printerMultiplier * quantityMultiplier * deliveryMultiplier;
}

export function calculateDeliveryDays(
  deliveryTime: string,
  deliverySpeedFactor: number
): number {
  const baseDays = deliveryTime.toLowerCase() === 'express' ? 2 : 5;
  return Math.round(baseDays * deliverySpeedFactor);
}

export const VALID_PRODUCT_TYPES: ProductType[] = [
  'business_cards',
  'flyers',
  'posters',
  'large_format',
];

export const VALID_DELIVERY_TIMES = ['standard', 'express'];
