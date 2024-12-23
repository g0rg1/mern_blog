import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const cookieToken = req.cookies.token;

  const authHeader = req.headers.authorization;
  let token;

  if (authHeader) {
    token = authHeader.split(" ")[1];
  } else if (cookieToken) {
    token = cookieToken;
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = { id: decoded.id };
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
