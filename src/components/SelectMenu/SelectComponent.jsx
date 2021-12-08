import { useEffect, useState } from "react";
import Multiselect from 'multiselect-react-dropdown';
import { getColumnsInfo, getTables } from "../../api_conn.js";


function SelectComponent(props) {
    const [tables, setTables] = useState([])
    const [selectedTable, setSelectedTable] = useState("ordertype")
    const [columns, setColumns] = useState([])
    const [selectedCols, setSelectedCols] = useState([])

   

    async function getColumns() {
        getColumnsInfo(selectedTable).then((colInfo) => {
            const columns_names = colInfo.map((t, i) => Object({ name: t.column_name, id: i }))
            setColumns(columns_names);
        })

    }

    useEffect(() => {
        setSelectedCols([])
        getColumns()
    }, [selectedTable])

    useEffect(() => {
        props.setTable(selectedTable)
        props.setColumns(selectedCols)
    }, [selectedCols])

    useEffect(() => {
        getTables().then((tables) => {
            setTables(tables)
        })
    }, [])

    return (
        <div className="selectComponent">
            <div className="tableSelect">
                <label className="selectTableLabel" htmlFor="tableList">Table </label>
                <div className={"tableListWrapper"}>
                    <select onChange={(e) => { setSelectedTable(e.target.value)}}
                        className="tableList" name="tableList">
                        {tables.map((table, i) => <option className="item" value={table} key={i}>{table}</option>)}
                    </select>
                </div>
            </div>

            <div className="columnsSelect">
                <label htmlFor="columnSelect">Fields </label>
                <Multiselect className="columnSelect" name="columnSelect"
                    options={columns}
                    selectedValues={selectedCols}
                    onSelect={(t) => setSelectedCols(t)}
                    onRemove={(t) => selectedCols.splice(selectedCols.indexOf(t), 1)}
                    displayValue="name"
                    disable={props.disabled}
                    placeholder="Select needed fields"
                    style={{
                        option: { background: "#252435", color: "white" }
                    }}

                />
            </div>
            {/* <div className={"filterWrapper"}>
                <label htmlFor="filter">Filter</label>
                <textarea name={"filter"} className={"filter"}  onChange={(e) => props.setParams(e.target.value)} />
            </div> */}
        </div>
    )
}
export default SelectComponent;