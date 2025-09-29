# PSR_2025_Data_Display

## Description

This is the 2025 repository for displaying racing data for Purdue Solar Racing. A modern React web application that displays car data under different tabs including speed, acceleration, fuel level, engine status, and temperature monitoring.

## Features

- **Tab Navigation**: Switch between different car data categories
- **Real-time Data Display**: Shows current, maximum, and average values
- **Visual Charts**: Mini charts showing historical data trends
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful glassmorphism design with smooth animations

## Data Categories

1. **Car Speed** - Current speed, max speed, average speed, and speed history
2. **Car Acceleration** - Current acceleration, max acceleration, average acceleration, and acceleration history
3. **Fuel Level** - Fuel percentage, range estimation, and fuel consumption history
4. **Engine Status** - RPM, temperature, oil pressure, and service information
5. **Temperature** - Engine temperature, coolant temperature, ambient temperature, and temperature history

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will open in your browser at `http://localhost:3000`

### Building for Production

Create a production build:

```bash
npm run build
```

## Project Structure

```
PSR_2025_Data_Display/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CarData.js
│   │   └── CarData.css
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
├── webpack.config.js
└── README.md
```

## Technologies Used

- React 18
- Webpack 5
- Babel
- CSS3 with modern features (Grid, Flexbox, Backdrop-filter)
- Responsive design principles

## Customization

The application uses sample data that can be easily replaced with real data sources. To modify the data:

1. Edit the `carData` object in `src/components/CarData.js`
2. Update the data structure as needed
3. Modify the rendering functions to display new data fields

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Usage

- Used to visualize car data in a very intuitive and straight-forward way.

## Todo

- Figure out how to use React to create some interface to view the data.
- Make up a framework with test data that is reasonable to the data we would receive from our car.
- Learn and Apply Inter Process Communication as best as possible.

## License

MIT License
