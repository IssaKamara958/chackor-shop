# Chackor Shop - Frontend

Welcome to **Chackor Shop**, a modern and responsive online store for **Chackor Organisation**, a community initiative based in Thiès, Senegal. This frontend application, built with **React.js**, offers an optimized user experience for all devices (mobile, tablet, desktop), with full functionality for online sales of **Achakourou Café Touba** products, ordering event services, and integrating local payment methods (Wave, Orange Money, cash payment). The design uses **Tailwind CSS** for a clean and accessible interface, and the agnostic islands architecture ensures optimal performance. An "About" page details the identity and services of Chackor Organisation and its four Achakourou poles.

---

## Table of Contents
1. [Functionalities](#functionalities)
2. [Technologies](#technologies)
3. [Project Structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Usage](#usage)
8. [Deployment](#deployment)
9. [Tests](#tests)
10. [About Chackor Organisation](#about-chackor-organisation)
11. [Contributors](#contributors)
12. [License](#license)

---

## Functionalities

- **Intuitive Navigation**: Navigation bar with logo, links to "Home", "Cart", "Checkout", and "About", with a badge indicating the number of items in the cart.
- **Home Page**:
  - Hero section with a call to action ("Order Now").
  - Responsive grid of Achakourou Café Touba products.
  - Section for ordering event services (Baptism, Magal, etc.) with total price calculation.
  - Modal to display details of a selected product.
- **Product Detail**: Display of product information (name, description, price, image) with option to add to cart.
- **Cart**:
  - List of items with quantity management (increase/decrease) and removal.
  - Calculation of total price, including Senegalese VAT (18%) and transport costs (500 FCFA for Thiès, 7% of base price + base price for other regions).
- **Checkout**:
  - Order form with fields for name, address, phone, email, region, and payment method (Wave, Orange Money, Cash).
  - Field validation (email, numeric phone).
  - Cost summary (price excluding tax, VAT, transport, total including tax).
  - Post-submission notifications via WhatsApp and email.
- **About Page**: Detailed presentation of Chackor Organisation and the four Achakourou poles (Café Touba, Digital Services, Bana Bana, Consulting).
- **Responsiveness**: Interface optimized for mobile, tablet, and desktop.
- **Accessibility**: Compliance with WCAG 2.1 standards (contrasts, keyboard navigation, labels).
- **Performance**: Island architecture with lazy loading of components to minimize initial load time.
- **Notifications**:
  - Order confirmation via WhatsApp (`https://wa.me/221776828441`) and email (`mailto:issakamara958@gmail.com`).
- **Supabase Integration**: Fetching products and submitting orders via the Supabase API.

---

## Technologies

- **React.js** (v18.x): Frontend framework for building the interface.
- **React Router** (v6): Navigation management.
- **Tailwind CSS** (v3.x): Responsive and mobile-first styling.
- **Supabase** (v2): Database integration for products and orders.
- **React Icons**: Icons for navigation and buttons.
- **React Scroll**: Smooth scrolling on the home page.
- **JavaScript (ES6+)**: Component logic and state management.
- **Babel**: Transpilation for browser compatibility.

---

## Project Structure

```
chackor-shop/
├── src/
│   ├── components/
│   │   ├── Navbar.js         # Navigation bar with logo and cart badge
│   │   ├── Footer.js         # Footer with links and social icons
│   │   ├── ProductCard.js    # Product card with image, price, and button
│   │   ├── Cart.js           # Cart component with quantity management
│   ├── pages/
│   │   ├── Home.js           # Home page with hero, products, services
│   │   ├── ProductDetail.js  # Product detail page
│   │   ├── CartPage.js       # Cart page
│   │   ├── CheckoutPage.js   # Checkout page with form
│   │   ├── About.js          # About page
│   ├── context/
│   │   ├── CartContext.js    # Context for managing the cart
│   │   ├── OrderContext.js   # Context for event orders
│   ├── services/
│   │   ├── productService.js # Service for fetching products via Supabase
│   ├── assets/
│   │   ├── ch-logo.jpg       # Chackor Organisation logo
│   │   ├── 1kg.png           # Product images
│   │   ├── 500g.jpg
│   │   ├── ...
│   ├── App.js                # Main component with Router
│   ├── index.js              # React entry point
│   ├── styles.css            # Custom styles for Tailwind
├── public/
│   ├── index.html            # Main HTML file
├── package.json              # Dependencies and scripts
├── README.md                 # Project documentation
```
---

## Prerequisites

- **Node.js** (v16 or higher): To run the application and install dependencies.
- **npm** (v8 or higher): Package manager.
- **Supabase Account**: To configure the database and API.
- **Modern Browser**: Chrome, Firefox, Safari, or Edge to test the application.
- **Internet Connection**: To load CDN dependencies and interact with Supabase.

---

## Installation

1. **Clone the repository**:
```
   git clone https://github.com/votre-utilisateur/chackor-shop.git
   cd chackor-shop
   
```
2. **Install dependencies**:
```
   npm install
   
```
3. **Install specific dependencies**:
```
   npm install react react-dom react-router-dom @supabase/supabase-js react-icons react-scroll
   
```
4. **Configure Tailwind CSS**:
   - Add Tailwind via CDN in `public/index.html` or install locally:
```
     npm install tailwindcss
     npx tailwindcss init
     
```
- Configure `tailwind.config.js`:
```
javascript
     module.exports = {
       content: ['./src/**/*.{js,jsx}'],
       theme: { extend: {} },
       plugins: [],
     };
     
```
- Create `src/styles.css`:
     
```
css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     
```
---

## Configuration

1. **Configure Supabase**:
   - Create a project on [Supabase](https://supabase.com).
   - Get the URL and public key for your project.
   - Add them to `src/services/productService.js`:
```
javascript
     import { createClient } from '@supabase/supabase-js';
     const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_PUBLIC_KEY');
     
```
2. **Configure Products**:
   - Ensure the `products` table in Supabase contains the following data:
```
sql
     INSERT INTO products (name, price, image, description) VALUES
     ('Achakourou Café Touba 1kg', 6500, '/assets/1kg.png', 'Café authentique de Thiès, riche en arômes.'),
     ('Achakourou Café Touba 500g', 3250, '/assets/500g.jpg', 'Café équilibré et parfumé.'),
     ('Achakourou Café Touba 250g', 2300, '/assets/250g.jpg', 'Café intense pour usage quotidien.'),
     ('Achakourou Café Touba 125g', 1150, '/assets/125g.jpg', 'Format pratique pour emporter.'),
     ('Achakourou Café Touba 75g', 650, '/assets/75g.jpg', 'Petite dose pour une dégustation unique.'),
     ('Achakourou Café Touba 250g - Pack de 12', 27600, '/assets/250g_pack.jpg', 'Pack économique de 12 unités.'),
     ('Achakourou Café Touba 125g - Pack de 12', 13800, '/assets/125g_pack.jpg', 'Lot spécial pour amateurs.'),
     ('Achakourou Café Touba 75g - Pack de 12', 7800, '/assets/75g_pack.jpg', '12 petits packs pour consommation régulière.');
     
```
3. **Configure Notifications**:
   - WhatsApp notifications use `https://wa.me/221776828441`.
   - Email notifications use `mailto:issakamara958@gmail.com`.

---

## Usage

1. **Launch the application**:
```
   npm start
   
```
- The application will be available at `http://localhost:3000`.

2. **Navigate the application**:
   - **Home**: Browse products and order event services.
   - **Cart**: View and manage added items.
   - **Checkout**: Fill out the order form and select a payment method.
   - **About**: Learn about Chackor Organisation and Achakourou.

3. **Test Functionalities**:
   - Add products to the cart.
   - Modify quantities or remove items.
   - Submit an order with valid information.
   - Check WhatsApp and email notifications.

---

## Deployment

1. **Recommended Hosting**:
   - **Vercel**: Ideal for React applications.
```
     npm install -g vercel
     vercel
     
```
- **Netlify**: Alternative for simple deployment.
     - Connect the GitHub repository and configure environment variables for Supabase.

2. **Environment Variables**:
   - Create a `.env` file:
```
     REACT_APP_SUPABASE_URL=YOUR_SUPABASE_URL
     REACT_APP_SUPABASE_KEY=YOUR_SUPABASE_PUBLIC_KEY
     
```
3. **Optimization**:
   - Use a CDN for images (e.g., Cloudinary).
   - Enable code-splitting with `React.lazy` to reduce the initial bundle size.

---

## Tests

1. **Unit Tests**:
   - Install Jest and React Testing Library:
```
     npm install --save-dev jest @testing-library/react @testing-library/jest-dom
     
```
- Example test for `ProductCard`:
```
javascript
     import { render, screen } from '@testing-library/react';
     import ProductCard from './components/ProductCard';

     test('renders product name', () => {
       const product = { id: 1, name: 'Café 1kg', price: 6500 };
       render(<ProductCard product={product} />);
       expect(screen.getByText('Café 1kg')).toBeInTheDocument();
     });
     
```
2. **Manual Tests**:
   - Check responsiveness on mobile (iPhone, Android), tablet, and desktop.
   - Test accessibility with Lighthouse (score > 90).
   - Validate forms (errors for invalid email/phone).

---

## About Chackor Organisation

**Chackor Organisation** is a community initiative based in Thiès, Senegal, dedicated to economic empowerment and social innovation. It brings together talents in crafts, agriculture, technology, and consulting to support micro-enterprises and independent entrepreneurs.

### **Achakourou: Digital Extension**
Achakourou covers four poles:
- **Achakourou Café Touba**: Artisanal coffee with homemade roasting, cloves, black pepper, and robusta. Local packaging, interregional distribution.
- **Achakourou Digital Services**: Website creation, front-end development (React, HTML, CSS, JavaScript), UX/UI prototyping, service integration.
- **Achakourou Bana Bana**: Interregional agricultural trade to connect producers and markets, reducing losses.
- **Achakourou Consulting**: Consulting in management, digitalization, strategy, and psychological support.

### **Contact Information**
- **Contact**: Issa Kamara, Front-End Web Developer
- **Phone**: +221 77 682 84 41
- **Email**: [issakamara958@gmail.com](mailto:issakamara958@gmail.com)
- **Portfolio**: https://issa-portfeuil.netlify.app/

### **Vision**
To create an ecosystem rooted in local culture, powered by technology, and oriented towards human and territorial development.

---

## Contributors

- **Issa Kamara**: Front-End Web Developer, principal designer.
- Contribute to the project by submitting pull requests or reporting issues via GitHub.

---

## License

This project is under the **MIT** license. See the `LICENSE` file for more details.