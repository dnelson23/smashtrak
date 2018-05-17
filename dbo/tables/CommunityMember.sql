CREATE TABLE CommunityMember (
	id INT NOT NULL AUTO_INCREMENT,
	user INT NOT NULL,
	community INT NOT NULL,
	role TINYINT NOT NULL,
	status VARCHAR(50) NOT NULL,
	createdAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
	createdBy INT,
	updatedAt DATETIME,
	updatedBy INT,
	deletedAt DATETIME
	PRIMARY KEY (id) 
)