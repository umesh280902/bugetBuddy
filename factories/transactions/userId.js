const {faker}=require("@faker-js/faker")
const UserModel=require("../../models/user/user")

const getRandomUserId = async () => {
    const users = await UserModel.find({});
    const mainUserIds = users.map((user) => user._id);
    return faker.helpers.arrayElement(mainUserIds); // Return a random user ID
};

module.exports=getRandomUserId