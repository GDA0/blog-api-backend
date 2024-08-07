async function handleIndexGet(req, res) {
  if (req.user) {
    const { firstName, username } = req.user;
    res.json({ user: { firstName, username } });
  } else {
    res.json({ user: null });
  }
}

module.exports = {
  handleIndexGet,
};
