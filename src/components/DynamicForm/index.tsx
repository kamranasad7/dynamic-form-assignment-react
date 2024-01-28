import { FormEvent, useRef } from 'react';
import formConfig, { FormElement } from '../../fieldset.ts';
import { GlobalStore, setResultsModal, setValidationErrors, submitData } from '../../store/index.ts';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Select, TextInput } from 'flowbite-react';

const validations: Record<string, { pattern: RegExp, errorMessage: string }> = {
    'Email': {
        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        errorMessage: 'Email must of format abc@yourmail.com',
    },
    'phone': {
        pattern: /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        errorMessage: 'Phone must be 10 digits US Standard',
    },
    'zip': {
        pattern: /^[0-9]*$/,
        errorMessage: 'Zip code must be in digits only',
    },
}

const DynamicForm = () => {

    const { validationErrors, submittedData } = useSelector((state: { global: GlobalStore }) => state.global)
    const dispatch = useDispatch();

    const InputField = (props: FormElement) => (
        <div className='flex-1'>
            <label htmlFor={props.id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.placeholder}</label>
            {props.type !== 'select' ?
                <TextInput
                    {...props}
                    name={props.id}
                    defaultValue={submittedData?.[props.id]}
                    color={validationErrors[props.id] ? 'failure' : 'blue'}
                    helperText={validationErrors[props.id] ?? ''}
                /> :
                <Select color='blue' {...props} name={props.id}>
                    {props.options?.map(option => <option key={option} value={option}>{option}</option>)}
                </Select>
            }
        </div>
    );

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const values = Object.fromEntries(formData.entries());

        const errors: Record<string, string> = { };
        for (const key in values) {
            if (validations[key] && values[key]) {
                errors[key] = !validations[key].pattern.test(values[key] as string) ? validations[key].errorMessage : '';
            }
        }

        dispatch(submitData(values));
        dispatch(setValidationErrors(errors));
        if (Object.values(errors).every(e => !e)) {
            dispatch(setResultsModal(true));
        }
    }

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form onSubmit={onSubmit} ref={formRef} className='rounded-lg bg-white p-4 flex flex-col gap-4'>
            {formConfig.map((element, i) => Array.isArray(element) ?
                <div key={i} className='flex justify-between gap-6'>{element.map(nested => <InputField key={nested.id} {...nested} />)}</div> :
                <InputField key={element.id} {...element} />
            )}

            <div className='flex justify-center'>
                <Button color='blue' type='submit' onClick={() => formRef.current?.reportValidity()}>Submit</Button>
            </div>
        </form>
    );
};

export default DynamicForm;
