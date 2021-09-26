import { body } from "express-validator";

export const mediasValidator = [
    body("Title").exists().withMessage("Please type tile").isString().withMessage("Has to be a string"),
    body("Year").exists().withMessage("Please type year").isString().withMessage("Has to be a string"),
    body("Type").exists().withMessage("Please type type").isString().withMessage("Has to be a string"),
    body("Poster").exists().withMessage("Please type url")
]

export const reviewsValidator = [
    body("comment").exists().withMessage("Please type comment").isString().withMessage("Has to be a string"),
    body("rate").exists().withMessage("Please rate").isNumeric().withMessage("Has to be a number"), 
]