"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './globals.css'; // Ensure this path matches the location of your globals.css

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log("useEffect ran");

    const container = document.getElementById('animation-container');
    console.log("Container:", container);

    if (!container) {
      console.error("Container not found!");
      return;
    }

    const numItems = 110; // Adjust based on the number of grid items

    // Define a palette of colors
    const colorPalette = [
      '#1C1C1C',
      '#303131',
      '#061D61',
      '#2D4793',
      // Add more colors as needed
    ];

    const hoverColor = '#FFFFFF'; // Color for hover

    // Clear any existing items
    container.innerHTML = '';

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
          if (span.textContent === '[ START ]') {
            (span as HTMLElement).style.textDecoration = 'underline';
            (span as HTMLElement).style.color = hoverColor;
            item.style.cursor = 'pointer';
          } else if (span.textContent !== 'defenseNet') {
            (span as HTMLElement).style.color = hoverColor;
          }
        }
      });

      item.addEventListener('mouseout', () => {
        const span = item.querySelector('.number');
        if (span) {
          if (span.textContent === '[ START ]') {
            setTimeout(() => {
              (span as HTMLElement).style.textDecoration = 'none';
              (span as HTMLElement).style.color = '#ffffff'; // Change back to white after 1 second
              item.style.cursor = 'default';
            }, 10000);
          } else if (span.textContent !== 'defenseNet') {
            setTimeout(() => {
              (span as HTMLElement).style.color = getRandomColor();
            }, 1000); // Change back to random color after 1 second
          }
        }
      });

      // Add click event listener for [ START ]
      item.addEventListener('click', () => {
        const span = item.querySelector('.number');
        if (span && span.textContent === '[ START ]') {
          router.push('/blank-page'); // Navigate to the blank page
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
          } else if (index === 54) {
            number = `defenseNet`; // Add text to the specified item
            (span as HTMLElement).style.color = '#FFFFFF'; // Ensure text color is white
          } else if (index === 55) {
            number = `[ START ]`; // Add text to the specified item
            (span as HTMLElement).style.color = '#FFFFFF'; // Ensure text color is white
          }
          if (!item.matches(':hover') && span.textContent !== 'defenseNet' && span.textContent !== '[ START ]') { // Only update color if not hovered
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
  }, [router]);

  return (
    <div id="animation-container" className="container"></div>
  );
}
