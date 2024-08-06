const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const database = require("../models/database");

const handleSignUpPost = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .escape(),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .escape(),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters long")
    .matches(/^[a-zA-Z0-9_.]+$/)
    .withMessage(
      "Username can only contain letters, numbers, underscores, or periods"
    )
    .escape(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 64 })
    .withMessage("Password must be between 8 and 64 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const { firstName, lastName, username, password } = req.body;

    try {
      const usernameExists = await database.checkUsernameExists(username);

      if (usernameExists) {
        return res.json({
          errors: [{ msg: "Username is already taken" }],
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await database.createUser(
        firstName,
        lastName,
        username,
        hashedPassword
      );

      req.login(user, (error) => {
        if (error) {
          console.error("Error during auto login:", error);
          return res.json({
            errors: [
              {
                msg: "Sign-up successful, but an error occurred during auto login. Please log in manually.",
              },
            ],
          });
        }
        res.json({
          msg: "Sign up was successful. Logging you in...",
        });
      });
    } catch (error) {
      console.error("Error during user sign up:", error);
      return res.json({
        errors: [
          { msg: "An error occurred during sign up. Please try again later." },
        ],
      });
    }
  },
];

module.exports = {
  handleSignUpPost,
};
