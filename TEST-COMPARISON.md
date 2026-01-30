# Test Cases for MVP Price Comparison

## Manual Testing Guide

### Test 1: Business Cards - Basic Configuration
**Input:**
- Product Type: `business_cards`
- Orientation: `Horizontal`
- Sides: `1`
- Paper Weight: `250 gsm`
- Finish: `Unlaminated`
- Quantity: `100`
- Delivery Time: `standard`

**Expected Results:**
- Should return 6 printers sorted by price
- Base configuration, no premium features
- Standard delivery times (6-7 days depending on printer)

### Test 2: Business Cards - Premium Configuration
**Input:**
- Product Type: `business_cards`
- Orientation: `Vertical`
- Sides: `2`
- Paper Weight: `350 gsm`
- Finish: `Laminated`
- Quantity: `500`
- Delivery Time: `express`

**Expected Results:**
- Higher prices due to premium options (double-sided, heavy paper, laminated)
- Express delivery (2-3 days)
- Quantity discount applied (10% for 500 units)

### Test 3: Flyers - Large Format
**Input:**
- Product Type: `flyers`
- Size: `A4`
- Sides: `2`
- Paper Weight: `170 gsm`
- Finish: `Laminated`
- Quantity: `1000`
- Delivery Time: `standard`

**Expected Results:**
- Larger format and double-sided increases price
- Volume discount for 1000 units (15%)
- Results sorted by total price

### Test 4: Posters - Economy Option
**Input:**
- Product Type: `posters`
- Size: `A3`
- Paper Weight: `135 gsm`
- Quantity: `100`
- Delivery Time: `standard`

**Expected Results:**
- Smallest poster size
- Lightest paper weight
- Base pricing without discounts

### Test 5: Posters - Large Size
**Input:**
- Product Type: `posters`
- Size: `A1`
- Paper Weight: `250 gsm`
- Quantity: `500`
- Delivery Time: `express`

**Expected Results:**
- Significantly higher price due to large size
- Heavy paper adds to cost
- Express delivery premium (25%)
- Volume discount (10%)

### Test 6: Large Format - Single Unit
**Input:**
- Product Type: `large_format`
- Size: `85x200 cm`
- Quantity: `1`
- Delivery Time: `standard`

**Expected Results:**
- High base price for roll-up
- No volume discount (single unit)
- Realistic delivery times for large format items

### Test 7: Large Format - Bulk Order
**Input:**
- Product Type: `large_format`
- Size: `100x200 cm`
- Quantity: `5`
- Delivery Time: `express`

**Expected Results:**
- Larger size increases base price
- No significant quantity discount (small numbers)
- Express delivery adds 25%

### Test 8: Invalid Product Type
**Input:**
```json
{
  "productType": "banners",
  "quantity": 100,
  "deliveryTime": "standard"
}
```

**Expected Result:**
- Status: 400
- Error: "Invalid product type. Must be one of: business_cards, flyers, posters, large_format"

### Test 9: Invalid Quantity for Product
**Input:**
- Product Type: `business_cards`
- Quantity: `150` (not in allowed list: 100, 250, 500)

**Expected Result:**
- Status: 400
- Error: "Invalid quantity for business_cards. Must be one of: 100, 250, 500"

### Test 10: Missing Required Attributes
**Input:**
```json
{
  "productType": "business_cards",
  "quantity": 100,
  "deliveryTime": "standard"
}
```

**Expected Result:**
- Form should not allow submission until all required attributes are selected

## cURL Test Commands

```bash
# Test 1: Business Cards - Basic
curl -X POST http://localhost:3000/api/compare \
  -H "Content-Type: application/json" \
  -d '{
    "productType": "business_cards",
    "orientation": "Horizontal",
    "sides": "1",
    "paperWeight": "250 gsm",
    "finish": "Unlaminated",
    "quantity": 100,
    "deliveryTime": "standard"
  }'

# Test 2: Flyers - Premium
curl -X POST http://localhost:3000/api/compare \
  -H "Content-Type: application/json" \
  -d '{
    "productType": "flyers",
    "size": "A4",
    "sides": "2",
    "paperWeight": "170 gsm",
    "finish": "Laminated",
    "quantity": 1000,
    "deliveryTime": "express"
  }'

# Test 3: Posters
curl -X POST http://localhost:3000/api/compare \
  -H "Content-Type: application/json" \
  -d '{
    "productType": "posters",
    "size": "A2",
    "paperWeight": "170 gsm",
    "quantity": 250,
    "deliveryTime": "standard"
  }'

# Test 4: Large Format
curl -X POST http://localhost:3000/api/compare \
  -H "Content-Type: application/json" \
  -d '{
    "productType": "large_format",
    "size": "100x200 cm",
    "quantity": 2,
    "deliveryTime": "express"
  }'

# Test 5: Invalid product type
curl -X POST http://localhost:3000/api/compare \
  -H "Content-Type: application/json" \
  -d '{
    "productType": "banners",
    "quantity": 100,
    "deliveryTime": "standard"
  }'
```

## Price Calculation Examples

### Business Cards Example
**Configuration:**
- Horizontal, Single-sided, 250gsm, Unlaminated, 100 units, Standard delivery

**Calculation:**
- Base price: €15
- No premium attributes: +€0
- Printer multiplier: varies (0.85 to 1.15)
- Quantity multiplier: 1.0 (≤100)
- Delivery multiplier: 1.0 (standard)
- **Range: ~€12.75 to ~€17.25**

### Flyers Example
**Configuration:**
- A4, Double-sided, 170gsm, Laminated, 1000 units, Express

**Calculation:**
- Base price: €25
- A4 size: +€8
- Double-sided: +€10
- 170gsm: +€8
- Laminated: +€6
- **Subtotal: €57**
- Printer multiplier: varies (0.85 to 1.15)
- Quantity multiplier: 0.85 (>500 units)
- Delivery multiplier: 1.25 (express)
- **Range: ~€51.54 to ~€69.66**

### Large Format Example
**Configuration:**
- 100x200 cm, 2 units, Express

**Calculation:**
- Base price: €80
- 100x200 size: +€15
- **Subtotal: €95**
- Printer multiplier: varies (0.85 to 1.15)
- Quantity multiplier: 1.0 (≤5 units)
- Delivery multiplier: 1.25 (express)
- **Range: ~€100.94 to ~€136.56**

## UI/UX Testing

### Dynamic Form Behavior
1. When selecting "Business Cards", form should show:
   - Orientation dropdown
   - Sides dropdown
   - Paper Weight dropdown
   - Finish dropdown
   - Quantity dropdown (100/250/500)

2. When selecting "Flyers", form should show:
   - Size dropdown (A5/A4/DL)
   - Sides dropdown
   - Paper Weight dropdown
   - Finish dropdown
   - Quantity dropdown (100/250/500/1000)

3. When selecting "Posters", form should show:
   - Size dropdown (A3/A2/A1)
   - Paper Weight dropdown
   - Quantity dropdown (100/250/500)
   - NO finish option

4. When selecting "Large Format", form should show:
   - Size dropdown (85x200/100x200 cm)
   - Quantity dropdown (1/2/5)
   - NO sides, paper weight, or finish options

### Form Validation
- Compare button should be disabled until all required fields are selected
- Changing product type should reset all attribute fields
- All dropdowns should have clear placeholder text

## Expected Printer Rankings

Based on the pricing logic, typical order should be:
1. BudgetPrint (lowest multiplier: 0.85)
2. EconoPress (multiplier: 0.90)
3. QuickPrint Pro (multiplier: 1.00)
4. SpeedyGraphics (multiplier: 1.05)
5. PrintExpress (multiplier: 1.10)
6. PremiumPrint (highest multiplier: 1.15)

Note: Rankings may vary based on delivery speed factors for express orders.
