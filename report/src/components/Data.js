import React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { forwardRef } from 'react';

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
import  { useState } from 'react';
import  { useEffect } from 'react';
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
    const[data,setdata]=useState([]);
    useEffect(() => {
      fetch('Amr_Log.json')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => setdata(data))
        .catch(error => console.error('Error fetching data:', error));
    },[]);
  console.log(data);
    return (
        <div>
            <div style={{ maxWidth: '100%' }}>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        icons={tableIcons}
                        columns={[
                             
                                { title: 'Reading Date', field: 'READING_DATE' },
                                { title: 'Slot', field: 'SLOT', type: 'numeric' },
                                { title: 'Grid Name', field: 'GRID_NAME' },
                                { title: 'Feeder Name', field: 'FEEDER_NAME' },
                                { title: 'Feeder ID', field: 'FEEDER_ID' },
                                { title: 'Meter No', field: 'METERNO' },
                                { title: 'V1', field: 'V1' },
                                { title: 'V2', field: 'V2' },
                                { title: 'V3', field: 'V3' },
                                { title: 'I1', field: 'I1' },
                                { title: 'I2', field: 'I2' },
                                { title: 'I3', field: 'I3' }
                              
                              
                             
                               
                        ]}
                        data={data}
                        title="Amr_Log"
                        editable={{
                            onRowAdd: newData => new Promise((resolve, reject) => {
                                
                                // Handle row addition logic here
                                setTimeout(() => {
                                    // Add the new row to your data source
                                    // For example, you can use setState to update the data
                                    resolve();
                                }, 600);
                            }),
                            onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                                // Handle row update logic here
                                setTimeout(() => {
                                    // Update the row in your data source
                                    // For example, you can use setState to update the data
                                    resolve();
                                }, 600);
                            }),
                            onRowDelete: oldData => new Promise((resolve, reject) => {
                                // Handle row deletion logic here
                                setTimeout(() => {
                                    // Delete the row from your data source
                                    // For example, you can use setState to update the data
                                    resolve();
                                }, 600);
                            })
                        }}
                        style={{margin:'auto'}}
                    />
                </ThemeProvider>
            </div>
        </div>
    );
};

export default Data;
