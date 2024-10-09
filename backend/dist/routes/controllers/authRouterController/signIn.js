import bcrypt from "bcrypt";
import { db } from "../../../server.js";
import { userTable } from "../../../schema.js";
import signJWTToken from "../../../utils/signJWTToken.js";
import { eq } from "drizzle-orm";
const signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        res.json({ success: false, message: "user email is required for authintication" });
        return;
    }
    if (!password) {
        res.json({ success: false, message: "user password is  required for authintication" });
        return;
    }
    const usersFoundWithProvidedEmail = await db.select().from(userTable).where(eq(userTable.email, email));
    if (usersFoundWithProvidedEmail.length === 0) {
        res.json({ success: false, message: "email does not much any exsisting user" });
        return;
    }
    const userFound = usersFoundWithProvidedEmail[0];
    const isPasswordCorrect = await bcrypt.compare(password, userFound.hashedPassword);
    if (isPasswordCorrect === false) {
        res.json({ success: false, message: "password inncorect" });
        return;
    }
    const token = signJWTToken(userFound);
    res.cookie("token", token, { httpOnly: true, secure: false, maxAge: 100000000 }).json({ success: true, userId: userFound.id });
    return;
};
export default signIn;
