export interface Product {
  id: number;
  namePart1: string;
  namePart2: string;
  price: number;
  primaryColor: string;
  lineColor: string;
  accentColor: string; // For UI elements like price/button
  texturePattern: 'classic' | 'cross' | 'street' | 'tech'; // Defines the physical look of the ball
}