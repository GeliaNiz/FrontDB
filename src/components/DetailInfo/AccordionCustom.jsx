
import AddRowActions from "./AddRowAction";
import SelectedRowActions from "./SelectedRowActions";
import Accordion from 'react-bootstrap/Accordion';


function AccordionCustom(props) {
    return (
        <Accordion className="Accordion" flush>
            <SelectedRowActions selectedRows = {props.selectedRows} table={props.table} editableRow={props.setEditableRow}/>
            <AddRowActions table = {props.table} />
        </Accordion>

    )
}

export default AccordionCustom;