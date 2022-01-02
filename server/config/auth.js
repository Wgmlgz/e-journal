export default function ensureAuthenticated(req, res, next) {
  // console.log(req);
  // console.log(req[user])
  // req.LogIn
  if (req.isAuthenticated())
    return next();
  
  res.status(401).json({ err: "please login to view this resource" });
}

