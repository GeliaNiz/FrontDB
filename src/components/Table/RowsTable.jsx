import { useEffect, useState } from "react";
import TableEntity from "./TableEntity";
function RowsTable(props) {
    const [selected, setSelected] = useState([])

    const updateSelected = (entity, act) => {
        if (act === 'add') {
            setSelected([entity, ...selected])
        } else if (act === 'del') {
            setSelected(selected.filter((e) => {
                return e !== entity
            }))
        }
    }


    useEffect(() => {
        props.enitity_setter(selected)
    }, [selected])

    useEffect(() => {
        setSelected([])
    }, [props.rowsList])

    return (
        <div className="RowsTable">
            <div className={"fetchInfo"}>
                {props.rowsList.length > 0 && <h4 className={"numFetched"}>Fetched {props.rowsList.length} rows</h4>}
                {selected.length > 0 && <h4 className={"numSelected"}>{selected.length} rows selected</h4>}
            </div>
            <table className="SelectedTable">
                {/*Заголовки столбцов(названия столбцов)*/}
                <thead className={"tableHead"}>
                    <tr>
                        {props.rowsList.length > 0 &&
                            Object.keys(props.rowsList[0]).map((col, i) => <th key={i}>{col}</th>)}
                    </tr>
                </thead>
                {/*Строки со значениями*/}
                
                <tbody>
                    {props.rowsList.map((row, i) => <TableEntity table={props.table} updateSelected={updateSelected} key={i} entity={row} 
                    editableRow={props.editableRow} setEditableRow={props.setEditableRow} />)}
                </tbody>
            </table>
        </div>
    )
}

export default RowsTable;