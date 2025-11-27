# String Art Generator

A web application that transforms images into beautiful string art patterns using a greedy algorithm. Inspired by the work of [Petros Vrellis](https://artof01.com/vrellis/works/knit.html).

![String Art Generator](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## Features

- **Wide Peg Range**: Support for 4-100 pegs per side (16-400 total)
- **Optimized for Small Counts**: Perfect for geometric art and letters with minimal pegs
- **Configurable Parameters**: Adjust pegs per side, iterations, and line opacity
- **Color Inversion**: Toggle to swap black ↔ white for negative images
- **Time Estimates**: Real-time calculation of generation and physical build time
- **Real-time Generation**: Watch the algorithm work with progress tracking
- **Interactive Visualization**: Compare source image with generated string art
- **Export Instructions**: Download peg connection sequences in TXT, JSON, or CSV format
- **Quality Presets**: Quick settings from minimal (4 pegs) to high quality (50+ pegs)
- **Modern UI**: Clean, responsive design built with Tailwind CSS

## How It Works

The generator uses a **greedy algorithm** to create string art:

1. **Image Processing**: Converts uploaded image to grayscale
2. **Peg Placement**: Distributes pegs evenly around a square frame
3. **Greedy Selection**: Starting from a random peg, iteratively finds the best next connection that matches the darkness in the source image
4. **Path Building**: Continues for thousands of iterations, building up the complete picture with a single continuous thread

### Algorithm Details

- Uses **Bresenham's line algorithm** for efficient line pixel calculation
- Implements **line caching** for improved performance
- Employs **darkness tracking** to progressively build the image
- Skips nearby pegs to ensure meaningful visual contribution

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd stitch-wall

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Upload an Image**: Click or drag-and-drop an image (portraits work best)
2. **Adjust Parameters**:
   - **Pegs Per Side**: Number of pegs on each side of the square (4-100)
   - **Iterations**: Number of string connections to generate (50-5000)
   - **Line Opacity**: Darkness of each string line (5-50%)
   - **Invert Colors**: Toggle to swap black/white (for white logos on black backgrounds)
3. **Generate**: Click "Generate String Art" and watch the algorithm work
4. **Export**: Download the peg connection instructions to recreate physically

### Recommended Settings

| Quality | Pegs Per Side | Total Pegs | Iterations | Line Opacity | Best For |
|---------|---------------|------------|------------|--------------|----------|
| Minimal | 4             | 16         | 200        | 30%          | Geometric shapes |
| Low     | 10            | 40         | 500        | 25%          | Letters, symbols |
| Medium  | 25            | 100        | 1500       | 20%          | Detailed designs |
| High    | 50            | 200        | 3000       | 20%          | Complex images |

## Physical Recreation

To recreate the string art physically:

1. Create a square frame with dimensions of your choice
2. Mark peg positions evenly around the perimeter (use the exported instructions for total count)
3. Number each peg position
4. Follow the exported instruction sequence, wrapping string from peg to peg
5. Use a single continuous thread for the entire piece

### Materials Needed

- Square frame (wood or other rigid material)
- Small nails or pegs (16-400 depending on configuration)
- Black thread or string (50m-2km depending on iterations)
- Hammer and ruler for precise peg placement

**For small peg counts (4-20 pegs/side):**
- Thread length: 50-500m
- Frame size: 30-60cm recommended
- Build time: 15-60 minutes

**For large peg counts (50-100 pegs/side):**
- Thread length: 1-2km
- Frame size: 60-100cm recommended
- Build time: 2-4 hours

## Project Structure

```
stitch-wall/
├── app/
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── Canvas.tsx        # Canvas visualization component
│   ├── Controls.tsx      # Parameter controls
│   ├── ImageUpload.tsx   # Image upload interface
│   └── InstructionExport.tsx  # Export functionality
├── lib/
│   ├── stringArt.ts      # Core algorithm
│   ├── imageProcessing.ts     # Image utilities
│   ├── geometry.ts       # Geometric calculations
│   └── useStringArtWorker.ts  # Web Worker hook (optional)
└── workers/
    └── stringArt.worker.ts    # Web Worker implementation
```

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Rendering**: HTML Canvas API
- **Performance**: Async/await with progress tracking

## Performance Considerations

- Algorithm runs asynchronously to prevent UI blocking
- Line calculations are cached for improved performance
- Canvas updates are optimized for smooth rendering
- Web Worker implementation available for heavy computations

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Supported (with reduced performance)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Inspired by [Petros Vrellis](https://artof01.com/vrellis/works/knit.html)
- Algorithm concept based on computational string art techniques
- Built with modern web technologies

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Special Feature: Small Peg Support

The generator is now **optimized for small peg counts** (4-20 pegs per side), perfect for:
- **Typography**: Create individual letters for spelling words
- **Geometric Art**: Bold, modern designs with minimal pegs
- **Rapid Prototyping**: Fast generation (2-15 seconds)
- **Easy Building**: Less complex physical construction

See [SMALL_PEG_GUIDE.md](./SMALL_PEG_GUIDE.md) for detailed guidance on working with minimal peg configurations.

## Future Enhancements

- [ ] Support for circular frames
- [ ] Multiple thread colors
- [ ] Custom frame shapes
- [ ] Real-time preview during generation
- [ ] Save/load project state
- [ ] Gallery of generated artworks
- [ ] Physical build calculator (material estimates)
- [ ] Letter template library

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Made with ❤️ using Next.js and TypeScript
