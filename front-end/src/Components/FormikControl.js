import React from 'react'
import Input from './formComponents/Input';
import Textarea from './formComponents/Textarea';
import CheckboxGroup from './formComponents/CheckboxGroup';


function FormikControl(props) {
    const {control,...rest}=props;
    switch(control){
        case 'input':return <Input {...rest}/>
        case 'textarea':return <Textarea {...rest}/>
        case 'checkbox': return <CheckboxGroup {...rest}/>
        default : return null
    }
}

export default FormikControl