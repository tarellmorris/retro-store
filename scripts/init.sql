USE retro_store;

DROP TABLE IF EXISTS stock_data_games;
CREATE TABLE stock_data_games
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(255),
    platform   VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image      VARCHAR(30),
    price      DECIMAL(10, 2)
);

INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Sonic The Hedgehog 2', 'SEGA Genesis', 'sonic-2.jpg', 15.75);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Super Mario World', 'Super Nintendo Entertainment System (SNES)', 'smw.jpg', 30.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Chrono Trigger', 'Super Nintendo Entertainment System (SNES)', 'chrono-trigger.jpg', 220.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Final Fantasy III', 'Super Nintendo Entertainment System (SNES)', 'ff-3.jpg', 80.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Bubsy', 'SEGA Genesis', 'bubsy.jpg', 10.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Pokemon Red', 'Nintendo Game Boy', 'poke-red.jpg', 45.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('The Legend of Zelda: A Link to the Past', 'Super Nintendo Entertainment System (SNES)', 'zelda-alttp.jpg',
        35.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Mega Man X', 'Super Nintendo Entertainment System (SNES)', 'mega-man-x.jpg', 60.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Street Fighter II Turbo', 'Super Nintendo Entertainment System (SNES)', 'sf2-turbo.jpg', 25.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Donkey Kong Country', 'Super Nintendo Entertainment System (SNES)', 'dkc.jpg', 28.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Super Metroid', 'Super Nintendo Entertainment System (SNES)', 'super-metroid.jpg', 70.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('EarthBound', 'Super Nintendo Entertainment System (SNES)', 'earthbound.jpg', 325.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Golden Axe', 'SEGA Genesis', 'golden-axe.jpg', 15.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Streets of Rage 2', 'SEGA Genesis', 'sor-2.jpg', 52.50);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Altered Beast', 'SEGA Genesis', 'altered-beast.jpg', 12.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Mortal Kombat', 'SEGA Genesis', 'mk-genesis.jpg', 23.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Super Mario Bros. 3', 'Nintendo Entertainment System (NES)', 'smb3.jpg', 29.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('The Legend of Zelda', 'Nintendo Entertainment System (NES)', 'zelda-nes.jpg', 34.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Contra', 'Nintendo Entertainment System (NES)', 'contra.jpg', 27.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Metroid II: Return of Samus', 'Nintendo Game Boy', 'metroid-ii.jpg', 25.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('The Legend of Zelda: Link''s Awakening', 'Nintendo Game Boy', 'links-awakening.jpg', 40.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Tetris', 'Nintendo Game Boy', 'tetris-gb.jpg', 20.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Castlevania: Symphony of the Night', 'Sony PlayStation', 'sotn.jpg', 90.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Metal Gear Solid', 'Sony PlayStation', 'mgs.jpg', 50.00);
INSERT INTO stock_data_games (name, platform, image, price)
VALUES ('Final Fantasy VII', 'Sony PlayStation', 'ff7.jpg', 30.00);
