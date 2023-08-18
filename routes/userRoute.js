const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUserRole,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

router.get("/logout", logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser);

router
  .route("/admin/user/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole);

router
  .route("/admin/user/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
