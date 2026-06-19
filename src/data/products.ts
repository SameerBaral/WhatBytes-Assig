export interface Product {
  id: string;
  title: string;
  price: number;
  category: 'Electronics' | 'Clothing' | 'Home';
  description: string;
  rating: number;
  image: string;
  isLarge?: boolean; // Smartphone spans 2 columns
}

export const products: Product[] = [
  {
    id: "running-shoes",
    title: "Running Shoes",
    price: 99,
    category: "Clothing",
    description: "Lightweight and breathable running shoes designed for maximum comfort and speed. Featuring responsive cushioning and a durable grip outsole.",
    rating: 4.5,
    image: "/images/running_shoes.png"
  },
  {
    id: "wireless-headphones",
    title: "Wireless Headphones",
    price: 99,
    category: "Electronics",
    description: "Premium wireless over-ear headphones with active noise cancellation, high-fidelity sound quality, and up to 40 hours of battery life.",
    rating: 4.8,
    image: "/images/wireless_headphones.png"
  },
  {
    id: "backpack",
    title: "Backpack",
    price: 129,
    category: "Clothing",
    description: "Sleek and durable everyday backpack with a dedicated laptop compartment, multiple organizer pockets, and water-resistant fabric.",
    rating: 4.2,
    image: "/images/backpack.png"
  },
  {
    id: "smartwatch",
    title: "Smartwatch",
    price: 249,
    category: "Electronics",
    description: "Advanced smartwatch featuring fitness tracking, heart rate monitoring, built-in GPS, sleep analysis, and smart notifications.",
    rating: 4.6,
    image: "/images/smartwatch.png"
  },
  {
    id: "sunglasses",
    title: "Sunglasses",
    price: 149,
    category: "Clothing",
    description: "Classic design sunglasses with polarized lenses, full UV protection, and a lightweight, durable acetate frame.",
    rating: 4.3,
    image: "/images/sunglasses.png"
  },
  {
    id: "digital-camera",
    title: "Digital Camera",
    price: 499,
    category: "Electronics",
    description: "Compact digital camera featuring a 24.2MP sensor, 4K video recording, high-speed autofocus, and built-in Wi-Fi connectivity.",
    rating: 4.7,
    image: "/images/digital_camera.png"
  },
  {
    id: "t-shirt",
    title: "T-shirt",
    price: 29,
    category: "Clothing",
    description: "Premium cotton crewneck t-shirt. Soft, breathable, and pre-shrunk for the perfect everyday casual fit.",
    rating: 4.1,
    image: "/images/tshirt.png"
  },
  {
    id: "smartphone",
    title: "Smartphone",
    price: 699,
    category: "Electronics",
    description: "Lorem ipsum dolor sit amet, conssectetur euisagend. Experience next-generation performance, brilliant OLED display, and a pro-grade triple camera system.",
    rating: 4.9,
    image: "/images/smartphone.png",
    isLarge: true // Mockup shows smartphone spanning 2 columns
  }
];
