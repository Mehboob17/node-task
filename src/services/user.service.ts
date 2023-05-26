import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user";
import { accessToken } from "../app/config";
import { emailRegex } from "../app/constants/constants";
const { secretKey, systemUserAccessTokenExpiry } = accessToken;



//update password was not implemented due to limited time
//create anew service check current passowrd and then encrypt new passowrd and then update it  

export async function getSingleUser(id) {
  return await userModel.find({ _id: id }, { password: 0 });
}
export async function deleteUser(id) {
  return await userModel.remove({ _id: id });
}
export async function getAllUsers() {
  return await userModel
    .find({}, { password: 0 })
    .sort({ createdAt: -1 });
}

export async function registerSystemUser(userObject) {
  let { email, password, username } = userObject;

  if (!email || !password || !username)
    throw new Error("Not all fields have been entered");
  if (!emailRegex.test(email))
    throw new Error("You have entered an invalid email address");
  if (password.length < 6)
    throw new Error("The password needs to be at least 6 characters long");

  const existingUser = await userModel.findOne({
    email,
    isEnable: true,
  });

  if (existingUser)
    throw new Error("An account with this email already exists");

  if (!username) username = email;

  const salt = await bcrypt.genSalt();
  userObject.password = await bcrypt.hash(password, salt);
  await new userModel(userObject).save();
  return;
}

export async function updateSystemUser(userId, userObject) {
  let { email } = userObject;
  const user = await userModel.findOne({
    _id: userId,
  });

  if (!user) throw new Error("no user exist with given id");
  if (!user.isActive) throw new Error("user is blocked contact admin");

  if (email) {
    if (!emailRegex.test(email))
      throw new Error("You have entered an invalid email address");
    const emailExists = await userModel.exists({
      email,
      _id: { $ne: userId },
    });
    if (emailExists) throw new Error("email already exist");
  }
  //Not implementing update passowrd due to limited time
  delete userObject["password"];
  const updated = await userModel.findByIdAndUpdate(userId, userObject, {
    new: true,
  });
  updated.password = undefined;
  return updated;
}

export async function loginSystemUser(email, password) {
  if (!email || !password) throw new Error("Not all fields have been entered");

  const user = await userModel.findOne({ email });
  if (!user) throw new Error("No account with this email has been registered");
  if (!user.isActive) throw new Error("Account disabled , contact admin");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = jwt.sign(
    { id: user._id, timestamp: new Date().toISOString(), role: user.role },
    secretKey,
    {
      expiresIn: systemUserAccessTokenExpiry,
    }
  );
  const userData = (({ _id, username, email }) => ({
    _id,
    username,
    email,
  }))(user);
  userModel.findByIdAndUpdate(user._id, {
    lastToken: accessToken,
  });
  return { accessToken, userData };
}
