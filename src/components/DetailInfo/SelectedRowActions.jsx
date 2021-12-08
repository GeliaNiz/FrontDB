

import Accordion from 'react-bootstrap/Accordion';
import { deleteRows } from '../../api_conn';

function SelectedRowActions(props) {

    function deleteSelectedRows() {
        deleteRows(props.selectedRows, props.table);
    }
    return (
        <Accordion.Item eventKey="1" className="actionAccordion">
            <Accordion.Header className="Actions">UPDATE/DELETE</Accordion.Header>
            <Accordion.Body className="panel">
                <button className="rowActionButton" onClick={() => { if (props.selectedRows.length > 0) { props.editableRow(props.selectedRows[0].id) } }} disabled={props.selectedRows.length !== 1}>Change Row</button>
                <button className="rowActionButton" onClick={deleteSelectedRows} disabled={props.selectedRows.length === 0}>Delete Row</button>
            </Accordion.Body>
        </Accordion.Item>
    )
}
export default SelectedRowActions;