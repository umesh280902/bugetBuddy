const deleteTempUser = (email, tempUsers) => {
    tempUsers.delete(email);
};

module.exports = deleteTempUser;
