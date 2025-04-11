const BudgetRepository = require("../../repositories/budget/budgetRepository");
const { faker } = require("@faker-js/faker");
const getRandomUserId = require("../transactions/userId");
const generateBudget = require("./generateBudget");

const budgetFactory = async () => {
  const userId = await getRandomUserId();

  // Get current month and year
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth(); // 0-11
  const currentYear = currentDate.getFullYear();

  // Generate a valid past date (not beyond current month/year)
  let validDate;
  do {
    validDate = faker.date.past(10);
  } while (
    validDate.getFullYear() > currentYear ||
    (validDate.getFullYear() === currentYear && validDate.getMonth() > currentMonthIndex)
  );

  const Month = validDate.toLocaleString("default", { month: "long" });
  const Year = validDate.getFullYear().toString();

  // Generate individual categories
  const food = generateBudget(2000, 20000, 2);
  const entertainment = generateBudget(5000, 15000, 2);
  const tourTravel = generateBudget(2000, 20000, 2);
  const fashion = generateBudget(1000, 10000, 2);
  const academics = generateBudget(2000, 20000, 2);

  const totalSubCategories = food + entertainment + tourTravel + fashion + academics;

  // Ensure Budget is greater than sum of subcategories
  const Budget = generateBudget(totalSubCategories + 1000, totalSubCategories + 10000, 2);

  const budget = {
    userId,
    Budget,
    food,
    entertainment,
    "tour/travel": tourTravel,
    fashion,
    academics,
    Month,
    Year,
  };

  console.log("Budget generated is as follows:", budget);

  await BudgetRepository.setBudget(budget);
};

module.exports = budgetFactory;
