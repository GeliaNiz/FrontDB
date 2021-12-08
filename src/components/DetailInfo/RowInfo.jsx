import { React, useEffect, useState } from "react";
function RowInfo(props) {
    const [info, setInfo] = useState("")

    const prettifyJson = (json)=>{
        return JSON.stringify(json, undefined, 2);
    }
    useEffect(()=>{
        if (!props.rows){
            setInfo("")
            return
        }
        setInfo(prettifyJson(props.rows))
    },[props.rows])

    return (
        <div className="RowInfo">
            <label className="InfoLabel" htmlFor="Info">Info</label>
            <textarea value={info} rows={info.split("\n").length} disabled={true} type="text" className="Info">
                asdas
            </textarea>

        </div>
    )
}

export default RowInfo;