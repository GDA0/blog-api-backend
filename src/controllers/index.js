async function handleIndexGet(req, res) {
  if (req.user) {
    const { firstName, lastName, username } = req.user;
    res.json({ user: { firstName, lastName, username } });
  } else {
    res.json({ user: null });
  }
}

module.exports = {
  handleIndexGet,
};
