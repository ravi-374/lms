
ALTER TABLE members ADD COLUMN email_verified_at DATETIME NULL;


UPDATE users SET email_verified_at = CURRENT_TIMESTAMP();


UPDATE members SET email_verified_at = CURRENT_TIMESTAMP();

