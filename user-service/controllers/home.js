module.exports = {
  index: async (req, res, next) => {
    try {
      res.render("home/home");
    } catch (error) {
      next(error);
    }
  },
};
