const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const employers = await pool.query("SELECT*FROM employer");
    res.status(200).json(employers.rows);
  } catch (error) {
    res.status(500).json({ massage: err.massage });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const employers1 = await pool.query(
      `SELECT*FROM employer LEFT JOIN job ON job.id = employer.job_id WHERE employer.id=$1`,
      [req.params.id]
    );
    res.status(200).json(employers1.rows[0]);
  } catch (error) {
    res.status(500).json({ massage: err.massage });
  }
});
router.post("/add", async (req, res) => {
  try {
    const { name1, job_id } = req.body;
    const newEmployers = await pool.query(
      `
               INSERT INTO employer(name1,job_id) VALUES($1,$2) RETURNING*
            `,
      [name1, job_id]
    );
    res.status(201).json(newEmployers.rows);
  } catch (error) {
    res.status(500).json({ massage: err.massage });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name1, job_id } = req.body;
    const oldemployers = await pool.query("SELECT*FROM employer WHERE id=$1", [
      req.params.id,
    ]);

    const updateEmployers = await pool.query(
      `
           UPDATE employer SET name1=$1,job_id=$2 WHERE id=$3 RETURNING* 
            `,
      [
        name1 ? name1 : oldemployers.rows[0].name1,
        job_id ? job_id : oldemployers.rows[0].job_id,
        id,
      ]
    );
    res.status(201).json(updateEmployers.rows);
  } catch (error) {
    res.status(500).json({ massage: err.massage });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM employer WHERE id=$1", [req.params.id]);
    res.status(200).json({ massage: "Employer deleted" });
  } catch (error) {
    res.status(500).json({ massage: err.massage });
  }
});
module.exports = router;
