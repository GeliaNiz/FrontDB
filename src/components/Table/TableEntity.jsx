import { useRef, useEffect, useState } from "react";
import { sendChangedRowData } from '../../api_conn';
function TableEntity(props) {
    const [data, setData] = useState({})
    const [isSelected, setIsSelected] = useState(false);
    const rowRef = useRef(null)

    var isPlainObject = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };

    useEffect(() => {
        var truncatedData = {}
        for (let key in props.entity) {
            if (isPlainObject(props.entity[key])) {
                truncatedData[key] = Object.values(props.entity[key])[0]
                continue
            }
            if(Array.isArray(props.entity[key])){
                truncatedData[key] = "..."
                continue
            }
            truncatedData[key] = props.entity[key]
        }
        console.log(truncatedData)
        setData(truncatedData)
    }, [props.entity])

    const click = () => {
        if (props.editableRow === -1) {
            setIsSelected(!isSelected)
            let act = isSelected ? 'del' : 'add'
            props.updateSelected(props.entity, act)
        }
    }

    const onKeyPress = (e) => {
        if (props.editableRow !== -1) {
            if (e.key === "Enter") {
                e.preventDefault()
                let row = [...rowRef.current.children]
                let values = row.map((e) => e.innerHTML)
                var res = {}
                Object.keys(props.entity).forEach((obj, i) => {
                    res[obj] = values[i]
                })
                sendChangedRowData(props.table, res, res.id)
                props.setEditableRow(-1)
            }
        }
    }

    return (
        <tr className={`tableRow ${isSelected ? 'active' : ''}`} ref={rowRef} onKeyPress={onKeyPress} contentEditable={props.editableRow === data.id}>
            {Object.values(data).map((attr, j) => <td onClick={click} key={j}>{attr}</td>)}
        </tr>

    )
}

export default TableEntity;