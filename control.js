const db = require('../db');

// Add Group
exports.addGroup = (req, res) => {
  const { group_name } = req.body;

  if (!group_name) {
    return res.status(400).send("Group name required");
  }

  const query = `INSERT INTO groups (group_name) VALUES (?)`;

  db.run(query, [group_name], function (err) {
    if (err) {
      return res.status(400).send("Duplicate group name");
    }
    res.send("Group added successfully");
  });
};

// Get Groups
exports.getGroups = (req, res) => {
  db.all(`SELECT * FROM groups`, [], (err, rows) => {
    res.json(rows);
  });
};

// Update Group
exports.updateGroup = (req, res) => {
  const { group_name } = req.body;
  const id = req.params.id;

  db.run(
    `UPDATE groups SET group_name = ?, updated_at = CURRENT_TIMESTAMP WHERE group_id = ?`,
    [group_name, id],
    function (err) {
      res.send("Group updated");
    }
  );
};

// Toggle Active/Inactive (Soft Delete)
exports.toggleGroup = (req, res) => {
  const id = req.params.id;

  db.run(
    `UPDATE groups SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP WHERE group_id = ?`,
    [id],
    function (err) {
      res.send("Group status updated");
    }
  );
};