import RowInfo from "./DetailInfo/RowInfo";
import { useEffect, useState } from "react";
import AccordionCustom from "./DetailInfo/AccordionCustom";

function ResultMode(props) {
    const [selected, setSelected] = useState("info");
    useEffect(() => {

    }, [selected])
    
    return (
        <div className="ResultMode">
           
            <div className={"changePageButtons"}>
                <button style={{ background: (selected === "info" ? "rgba(255,255,255,0.2)" : "transparent") }}
                    className={"pageButton"} onClick={() => setSelected("info")}>Info</button>
                <button style={{ background: (selected === "actions" ? "rgba(255,255,255,0.2)" : "transparent") }}
                    className={"pageButton"} onClick={() => setSelected("actions")}>Actions</button>
            </div>

            {selected === 'info' && <div id="InfoContent">
                <RowInfo rows={props.rows} />
            </div>
            }
            {selected === 'actions' && <div id="ActionsContent">
                <AccordionCustom table={props.table} selectedRows={props.rows} setEditableRow={props.setEditableRow} />
            </div>
            }

        </div>
    )

}
export default ResultMode;