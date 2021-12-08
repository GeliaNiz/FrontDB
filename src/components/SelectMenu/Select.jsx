
import SelectComponent from './SelectComponent';
import { useState } from 'react';
import { getRowsList } from '../../api_conn';

function Select(props) {

    const [table, setTable] = useState();
    const [columns, setColumns] = useState();
    const [params, setParams] = useState();

    function execute() {
        let column_names = columns.map((t) => t.name)
        getRowsList(table, params, column_names)
            .then((rows) => props.setter(rows));

        props.columns_setter(columns);   
        props.table_setter(table)
    }
    return (
        <div className={"select"}>
            <SelectComponent disabled={false} setTable={setTable} setColumns={setColumns} setParams={setParams} />

            <div className="execute">
                <button className={"selectButton"} onClick={execute}>Select</button>
            </div>
        </div>
    )

}

export default Select;
