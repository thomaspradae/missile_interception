"use client";

import { useEffect } from 'react';
import './globals.css'; // Ensure this path matches the location of your globals.css

export default function Home() {
  useEffect(() => {
    console.log("useEffect ran");

    const container = document.getElementById('animation-container');
    console.log("Container:", container);

    const numItems = 100; // Adjust based on the number of grid items

    // Define a palette of colors
    const colorPalette = [
      '#E8E8E8',
      '#CCCCCC',
      // Add more colors as needed
    ];

    const hoverColor = '#000000'; // Color for hover

    // Create grid items
    for (let i = 0; i < numItems; i++) {
      const item = document.createElement('div');
      item.classList.add('grid-item');
      
      // Add a span for the number inside the grid item
      const numberSpan = document.createElement('span');
      numberSpan.classList.add('number');
      item.appendChild(numberSpan);

      console.log("Creating grid item:", i);
      container.appendChild(item);

      // Add hover event listeners
      item.addEventListener('mouseover', () => {
        const span = item.querySelector('.number');
        if (span) {
          (span as HTMLElement).style.color = hoverColor;
        }
      });

      item.addEventListener('mouseout', () => {
        const span = item.querySelector('.number');
        if (span) {
          setTimeout(() => {
            (span as HTMLElement).style.color = getRandomColor();
          }, 1000); // Change back to random color after 1 second
        }
      });
    }

    // Function to generate a random color from the palette
    function getRandomColor() {
      const randomIndex = Math.floor(Math.random() * colorPalette.length);
      return colorPalette[randomIndex];
    }

    // Function to generate a random decimal number
    function getRandomNumber() {
      return (Math.random() * 2).toFixed(7); // Generates a random decimal number between 0 and 2
    }

    // Function to animate the grid items
    function animateGrid() {
      const items = document.querySelectorAll('.grid-item');
      console.log("Animating grid items:", items);
      items.forEach((item, index) => {
        const span = item.querySelector('.number');
        if (span) {
          let number = getRandomNumber();
          if (index === 0) {
            number = `[${number}`; // Add opening bracket to the first item
          } else if (index === items.length - 1) {
            number = `${number}]`; // Add closing bracket to the last item
          }
          else if (index === items.length - 191) {
            number = `deflectNet`; // Add closing bracket to the last item
          }
          else if (index === items.length - 181) {
            number = `by thomas`; // Add closing bracket to the last item
          }
          // else if (index === items.length - 171) {
          //   number = `thomas`; // Add closing bracket to the last item
          // }
          if (!item.matches(':hover')) { // Only update color if not hovered
            span.textContent = number;
            (span as HTMLElement).style.color = getRandomColor();
          }
        }
      });
    }

    // Update the colors and numbers at intervals
    const interval = setInterval(animateGrid, 500);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="animation-container" className="container"></div>
  );
}
