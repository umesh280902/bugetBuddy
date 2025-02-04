const getTempUser = (email, tempUsers) => {
    return tempUsers.get(email);
};

module.exports = getTempUser;
