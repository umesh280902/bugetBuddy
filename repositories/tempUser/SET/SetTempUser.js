const setTempUser = (userData, tempUsers) => {
    userData.timestamp = Date.now(); 
    tempUsers.set(userData.email, userData);
};

module.exports = setTempUser;
