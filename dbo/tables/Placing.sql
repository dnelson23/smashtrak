CREATE TABLE Placing (
	id INT NOT NULL AUTO_INCREMENT,
	place INT NOT NULL,
	tournament INT NOT NULL,
	smasher INT NOT NULL,
	createdBy INT,
	createdAt DATETIME NOT NULL DEFAULT Now(),
	updatedBy INT,
	updatedAt DATETIME,
	deletedBy INT,
	deletedAt DATETIME,
	CONSTRAINT PK_PLACING PRIMARY KEY (id)
)
