-- Drop tables if they already exist (for reset)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;

-- Customers table
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Order items table
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Insert dummy customers
INSERT INTO customers (first_name, last_name, email) VALUES
('Alice', 'Smith', 'alice@example.com'),
('Bob', 'Johnson', 'bob@example.com'),
('Charlie', 'Lee', 'charlie@example.com');

-- Insert dummy orders
INSERT INTO orders (customer_id, order_date, status, total) VALUES
(1, '2025-04-10 14:23:00', 'paid', 149.97),
(2, '2025-04-11 09:15:00', 'shipped', 89.99),
(1, '2025-04-12 16:50:00', 'pending', 29.99);

-- Insert dummy order items
INSERT INTO order_items (order_id, product_name, quantity, unit_price) VALUES
(1, 'Wireless Mouse', 1, 49.99),
(1, 'Mechanical Keyboard', 1, 99.98),
(2, 'USB-C Hub', 3, 29.99),
(3, 'Laptop Sleeve', 1, 29.99);