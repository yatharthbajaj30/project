import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { forwardRef } from 'react';
import { TextField, Select, MenuItem } from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Data = () => {
    const defaultMaterialTheme = createTheme();
    const [data, setData] = useState([]);
    const currentDate = new Date();
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);

    const [fromDate, setFromDate] = useState(previousDate.toISOString().split('T')[0]);
    const [toDate, setToDate] = useState(currentDate.toISOString().split('T')[0]);

    const [selectedFilter, setSelectedFilter] = useState('');

    useEffect(() => {
        // Fetch data from Amr_Log.json
        fetch('Amr_Log.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return ''; // Check if dateString is null or undefined
        const parts = dateString.split(/[\s/:]/); // Split by space, /, :, and convert to an array
        const day = parts[1]; // Extract day component
        const month = parts[0]; // Extract month component
        const year = parts[2]; // Extract year component
        return `${day}-${month}-${year}`;
    };
    
    const formattedData = data.map(row => ({
        ...row,
        READING_DATE: formatDate(row.READING_DATE)
    }));
    const convertDateFormat = (dateString) => {
        if (!dateString) return ''; // Check if dateString is null or undefined
        const parts = dateString.split("-"); // Split the date string by "-"
        // Rearrange the parts to form "dd-mm-yyyy"
        const day = parts[2]; // Extract day component
        const month = parts[1]; // Extract month component
        const year = parts[0]; // Extract year component
        return `${day}-${month}-${year}`; // Join the parts with "-"
    };
    const evenRows = formattedData.filter((_, index) => index % 2 === 0);
    const oddRows = formattedData.filter((_, index) => index % 2 !== 0);

    oddRows.forEach((row, index) => {
        row['DIFFERENCE1'] = (row['READ_I'] - evenRows[index]['READ_I']).toFixed(3);
        row['DIFFERENCE2'] = (row['READ_E'] - evenRows[index]['READ_E']).toFixed(3);
        row['FLAG'] = row['DIFFERENCE1'] > row['DIFFERENCE2'] ? 'Flag1' : null;
        if (row['DIFFERENCE1'] > 0 && row['DIFFERENCE2'] > 0) {
            row['FLAG'] = row['FLAG'] ? row['FLAG'] + ', Flag2' : 'Flag2';
        }
        row['PREVIOUS_I']=evenRows[index]['READ_I'];
        row['PREVIOUS_E']=evenRows[index]['READ_E'];
    });
    // const calculateDifferences = (data) => {
    //     // Iterate through each distinct row in the data
    //     return data.map(row => {
    //         // Find the toDateRow for the current row's meterno and date
    //         const toDateRow = data.find(item => item.READING_DATE === convertDateFormat(toDate) && item.METERNO === row.METERNO);
    //         // Find the fromDateRow for the current row's meterno and date
    //         const fromDateRow = data.find(item => item.READING_DATE === convertDateFormat(fromDate) && item.METERNO === row.METERNO);
            
    //         // If toDateRow or fromDateRow is not found, return the row without any changes
    //         if (!toDateRow || !fromDateRow) return row;
            
    //         // Calculate differences and set FLAG based on the conditions
    //         const difference1 = (toDateRow.READ_I - fromDateRow.READ_I).toFixed(2);
    //         const difference2 = (toDateRow.READ_E - fromDateRow.READ_E).toFixed(2);
    //         let FLAG = toDateRow.READ_I > toDateRow.READ_E ? 'Flag1' : null;
    //         if (difference1 > 0 && difference2 > 0) {
    //             FLAG = FLAG ? `${FLAG}, Flag2` : 'Flag2';
    //         }
    
    //         // Return the row with updated values
    //         return {
    //             ...row,
    //             DIFFERENCE1: difference1,
    //             DIFFERENCE2: difference2,
    //             PREVIOUS_I: fromDateRow.READ_I,
    //             PREVIOUS_E: fromDateRow.READ_E,
    //             FLAG: FLAG
    //         };
    //     });
    // };
    
    
  
    

   
    // const calculatedData = calculateDifferences(formattedData);  
   
    let filteredData = formattedData.filter(row => row.READING_DATE == convertDateFormat(toDate));  
   let dataobtained=filteredData;
    if (selectedFilter === 'importGreaterThanExport') {
        filteredData = dataobtained.filter(row => row['FLAG'] === 'Flag1' || row['FLAG'] === 'Flag1, Flag2');
    } else if (selectedFilter === 'bothReadingsIncreasing') {
        filteredData = dataobtained.filter(row => row['FLAG'] === 'Flag2' || row['FLAG'] === 'Flag1, Flag2');
    }

    const handleToDateChange = (date) => {
        setToDate(date);
        const previousDate = new Date(date);
        previousDate.setDate(previousDate.getDate() - 1);
        setFromDate(previousDate.toISOString().split('T')[0]);
    };

    return (
        <div>
            <div className="filter-controls-container">
                <div className="filter-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <label className="labels">
                        From Date:
                        <TextField
                            placeholder="From Date:"
                            type="date"
                            value={fromDate}
                            disabled
                            variant="outlined"
                            size="small"
                            inputProps={{ max: new Date().toISOString().split('T')[0] }}
                        />
                    </label>
                    <label className="labels">
                        To Date:
                        <TextField
                            placeholder="To Date:"
                            type="date"
                            variant="outlined"
                            value={toDate}
                            onChange={(e) => handleToDateChange(e.target.value)}
                            size="small"
                            inputProps={{ max: new Date().toISOString().split('T')[0] }}
                        />
                    </label>
                    <label className="labels">
                        Filter:
                        <Select
                            style={{ height: '3rem' }}
                            variant="outlined"
                            displayEmpty
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                        >
                            <MenuItem value="">All Data</MenuItem>
                            <MenuItem value="importGreaterThanExport">Import is greater than export reading</MenuItem>
                            <MenuItem value="bothReadingsIncreasing">Import and export both readings increasing</MenuItem>
                        </Select>
                    </label>
                </div>
            </div>
            <div style={{ maxWidth: '100%' }}>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        icons={tableIcons}
                        columns={[
                            { title: 'GRID ID', field: 'GRIDNO' },
                            { title: 'GRID NAME', field: 'NAME' },
                            { title: 'FEDER NAME', field: 'CONNECT_WITH' },
                            { title: 'METER NUMBER', field: 'METERNO', type: 'numeric' },
                            { title: 'DIVISION CODE', field: 'DIVISION' },
                            {title:'PREVIOUS IMPORT READING',field:'PREVIOUS_I'},
                            { title: 'CURRENT IMPORT READING', field: 'READ_I' },
                            {title:'PREVIOUS EXPORT READING',field:'PREVIOUS_E'},
                            { title: 'CURRENT EXPORT READING', field: 'READ_E' },
                           
                            { title: 'DIFFERENCE IMPORT', field: 'DIFFERENCE1' },
                            { title: 'DIFFERENCE EXPORT', field: 'DIFFERENCE2' },
                        
                            
                        ]}
                        data={filteredData}
                        title="Amr_Log"
                        options={{
                            headerStyle: {
                                textAlign: 'left' // Align column titles to the left
                            }
                        }}
                        style={{ margin: 'auto' }}
                    />
                </ThemeProvider>
            </div>
        </div>
    );
};

export default Data;
