let base_url = "https://cnc-world-api.herokuapp.com/api/"

function getTables() {
    const requestOptions = {
        method: 'GET'
    }
    return fetch(base_url + "tables/", requestOptions)
        .then(async response => {
            const table_list = await response.json();
            if (response.ok) {

                let table_names = table_list.map((t) => t.table_name)
                return table_names
            }
            else {

                const error = (table_list && table_list.message) || response.status;
                return Promise.reject(error);
            }
        })
}

const getColumnsInfo = (table_name) => {
    const requestOptions = {
        method: 'GET'
    }
    return fetch(base_url + "table_desc/" + table_name, requestOptions)
        .then(async response => {
            const columns_list = await response.json();
            if (!response.ok) {
                const error = (columns_list && columns_list.message) || response.status;
                return Promise.reject(error);
            }
            else {
               
                return columns_list
            }
        }
        )

}

const getRowsList = (table_name, filter, fields) => {
    const requestOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            fields: fields,
            filter: filter
        })
    }
    return fetch(base_url + "select/" + table_name, requestOptions)
        .then(async response => {
            const rows_list = await response.json();
            
            if (!response.ok) {
                const error = (rows_list && rows_list.message) || response.status;
                return Promise.reject(error);
            }
            else {
                return rows_list;
            }
        })
}

const sendNewRowData = (table, data) => {
    const requestOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            data: data
        })

    }
    return fetch(base_url + "insert/" + table, requestOptions)
        .then(async response => {
            const added_row = await response.json();

            if (!response.ok) {
                const error = (added_row && added_row.message) || response.status;
                return Promise.reject(error);
            }
            else {
                return added_row;
            }

        }

        )
}

const deleteRows = (rows, table) => {
    console.log(rows)
    let rows_ids = rows.map((item) => item.id);
    const requestOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({
            ids: rows_ids
        })
    }
    return fetch(base_url + "delete/" + table, requestOptions)
        .then(async response => {
            const deleted_rows = await response.json();

            if (!response.ok) {
                const error = (deleted_rows && deleted_rows.message) || response.status;
                return Promise.reject(error);
            }
            else {
                return deleted_rows;
            }

        })

}

const sendChangedRowData = (table, data, id) => {
    const requestOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
            id: id,
            data: data
        })

    }
    return fetch(base_url + "update/" + table, requestOptions)
        .then(async response => {
            const updated_row = await response.json();

            if (!response.ok) {
                const error = (updated_row && updated_row.message) || response.status;
                return Promise.reject(error);
            }
            else {
                return updated_row;
            }

        }

        )
}

export { getColumnsInfo, getTables, getRowsList, sendNewRowData, deleteRows, sendChangedRowData }