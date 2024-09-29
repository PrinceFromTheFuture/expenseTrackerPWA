const signOut = (req, res) => {
    res.cookie("token", "", { expires: new Date(0), httpOnly: true, secure: true }).json({ success: true });
};
export default signOut;
