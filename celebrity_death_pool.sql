CREATE DATABASE celebrity_death_pool;
USE celebrity_death_pool;

CREATE TABLE player (
	player_id BIGINT AUTO_INCREMENT NOT NULL UNIQUE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email_address VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (player_id)
);

CREATE TABLE entry (
	entry_id BIGINT AUTO_INCREMENT NOT NULL UNIQUE,
    player_id BIGINT NOT NULL,
    is_approved BOOL DEFAULT FALSE,
    is_paid BOOL DEFAULT FALSE,
    PRIMARY KEY (entry_id),
    FOREIGN KEY (player_id) REFERENCES player(player_id)
);

CREATE TABLE celebrity (
	celebrity_id BIGINT AUTO_INCREMENT NOT NULL UNIQUE,
    celebrity_name VARCHAR(255) NOT NULL UNIQUE,
    is_dead BOOL DEFAULT FALSE,
    PRIMARY KEY (celebrity_id)
);

CREATE TABLE entry_selection (
	entry_selection_id BIGINT AUTO_INCREMENT NOT NULL UNIQUE,
    entry_id BIGINT NOT NULL,
    celebrity_id BIGINT NOT NULL,
    is_wildcard BOOL,
    PRIMARY KEY (entry_selection_id),
    FOREIGN KEY (entry_id) REFERENCES entry(entry_id),
    FOREIGN KEY (celebrity_id) REFERENCES celebrity(celebrity_id)
);