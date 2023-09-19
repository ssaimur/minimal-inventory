-- INSERT INTO products (name, description, price, stock)
-- VALUES
--     ('Banana', 'A tasty yellow fruit with a slight bend', '0.60', 200),
--     ('Lamborghini', 'A wildly impractical car', '500000', 4),
--     ('Wooden chair', 'Classic looking yet comfortable', '319.99', 4),
--     ('OLED TV', 'Very impressive contrast ratio', '1260.50', 5);

UPDATE products SET stock = 200 where name = 'Banana';
UPDATE products SET stock = 4 where name = 'Lamborghini';
UPDATE products SET stock = 4 where name = 'Wooden chair';
UPDATE products SET stock = 5 where name = 'OLED TV';
