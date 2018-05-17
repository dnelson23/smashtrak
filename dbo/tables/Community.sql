CREATE TABLE Community (
	id INT NOT NULL AUTO_INCREMENT
	name VARCHAR(255) NOT NULL,
	isPrivate BIT NOT NULL DEFAULT 1,
	description VARCHAR(1000)
	createdAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
	createdBy INT,
	updatedAt DATETIME,
	updatedBy INT,
	deletedAt DATETIME,
	PRIMARY KEY (id)
)