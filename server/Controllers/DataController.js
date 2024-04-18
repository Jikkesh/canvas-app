import pool from "../db.js"


export const addData = async (req, res) => {

  const { name, svgData } = req.body;
  console.log("add body", name);

  try {
    await pool.query(
      'INSERT INTO svgTable (svg_name, svg_data) VALUES ($1, $2)',
      [name, svgData]
    );
    const data = { message: 'Data Added Successfully' };
    res.status(200).json(data);

  } catch (err) {

    console.error('Error adding data:', err);
    const data = { message: 'Error adding data' };
    res.status(500).json(data);
  }


}

export const getData = async (req, res) => {

  const name = req.query.name;
  console.log(name)

  try {
    const result = await pool.query('SELECT * FROM svgTable WHERE svg_name = $1', [name]);
    const data = { message: 'Found Data Success', payload: result.rows };
    if (result.rowCount !== 0) {
      res.status(200).json(data);
    }
    else {
      const data = { message: 'No Data Found', payload: null };
      res.status(404).json(data)
    }


  } catch (err) {
    console.error('Error getting data', err);
    const data = { message: 'Error getting data' };
    res.status(500).json(data);
  }


}


export const getAllData = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM svgTable');
    const data = { message: 'Data Added Successfully', payload: result.rows };
    res.status(200).json(data);

  } catch (err) {
    console.error('Error getting datas', err);
    const data = { message: 'Error getting datas' };
    res.status(500).json(data);
  }
}