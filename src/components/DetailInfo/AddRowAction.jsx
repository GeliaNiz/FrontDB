import Accordion from 'react-bootstrap/Accordion';
import Multiselect from 'multiselect-react-dropdown';
import { getColumnsInfo, getRowsList } from '../../api_conn';
import { useEffect, useState } from 'react';
import { sendNewRowData } from '../../api_conn';

function AddRowActions(props) {
    const [cols, setCols] = useState([])
    const [data, setData] = useState({})
    const [mtmEnt, setMtmEnt] = useState([])

    function formNewRowData(e, col = null) {
        let data_copy = data
        if (col !== null) {
            data_copy[col] = e.map((x) => x.id)
        } else {

            data_copy[e.target.name] = e.target.value
        }
        setData(data_copy)
        console.log(data_copy)
    }

    function getMtMEntities(table_name) {
        let ents = []
        return getRowsList(table_name, "", {})
            .then((rows) => {
                ents = rows.map(x => Object({ id: Object.values(x)[0], name: Object.values(x)[1] }));
                return ents
            });
        //setMtmEnt(ents)
    }

    useEffect(() => {
        let col_list = []
        getColumnsInfo(props.table).then((c) => {
            setCols(c)
            c.forEach((c) => {
                if (c.many) {
                    getMtMEntities(c.related_to).then((c) => {
                        console.log(c)
                        setMtmEnt(c)
                    })

                }
            })

        })



    }, [props.table])

    return (
        <div>

            <Accordion.Item eventKey="0" className="actionAccordion">

                <Accordion.Header className="AddRow">Add New Row</Accordion.Header>
                <Accordion.Body className="panel">
                    {cols.filter(x => x.many !== true).map((column, i) => (
                        <div key={i} className={"addField"}>
                            <label htmlFor={column["column_name"]} className="ColNameLabel" key={i}>{column["column_name"]}</label>
                            <input name={column["column_name"]} onChange={formNewRowData} className="ColName"></input>
                        </div>
                    )
                    )}

                    {cols.filter(x => x.many === true).map((column, i) => (
                        <div key={i} className="columnsSelect">
                            <label htmlFor="columnSelect">{column.column_name} </label>
                            <Multiselect className="columnSelect" name="columnSelect"
                                options={mtmEnt}
                                onSelect={(t) => formNewRowData(t, column["column_name"])}

                                displayValue="name"
                                disable={props.disabled}
                                placeholder="Select instances"
                                style={{
                                    option: { background: "#252435", color: "white" }
                                }}

                            />
                        </div>
                    )
                    )}
                    <button className="AddRowButton" onClick={() => sendNewRowData(props.table, data)}>Add</button>
                </Accordion.Body>
            </Accordion.Item>
        </div>
    )
}
export default AddRowActions;