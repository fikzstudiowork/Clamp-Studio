"use client";

import { useState, useEffect } from 'react';

// Define viewport bounds for fluid sizing
const minScreen = 320;
const maxScreen = 1240;

/**
 * Generate a CSS clamp value for fluid type scaling.
 *
 * @param {number} minSize Minimum font size in rem units
 * @param {number} maxSize Maximum font size in rem units
 * @returns {string} A CSS clamp() string
 */
function generateClamp(minSize, maxSize) {
  // Slope in vw units: difference in size divided by viewport range, times 100
  const slope = ((maxSize - minSize) / (maxScreen - minScreen)) * 100;
  // Y‑intercept in rem: subtract the contribution of slope at the minimum viewport
  const yIntercept = minSize - (slope * minScreen) / 100;
  return `clamp(${minSize}rem, ${slope.toFixed(4)}vw + ${yIntercept.toFixed(4)}rem, ${maxSize}rem)`;
}

export default function ClampStudio() {
  // Default min and max sizes for headings, body, and small text
  const [minSizes, setMinSizes] = useState({
    h1: 1.25,
    h2: 1.875,
    h3: 1.625,
    h4: 1.5,
    h5: 1.375,
    h6: 1.25,
    body: 1.125,
    small: 0.875,
  });
  const [maxSizes, setMaxSizes] = useState({
    h1: 3.125,
    h2: 2.5,
    h3: 2.25,
    h4: 2.0,
    h5: 1.625,
    h6: 1.25,
    body: 1.125,
    small: 0.875,
  });
  // Color palette state
  const [colors, setColors] = useState({
    heading: '#1c1c1c',
    body: '#333333',
    primary: '#001de7',
    secondary: '#333333',
    tertiary: '#ffa500',
    highlight: '#ff6600',
    gradientStart: '#001de7',
    gradientEnd: '#ff6600',
    background: '#f7f7f7',
    section: '#ffffff',
    lineColor: '#e5e5e5',
  });
  // Generated CSS output
  const [cssOutput, setCssOutput] = useState('');

  // Recompute CSS output whenever sizes or colors change
  useEffect(() => {
    let css = `/* Auto-generated clamp typography and color system */\n:root {\n`;
    Object.keys(minSizes).forEach((key) => {
      const cl = generateClamp(minSizes[key], maxSizes[key]);
      css += `  --${key}-size: ${cl};\n`;
    });
    Object.keys(colors).forEach((col) => {
      css += `  --color-${col}: ${colors[col]};\n`;
    });
    css += `}\n\n`;
    // Provide example usage
    css += `/* Example usage */\n`;
    css += `h1 { font-size: var(--h1-size); color: var(--color-heading); }\n`;
    css += `h2 { font-size: var(--h2-size); color: var(--color-heading); }\n`;
    css += `h3 { font-size: var(--h3-size); color: var(--color-heading); }\n`;
    css += `h4 { font-size: var(--h4-size); color: var(--color-heading); }\n`;
    css += `h5 { font-size: var(--h5-size); color: var(--color-heading); }\n`;
    css += `h6 { font-size: var(--h6-size); color: var(--color-heading); }\n`;
    css += `p { font-size: var(--body-size); color: var(--color-body); }\n`;
    css += `.small-text { font-size: var(--small-size); }\n`;
    setCssOutput(css);
  }, [minSizes, maxSizes, colors]);

  // Handlers to update state values
  const handleMinChange = (key, value) => {
    const num = parseFloat(value) || 0;
    setMinSizes({ ...minSizes, [key]: num });
  };
  const handleMaxChange = (key, value) => {
    const num = parseFloat(value) || 0;
    setMaxSizes({ ...maxSizes, [key]: num });
  };
  const handleColorChange = (key, value) => {
    setColors({ ...colors, [key]: value });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Clamp Typography &amp; Color Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column: Controls */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Typography</h2>
          {Object.keys(minSizes).map((key) => (
            <div key={key} className="mb-2">
              <label className="block capitalize">{key}</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.05"
                  className="border rounded px-2 py-1 w-20"
                  value={minSizes[key]}
                  onChange={(e) => handleMinChange(key, e.target.value)}
                />
                <span>-</span>
                <input
                  type="number"
                  step="0.05"
                  className="border rounded px-2 py-1 w-20"
                  value={maxSizes[key]}
                  onChange={(e) => handleMaxChange(key, e.target.value)}
                />
                <span>rem</span>
              </div>
            </div>
          ))}
          <h2 className="text-xl font-semibold mt-4 mb-2">Colors</h2>
          {Object.keys(colors).map((key) => (
            <div key={key} className="mb-2 flex items-center">
              <label className="w-32 capitalize">{key}</label>
              <input
                type="color"
                className="border rounded w-16 h-8"
                value={colors[key]}
                onChange={(e) => handleColorChange(key, e.target.value)}
              />
              <input
                type="text"
                className="border rounded px-2 py-1 ml-2 flex-1"
                value={colors[key]}
                onChange={(e) => handleColorChange(key, e.target.value)}
              />
            </div>
          ))}
        </div>
        {/* Right column: Preview */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Preview</h2>
          <div
            className="border p-4 rounded space-y-2"
            style={{ backgroundColor: colors.background }}
          >
            <h1 style={{ fontSize: generateClamp(minSizes.h1, maxSizes.h1), color: colors.heading }}>
              Heading 1
            </h1>
            <h2 style={{ fontSize: generateClamp(minSizes.h2, maxSizes.h2), color: colors.heading }}>
              Heading 2
            </h2>
            <h3 style={{ fontSize: generateClamp(minSizes.h3, maxSizes.h3), color: colors.heading }}>
              Heading 3
            </h3>
            <h4 style={{ fontSize: generateClamp(minSizes.h4, maxSizes.h4), color: colors.heading }}>
              Heading 4
            </h4>
            <h5 style={{ fontSize: generateClamp(minSizes.h5, maxSizes.h5), color: colors.heading }}>
              Heading 5
            </h5>
            <h6 style={{ fontSize: generateClamp(minSizes.h6, maxSizes.h6), color: colors.heading }}>
              Heading 6
            </h6>
            <p style={{ fontSize: generateClamp(minSizes.body, maxSizes.body), color: colors.body }}>
              The quick brown fox jumps over the lazy dog.
            </p>
            <p
              className="small-text"
              style={{ fontSize: generateClamp(minSizes.small, maxSizes.small), color: colors.body }}
            >
              Small sample text goes here.
            </p>
            {/* Gradient bar preview */}
            <div
              className="h-10 w-full rounded"
              style={{
                background: `linear-gradient(90deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
              }}
            />
          </div>
        </div>
      </div>
      {/* CSS output */}
      <h2 className="text-xl font-semibold mt-4 mb-2">Generated CSS</h2>
      <textarea
        className="border rounded w-full h-60 p-2 font-mono text-sm"
        value={cssOutput}
        readOnly
      />
    </div>
  );
}