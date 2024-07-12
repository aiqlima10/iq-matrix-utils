import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Matrix = () => {
  const [rows, setRows] = useState([]);
  const [cols, setCols] => useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://api.example.com/matrix')
      .then(response => {
        setRows(response.data.rows);
        setCols(response.data.cols);
        setData(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleCellChange = (row, col, value) => {
    const newData = [...data];
    newData[row][col] = value;
    setData(newData);
  };

  const handleRowChange = (row, value) => {
    const newRowData = [...data];
    newRowData[row] = value;
    setData(newRowData);
  };

  const handleColChange = (col, value) => {
    const newColData = [...data];
    newColData.forEach((row) => {
      row[col] = value;
    });
    setData(newColData);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {cols.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {cols.map((col, index) => (
                <td>
                  <input
                    type="text"
                    value={data[index][index]}
                    onChange={(event) => handleCellChange(index, index, event.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Matrix;
