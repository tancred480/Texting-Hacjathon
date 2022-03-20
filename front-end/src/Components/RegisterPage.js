import React from 'react'
import * as Yup from "yup";
import {Formik,Form} from "formik";
import FormikControl from './FormikControl';
import { Card } from '@mui/material';
import { Button } from '@mui/material';

function FormikContainer() {
    const initialValues={
        group_name:"",
        group_pwd:"",
        group_leader:"",
        group_leader_phone:"",
        csv_file_path:"",
    }
    const validationSchema=Yup.object({
        group_name:Yup.string().required("Group name is Required"),
        group_pwd:Yup.string().required("Group password is Required"),
        group_leader:Yup.string().required("Group leader name is Required"),
        group_leader_phone:Yup.string().required("Group leader phone number is Required"),
        csv_file_path:Yup.string().required("CSV File is Required"),
    });
    const onSubmit=(values,onSubmitProps)=>{
        console.log("Form values :",values);
        
    }
    return (
        <Card>
            
            <Formik
             initialValues={initialValues}
             validationSchema={validationSchema}
             onSubmit={onSubmit}
            >
                <Form encType="multipart/form-data">
                    <FormikControl 
                        control="input"
                        type="text"
                        label="Group Name"
                        name="group_name"
                        placeholder="Enter group name"
                    />
                    <FormikControl 
                        control="input"
                        type="text"
                        label="Group Password"
                        name="group_pwd"
                        placeholder="Enter group password"
                    />
                    <FormikControl 
                        control="input"
                        type="text"
                        label="Group Leader name"
                        name="group_leader"
                        placeholder="Leader name"
                    />
                    <FormikControl 
                        control="input"
                        type="text"
                        label="Group Leader phone"
                        name="group_leader_phone"
                        placeholder="Leader phone no. "
                    />
                    <div>
                      <label htmlFor="csv_file_path" class="form-label">Select desired CSV File</label>
                      <input type="file" className="form-control" id="csv_file_path" placeholder="Choose File" name="csv_file_path" required/>
                    </div>
                    <Button color="primary" variant="contained">Submit</Button>
                </Form>
            </Formik>
        </Card>
    )
}

export default FormikContainer