const Boom = require("@hapi/boom");

const { signToken } = require("../utils/jwt");
const userService = require("../services/user.service");
const validateZod = require("../validations/validateZod")
const { loginSchema } = require("../validations/auth.validation");

//POST /auth/login
const login = {
  description: "User login and get JWT token",
  tags: ["api", "auth"],
  auth: false,
  validate:{
    payload: validateZod(loginSchema)
  },
  handler: async (request, h) => {
    const { email, password } = request.payload;
    try {
      const userRecord = await userService.getUserByEmail(email);

      if (!userRecord) {
        // return Boom.unauthorized(h, "Invalid credentials");
        return "t1"
      }
  
      const valid = await userService.comparePassword(userRecord, password);
      if (!valid) {
        return Boom.unauthorized("Invalid credentials");
      }
  
      // const token = signToken({ uId: userRecord.uId,role: userRecord.role});
      const token = signToken({ sub: userRecord.id, role: userRecord.role });

      const safeUser = {
        id: userRecord.id,
        firstName: userRecord.firstName,
        lastName: userRecord.lastName,
        email: userRecord.email,
        role: userRecord.role
      };
    //   return success(h, { token, user: safeUser }, "Login successful");
      return h.response({ token, user: safeUser })
    } catch (err) {
      console.error(err);
      return error(h, err.message);
    }
  }
}

module.exports = { login };
