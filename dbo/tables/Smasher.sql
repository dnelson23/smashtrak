CREATE TABLE Smasher (
	id INT NOT NULL AUTO_INCREMENT,
	tag VARCHAR(255) NOT NULL,
	community INT NOT NULL,
	createdBy INT,
	createdAt DATETIME NOT NULL DEFAULT NOW(),
	updatedBy INT,
	updatedAt DATETIME,
	deletedBy INT,
	deletedAt DATETIME,
	CONSTRAINT PK_SMASHER PRIMARY KEY (id)
)