const fillLoginForm = async (page, username, password) => {
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.click('button:has-text("Login")');
};

const fillRegistrationForm = async (page, username, password, confirmPassword) => {
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.fill('input[name="confirmPassword"]', confirmPassword);
  await page.click('button:has-text("Register")');
};

module.exports = {
  fillLoginForm,
  fillRegistrationForm
}; 