const axios = require("axios");
const router = require("express").Router();
const tokenHandler = require("../middlewares/tokenHandler.js");

// en-ZA
router.get("/all", tokenHandler, async (req, res) => {
  try {
    const response = await axios({
      baseURL: process.env.NEWS_API_ENDPOINT,
      method: "get",
      url: "/news",
      params: {
        apiKey: process.env.NEWS_API_KEY,
        country: "us",
        category: "business",
      },
    });
    res.status(200).json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
