SELECT * FROM banking_system.transfers;
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sender VARCHAR(255),
    recipient VARCHAR(255),
    amount DECIMAL(10, 2),
    balance DECIMAL(10, 2),
    status ENUM('success', 'error')
);
