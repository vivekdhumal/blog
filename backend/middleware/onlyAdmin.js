export const onlyAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({ Message: "You are not allowed to access" });
  }

  next();
};
