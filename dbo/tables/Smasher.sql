CREATE TABLE Smasher (
	id INT NOT NULL AUTO_INCREMENT,
	tag VARCHAR(255) NOT NULL,
	createdAt DATETIME NOT NULL DEFAULT,
	createdBy INT,
	updatedAt DATETIME,
	createdBy INT,
	deletedAt DATETIME,
	PRIMARY KEY (id)
)