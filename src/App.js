import './App.css';
import { useState } from 'react';
import Select from './components/SelectMenu/Select';
import "bootstrap/dist/css/bootstrap.min.css";
import RowsTable from './components/Table/RowsTable';
import ResultMode from './components/ResultMode';



function App() {
  const [entities, setEntities] = useState([]);
  const [selectedCols, setSelectedCols] = useState([]);
  const [selectedEntities, setSelectedEntities] = useState([]);
  const [selectedTable, setSelectedTable] = useState([]);
  const [editableRow, setEditableRow] = useState(-1);
  return (

    <div className="App">

      <div className={"selectBox"}>
        <Select setter={setEntities} columns_setter={setSelectedCols} table_setter={setSelectedTable} />
      </div>

      <div className={"resultBox"}>
        <RowsTable table={selectedTable} rowsList={entities} columns={selectedCols} enitity_setter={setSelectedEntities} editableRow={editableRow} setEditableRow={setEditableRow} />
      </div>
      <div className={"inputBox"}>
        <ResultMode table = {selectedTable} rows={selectedEntities} setEditableRow={setEditableRow}/>
      </div>

    </div>

  );
}

export default App;
