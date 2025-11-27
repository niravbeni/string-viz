# Quick Start Guide

Get up and running with the String Art Generator in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Step 3: Try It Out

### Option A: Use a Test Image

1. Find a portrait photo or download a public domain portrait
2. Good sources:
   - Your own photos
   - [Unsplash](https://unsplash.com) (search "portrait black and white")
   - [Pixabay](https://pixabay.com) (search "face portrait")

### Option B: Create Simple Test Art

For a quick test, try a simple image:
- A letter (A, B, C in large bold font on white background)
- A simple smiley face
- A basic logo or icon

## Step 4: Generate Your First String Art

1. **Upload**: Drag and drop your image or click to upload
2. **Configure**: Use the "Medium" preset for a good balance
3. **Generate**: Click "Generate String Art" and wait 15-30 seconds
4. **Export**: Download the instructions in your preferred format

## Recommended First Settings

**For letters or geometric art:**
```
Pegs Per Side: 10 (40 total pegs)
Iterations: 500
Line Opacity: 25%
```
This gives good results in about 10 seconds.

**For detailed images:**
```
Pegs Per Side: 25 (100 total pegs)
Iterations: 1500
Line Opacity: 20%
```
This gives great results in about 30 seconds.

## What to Expect

### Generation Time

| Quality | Pegs | Iterations | Estimated Time |
|---------|------|------------|----------------|
| Minimal | 4    | 200        | 2-5 sec        |
| Low     | 10   | 500        | 8-12 sec       |
| Medium  | 25   | 1500       | 25-35 sec      |
| High    | 50   | 3000       | 60-90 sec      |

### Visual Results

**Perfect for small peg counts (4-15 pegs)**:
- Letters and numbers
- Geometric shapes
- Simple logos
- Bold symbols

**Good for medium peg counts (20-40 pegs)**:
- Simple faces
- High contrast images
- Bold shapes
- Clear outlines

**Great for large peg counts (50+ pegs)**:
- Complex portraits
- Detailed artwork
- Subtle shading
- Photo-realistic results

## Tips for Best Results

1. **Start Simple**: Begin with high-contrast, simple images
2. **Experiment**: Try different opacity and iteration values
3. **Be Patient**: Higher quality takes longer but looks better
4. **Compare**: Keep the source and result side-by-side to see differences

## Next Steps

- Read [README.md](./README.md) for full documentation
- See [SMALL_PEG_GUIDE.md](./SMALL_PEG_GUIDE.md) for working with 4-20 pegs
- See [TESTING.md](./TESTING.md) for comprehensive testing guide
- Experiment with different images and parameters
- Try recreating the art physically!

## Common Questions

**Q: My result looks too light**
- A: Increase line opacity or add more iterations

**Q: Generation is taking forever**
- A: Reduce iterations or pegs per side

**Q: The result doesn't look like the original**
- A: Try a higher contrast image or increase iterations

**Q: Can I use color images?**
- A: Yes! They're automatically converted to grayscale

**Q: How long should the physical thread be?**
- A: Approximately 1-2 kilometers for 2500-4000 iterations

## Build for Production

When you're ready to deploy:

```bash
npm run build
npm start
```

---

Enjoy creating beautiful string art! 🎨✨

