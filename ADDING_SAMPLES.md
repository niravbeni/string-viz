# Adding Sample Images

Quick guide for adding more sample images to the gallery.

## Current Samples

The app currently includes these sample letters:
- **I** - Simple vertical letter (4 pegs, 200 iterations)
- **O** - Circular letter (8 pegs, 300 iterations)
- **D** - Half-circle letter (10 pegs, 400 iterations)
- **E** - Horizontal bars (8 pegs, 350 iterations)

## How to Add More Samples

### 1. Add Image to Public Folder

Place your image in:
```
public/images/your-image.png
```

**Image Requirements:**
- Format: PNG, JPG, or WebP
- Recommended size: 500x500 to 1000x1000 pixels
- High contrast: Black on white or white on black
- Simple shapes work best for string art

### 2. Update Sample Gallery Component

Edit `components/SampleGallery.tsx`:

```typescript
const sampleImages: SampleImage[] = [
  // ... existing samples ...
  {
    path: '/images/your-image.png',
    name: 'Your Image Name',
    description: 'Brief description',
    recommendedPegs: 8,        // Suggested pegs per side
    recommendedIterations: 300  // Suggested iterations
  }
];
```

### 3. That's It!

The new sample will automatically appear in the gallery on the home page.

## Recommendations by Complexity

### Very Simple (4-6 pegs)
- Letters: I, L, T, V, X
- Shapes: Square, Diamond, Triangle
- Iterations: 150-250

### Simple (8-10 pegs)
- Letters: A, E, F, H, K, N, Y, Z
- Shapes: Pentagon, Hexagon, Star
- Iterations: 250-400

### Medium (12-15 pegs)
- Letters: B, D, G, J, O, P, Q, R, S, U
- Shapes: Complex symbols
- Iterations: 400-600

### Complex (20+ pegs)
- Letters: M, W, @, &
- Portraits or detailed images
- Iterations: 800-1500

## Tips for Good Sample Images

### DO:
- ✓ Use high contrast (pure black and white)
- ✓ Bold, clear shapes
- ✓ Center the subject
- ✓ Leave some margin around edges
- ✓ Use simple, geometric forms

### DON'T:
- ✗ Use gradients or mid-tones
- ✗ Include fine details
- ✗ Use low resolution
- ✗ Have busy backgrounds
- ✗ Use thin lines (they won't show up well)

## Example: Adding Letter "A"

1. **Create/save image**: `public/images/a.png`
   - 800x800 pixels
   - Black letter A on white background
   - Bold sans-serif font

2. **Add to gallery** (`components/SampleGallery.tsx`):
```typescript
{
  path: '/images/a.png',
  name: 'Letter A',
  description: 'Triangle with crossbar',
  recommendedPegs: 10,
  recommendedIterations: 350
}
```

3. **Done!** The letter A will appear in the gallery.

## Organizing Multiple Samples

If you add many samples, consider grouping them:

```typescript
const letterSamples = [ /* ... */ ];
const shapeSamples = [ /* ... */ ];
const portraitSamples = [ /* ... */ ];

const sampleImages = [
  ...letterSamples,
  ...shapeSamples,
  ...portraitSamples
];
```

You could also add category tabs to the gallery component if needed.

## Testing New Samples

1. Add the image file
2. Update the component
3. Refresh the app
4. Click the sample to load it
5. Try generating with recommended settings
6. Adjust recommendations if needed

## Image Size in Gallery

The gallery uses Next.js Image component with:
- Responsive sizing
- Lazy loading
- Automatic optimization

Images are displayed as thumbnails but loaded at full quality when selected.

---

**Pro Tip**: Start with the complete alphabet (A-Z) or a set of numbers (0-9) to create a comprehensive sample library for users to test!

