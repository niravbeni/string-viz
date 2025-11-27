# Small Peg Count Guide

Your string art generator now supports **as few as 4 pegs per side** (16 total)! This opens up exciting possibilities for geometric art, letters, and bold designs.

## Why Small Peg Counts?

### Advantages
- ⚡ **Fast Generation**: 2-10 seconds vs. minutes
- 🎯 **Simple to Build**: Fewer pegs = easier physical construction
- 🔤 **Perfect for Letters**: Create alphabet characters for spelling
- 📐 **Geometric Art**: Bold, modern designs
- 💰 **Low Cost**: Less materials needed
- ⏱️ **Quick Prototyping**: Test designs rapidly

### Best Use Cases
1. **Typography**: Individual letters (A-Z, 0-9)
2. **Symbols**: Hearts, stars, arrows, icons
3. **Geometric Shapes**: Triangles, diamonds, abstract art
4. **Simple Logos**: Brand marks and emblems
5. **Educational**: Teaching geometry and algorithms

## Recommended Settings by Peg Count

### Minimal (4 pegs/side = 16 total)
```
Pegs Per Side: 4
Iterations: 150-250
Line Opacity: 30-35%
Generation Time: ~3 seconds
```
**Best For**: Diamonds, squares, basic geometric shapes

### Very Low (6-8 pegs/side = 24-32 total)
```
Pegs Per Side: 6-8
Iterations: 250-400
Line Opacity: 28-32%
Generation Time: ~5 seconds
```
**Best For**: Letters, simple symbols, hexagons

### Low (10-12 pegs/side = 40-48 total)
```
Pegs Per Side: 10-12
Iterations: 400-600
Line Opacity: 25-30%
Generation Time: ~8 seconds
```
**Best For**: Detailed letters, numbers, recognizable shapes

### Small (15-20 pegs/side = 60-80 total)
```
Pegs Per Side: 15-20
Iterations: 600-1000
Line Opacity: 23-28%
Generation Time: ~12 seconds
```
**Best For**: Faces, simple portraits, complex symbols

## Creating Letters with Small Peg Counts

### Step 1: Prepare Your Letter Image

**Image Requirements**:
- **Format**: PNG or JPG
- **Size**: At least 500x500 pixels
- **Background**: Pure white (#FFFFFF)
- **Letter**: Pure black (#000000)
- **Font**: Bold, sans-serif works best
- **Centering**: Letter centered in frame
- **Tip**: If your letter is white on black, use the "Invert Colors" toggle!

**Recommended Fonts**:
- Arial Black
- Impact
- Helvetica Bold
- Futura Bold
- Gotham Bold

### Step 2: Choose Peg Count by Letter Complexity

| Letter Type | Pegs/Side | Examples |
|-------------|-----------|----------|
| Simple      | 4-6       | I, L, T, V, X |
| Medium      | 8-10      | A, E, F, H, K, N, Y, Z |
| Complex     | 12-15     | B, D, G, M, O, P, Q, R, S, W |

### Step 3: Generate

1. Upload your letter image
2. **If your image has white content on black**: Check "Invert Colors" ✓
3. Use the **"Minimal"** or **"Low"** preset
4. Fine-tune iterations if needed
5. Generate!

### Step 4: Test and Adjust

**If result is too light**:
- Increase line opacity (+5-10%)
- Add more iterations (+50-100)

**If result is too messy**:
- Decrease iterations (-50-100)
- Reduce line opacity (-5%)

**If shape is wrong**:
- Increase pegs per side (+2-4)
- Check your source image contrast

## Creating Word Art

To spell words with string art:

### Option 1: Individual Frames
- Create each letter on separate square frame
- 20cm x 20cm frames work well
- Arrange frames to spell words
- Can be rearranged!

### Option 2: Letter Templates
1. Generate string art for each letter A-Z
2. Export instructions for each
3. Build library of letter frames
4. Mix and match to spell anything

## Physical Build Tips for Small Peg Counts

### Frame Size
- **4-6 pegs/side**: 20-30cm frames
- **8-12 pegs/side**: 30-50cm frames
- **15-20 pegs/side**: 50-70cm frames

### Materials
**For 10 pegs/side (40 total) with 500 iterations**:
- Thread length needed: ~50-150 meters
- Nails: 40 small finishing nails
- Frame: 40cm x 40cm board
- Build time: 20-30 minutes

### Peg Spacing Example
For 10 pegs on a 40cm side:
- Spacing: 40cm ÷ 10 = 4cm between pegs
- Easy to measure and mark
- Forgiving if slightly off

## Algorithm Optimization for Small Pegs

The generator automatically optimizes for small peg counts:

**With 4-20 pegs** (16-80 total):
- ✓ Allows closer peg-to-peg connections
- ✓ Minimum distance: ~5% of perimeter
- ✓ More connection options available

**With 21-40 pegs** (84-160 total):
- ✓ Slightly more restrictive
- ✓ Minimum distance: ~8% of perimeter

**With 40+ pegs** (160+ total):
- ✓ Standard restrictions
- ✓ Minimum distance: 10% of perimeter

## Example Projects

### Project 1: Your Name
```
Frames needed: 4-8 (one per letter)
Peg count: 10 pegs/side each
Total time: 2-3 hours to build all
Display: Arrange on shelf or wall
```

### Project 2: Geometric Art Series
```
Create: Triangle, Square, Pentagon, Hexagon, Octagon
Peg counts: 4, 4, 5, 6, 8 pegs/side
Arrange in ascending complexity
```

### Project 3: Icon Set
```
Heart, Star, Arrow, Plus, Check mark
All with 6-8 pegs/side
Uniform frame sizes (30cm)
Gallery wall display
```

## Common Issues and Solutions

### Issue: Lines don't form recognizable shape
**Solution**: 
- Increase peg count by 2-4
- Use higher contrast source image
- Try more iterations

### Issue: Too sparse (not enough lines)
**Solution**:
- Increase iterations
- Increase line opacity
- Check that image is centered

### Issue: Generation produces no result
**Solution**:
- Ensure image has dark content (not just white)
- Try inverting the image colors
- Increase iteration minimum to at least 100

### Issue: Result too busy/messy
**Solution**:
- Reduce iterations
- Lower line opacity
- Increase pegs per side

## Advanced Techniques

### Multi-Letter Compositions
Create connected letters by:
1. Planning peg positions across multiple letters
2. Using one continuous thread
3. Jumping between letters strategically

### Colored Letters
- Use colored thread instead of black
- Multiple threads for multi-color letters
- RGB approach: Red, Green, Blue threads

### 3D Effect
- Layer multiple small peg frames
- Offset slightly for depth
- Create shadow effects

## Performance Notes

| Pegs/Side | Total Pegs | 500 Iterations | 1000 Iterations |
|-----------|------------|----------------|-----------------|
| 4         | 16         | 2-3 sec        | 4-6 sec         |
| 6         | 24         | 3-4 sec        | 6-8 sec         |
| 8         | 32         | 4-5 sec        | 8-10 sec        |
| 10        | 40         | 5-7 sec        | 10-14 sec       |
| 12        | 48         | 6-8 sec        | 12-16 sec       |
| 15        | 60         | 8-10 sec       | 16-20 sec       |

*Times approximate for modern laptop*

## Tips for Success

### DO:
- ✓ Start with "Minimal" preset
- ✓ Use very high contrast images
- ✓ Keep designs simple and bold
- ✓ Test with a single letter first
- ✓ Export and save instructions

### DON'T:
- ✗ Use detailed photos with small peg counts
- ✗ Use low contrast or grayscale images
- ✗ Expect photo-realism with 4-6 pegs
- ✗ Rush physical construction
- ✗ Forget to number your pegs!

## Inspiration Gallery Ideas

Try creating:
- Complete alphabet (26 frames)
- Number set 0-9 (10 frames)
- Zodiac symbols (12 frames)
- Playing card suits (4 frames)
- Mathematical symbols (∑, π, √, ∞)
- Musical notes (♪, ♫, ♯, ♭)
- Weather icons (☀️, ☁️, ⚡, ❄️)
- Emoji set (😊, ❤️, ⭐, 🔥)

## Educational Use

Small peg string art is perfect for:
- **Math classes**: Geometry, algorithms, optimization
- **Art classes**: Modern art techniques
- **Computer science**: Greedy algorithms visualization
- **STEM workshops**: Hands-on coding and building

## Cost Breakdown (10 Letters)

Materials for 10 letters (10 pegs/side, 40cm frames):
- Wood boards (10x): $50-80
- Nails (400 total): $10-15
- Thread (500-1000m): $15-25
- Paint/finish: $10-15
- **Total**: $85-135

Time investment:
- Digital generation: 10 minutes
- Frame prep: 2-3 hours
- Peg installation: 2-3 hours
- String art: 3-4 hours
- **Total**: 8-10 hours for complete set

## Next Steps

1. **Try the Minimal Preset**: Start with 4 pegs and a simple shape
2. **Create a Letter**: Pick your favorite letter and generate it
3. **Build One Physically**: Experience the full process
4. **Share Your Work**: Post your creations!

Happy creating with small peg counts! 🎨✨

---

**Pro Tip**: Small peg count string art makes excellent gifts. Create someone's initials or name for a personalized, handmade present that's also a conversation piece about art, math, and algorithms!

