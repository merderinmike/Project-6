// GET /api/sauces response: {array of sauces}
// GET /api/sauces/:id response: {Single sauce}
// POST /api/sauces request body: {sauce: string, image: File} response: {message: string} (Verb) *return response from multer
// PUT /api/sauces/:id request body: {EITHERSauce as JSON OR { sauce:String, image: File }} response: {message: string}
// DELETE /api/sauces/:id request body: {}, response  {message: string}
// POST /api/sauces/:id/like request body: { userId: string, like: number}, response {message: string}
// const Sauces = require("../models/sauces");
