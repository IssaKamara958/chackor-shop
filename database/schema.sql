-- =================================================================
-- Schéma de base de données pour Chackor Shop
-- Base de données : chackor_shop_db
-- =================================================================

-- -----------------------------------------------------------------
-- Table `products`
-- Contient tous les produits disponibles dans la boutique.
-- -----------------------------------------------------------------
CREATE TABLE `products` (
  `id` VARCHAR(255) NOT NULL PRIMARY KEY,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` DECIMAL(10, 2) NOT NULL,
  `category` VARCHAR(100),
  `image_url` VARCHAR(255),
  `stock_quantity` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insérer les produits existants
INSERT INTO `products` (`id`, `slug`, `name`, `description`, `price`, `category`, `image_url`, `stock_quantity`) VALUES
('cafe-1kg', 'cafe-touba-1kg', 'L''Authentique Café Touba - 1kg', 'Un kilogramme de notre café Touba artisanal, pour les vrais amateurs.', 6500.00, 'Café Touba', '/images/products/1kg.png', 100),
('cafe-500g', 'cafe-touba-500g', 'Le Traditionnel Café Touba - 500g', 'Un demi-kilo de pur plaisir, parfait pour une consommation régulière.', 3250.00, 'Café Touba', '/images/products/500g.jpg', 100),
('cafe-250g', 'cafe-touba-250g', 'Sachet Saveur Touba - 250g', 'Le format idéal pour découvrir notre café ou pour un cadeau.', 2300.00, 'Café Touba', '/images/products/250g.png', 100),
('cafe-125g', 'cafe-touba-125g', 'Format Découverte Touba - 125g', 'Une petite quantité pour une dégustation ou pour vos voyages.', 1150.00, 'Café Touba', '/images/products/125g.jpg', 100);

-- -----------------------------------------------------------------
-- Table `users` (Optionnel mais recommandé pour le futur)
-- Stocke les informations des clients qui créent un compte.
-- -----------------------------------------------------------------
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------
-- Table `orders`
-- Enregistre chaque commande passée sur le site.
-- -----------------------------------------------------------------
CREATE TABLE `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT, -- Clé étrangère vers `users`, peut être NULL pour les invités
  `customer_name` VARCHAR(255) NOT NULL,
  `customer_address` TEXT NOT NULL,
  `customer_phone` VARCHAR(20) NOT NULL,
  `customer_region` VARCHAR(100) NOT NULL,
  `subtotal` DECIMAL(10, 2) NOT NULL,
  `shipping_cost` DECIMAL(10, 2) NOT NULL,
  `total_amount` DECIMAL(10, 2) NOT NULL,
  `payment_method` VARCHAR(50) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'pending', -- ex: pending, paid, shipped, delivered, canceled
  `whatsapp_message` TEXT, -- Stocke le message généré pour WhatsApp
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

-- -----------------------------------------------------------------
-- Table `order_items`
-- Table de liaison pour savoir quels produits sont dans quelle commande.
-- -----------------------------------------------------------------
CREATE TABLE `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` VARCHAR(255) NOT NULL,
  `quantity` INT NOT NULL,
  `price_per_unit` DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
);

-- =================================================================
-- Autres fonctionnalités MySQL utiles :
--
-- 1. Index :
--    Pensez à ajouter des index sur les colonnes fréquemment utilisées dans les
--    clauses WHERE (ex: `slug` dans `products`, `email` dans `users`) pour
--    accélérer les recherches. Les clés primaires et uniques sont déjà indexées.
--
-- 2. Clés étrangères (FOREIGN KEY) :
--    J'ai déjà défini les liens entre les tables (ex: `order_items` est lié à
--    `orders` et `products`). Cela garantit l'intégrité des données : on ne peut
--    pas avoir un article de commande qui ne correspond à aucune commande.
--
-- 3. Transactions :
--    Lorsque vous créerez une commande, il faudra insérer des données dans `orders`
--    ET dans `order_items`. En utilisant une transaction, vous vous assurez que
--    soit toutes les insertions réussissent, soit aucune n'est appliquée en cas
--    d'erreur. C'est crucial pour éviter les données corrompues.
--
-- =================================================================
