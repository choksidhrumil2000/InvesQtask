# InvesQ Store

A responsive e-commerce product listing application built with React, TypeScript, Material UI, and the DummyJSON Products API.

The application allows users to browse products, search and filter products, sort by price, and manage their shopping cart with quantity controls and persistent cart data.

---

## Features

- Responsive product grid for desktop and mobile
- Product listing using DummyJSON API
- Product search with debounce
- Category filtering
- Price sorting:
  - Featured
  - Price: Low to High
  - Price: High to Low
- Add products to cart
- Increase/decrease product quantity
- Remove products from cart
- Cart item counter
- Cart drawer
- Subtotal calculation
- Cart persistence using localStorage
- Loading state while fetching products
- Error handling for API requests
- Empty state when no products match the search/filter
- Responsive Material UI components
- TypeScript for type safety

---

## Tech Stack

- React
- TypeScript
- Vite
- Material UI (MUI)
- Notistack
- DummyJSON API
- CSS
- LocalStorage

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

You can verify your installation using:

```bash
node -v
npm -v

Installation
1. Clone the repository
git clone https://github.com/choksidhrumil2000/InvesQtask.git
2. Navigate to the project
cd my-app
3. Install dependencies
npm install
4. Start the development server
npm run dev

The application will be available at the local URL provided by Vite, usually:

http://localhost:5173
Build for Production

To create a production build:

npm run build

To preview the production build locally:

npm run preview
API

This project uses the DummyJSON Products API.

Get Products
https://dummyjson.com/products?limit=20
Search Products
https://dummyjson.com/products/search?q={query}
Get Categories
https://dummyjson.com/products/categories
Get Products by Category
https://dummyjson.com/products/category/{category_name}

The application currently fetches products and performs the required filtering/sorting functionality on the client side.

Project Structure
src/
│
├── Components/
│   ├── Header/
│   │   └── Header.tsx
│   │
│   ├── ProductGrid/
│   │   └── ProductGrid.tsx
│   │
│   ├── ProductCard/
│   │   └── ProductCard.tsx
│   │
│   └── CartDrawer/
│       └── CartDrawer.tsx
│
├── Hooks/
│   └── useDebounce.ts
│
├── Pages/
│   └── HomePage/
│       └── HomePage.tsx
│
├── Types/
│   ├── Product.ts
│   └── Cart.ts
│
├── services/
│   └── ProductService.ts
│
├── App.tsx
├── main.tsx
└── index.css
Libraries / Packages Used
React

React is used as the primary frontend library for building the application's component-based UI.

Why?
Component-based architecture
Reusable UI components
Efficient state management
Well suited for interactive applications such as e-commerce stores
TypeScript

TypeScript is used throughout the project for static typing.

Why?
Provides type safety
Helps prevent common runtime errors
Makes API response structures easier to manage
Improves maintainability and code readability

For example, product and cart data are represented using TypeScript interfaces.

Vite

Vite is used as the development and build tool.

Why?
Fast development server
Fast Hot Module Replacement (HMR)
Simple React + TypeScript setup
Efficient production builds
Material UI

Material UI is used for the application's UI components and responsive layout.

Examples include:

TextField
Drawer
Button
Chip
Select
MenuItem
Container
Stack
Typography
Grid
Why?
Provides ready-to-use accessible components
Supports responsive design
Reduces the amount of custom CSS required
Provides a consistent design system
Notistack

Notistack is used for displaying notification/snackbar messages.

For example:

Product added to cart
Product removed from cart
Other user feedback messages
Why?

It provides a simple and reusable notification system that integrates well with Material UI.

DummyJSON

DummyJSON is used as the product data source.

Why?
Provides realistic product data
No backend setup is required
Supports product search and category APIs
Suitable for frontend development and demonstration purposes
LocalStorage

Browser localStorage is used to persist cart data.

Why?

This allows the user's cart to remain available even after:

Page refresh
Closing and reopening the browser tab

No backend/database is required for cart persistence in this assignment.

Assumptions

The following assumptions were made while developing the application:

The DummyJSON API is available and accessible from the user's browser.
Product information is treated as read-only because this is a frontend assignment.
Cart data is stored locally in the browser rather than on a server.
No user authentication is required.
Prices are displayed using the product price provided by the API.
The cart is maintained per browser/device using localStorage.
Product filtering and sorting are handled on the client side for the currently loaded products.
The application is designed primarily as a frontend demonstration and does not process real payments or orders.
Future Improvements

Given more time, I would add the following improvements:

1. Server-side Search

Instead of filtering only the currently loaded products, search could use the DummyJSON search endpoint:

/products/search?q={query}

This would allow searching across the complete product dataset.

2. Server-side Category Filtering

Category selection could use:

/products/category/{category_name}

instead of filtering the currently loaded products.

3. Pagination

Pagination or infinite scrolling could be added to improve performance when working with a larger number of products.

4. Product Details Page

A dedicated product details page could provide:

Product images
Description
Price
Rating
Stock information
Brand
Reviews
5. Checkout Flow

A complete checkout flow could be added with:

Customer information
Shipping address
Order summary
Payment integration
Order confirmation
6. Authentication

User authentication could be added so that users can maintain their cart and orders across different devices.

7. Backend Integration

A backend could be introduced for:

User management
Cart management
Orders
Product management
Payment processing
8. Automated Testing

Unit and integration tests could be added using tools such as:

Vitest
React Testing Library

This would improve reliability and make future changes safer.

9. Improved Error and Loading States

More detailed loading skeletons and user-friendly error recovery could be implemented.

Development Notes

Debounced search is implemented to avoid unnecessary filtering/API operations while the user is typing.

The application follows a component-based structure to keep UI, API services, types, and reusable logic separated.