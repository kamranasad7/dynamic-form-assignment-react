import { InputHTMLAttributes } from "react";

export interface FormElement extends InputHTMLAttributes<never> {
  id: string;
  type: InputHTMLAttributes<never>['type'] | 'select';
  options?: string[];
}

const config: (FormElement | FormElement[])[] = [
  [{
    id: 'firstName',
    placeholder: 'First name',
    required: true,
    type: 'text',
  },
  {
    id: 'lastName',
    placeholder: 'Last name',
    required: true,
    type: 'text',
  }],
  {
    id: 'Email',
    placeholder: 'Email',
    required: true,
    type: 'text',
  },
  {
    id: 'address1',
    placeholder: 'Address 1',
    type: 'text',
  },
  [{
    id: 'city',
    type: 'text',
    placeholder: 'City',
  },
  {
    id: 'state',
    type: 'text',
    placeholder: 'State',

  },
  {
    id: 'zip',
    type: 'text',
    placeholder: 'Zip',
  }],
  {
    id: 'phone',
    required: true,
    type: 'text',
    placeholder: 'Phone',
  },
  {
    id: 'jobTitle',
    options: [
      'Engineer - lead',
      'Engineer - mid level',
      'Engineer - junion',
      'Engineer - front end focused',
      'Engineer - backend focused',
      'Engineer - full stack',
    ],
    placeholder: 'Please select job title',
    type: 'select',
  },
  {
    id: 'reason',
    placeholder: 'Describe why you are a good fit for the job you are applying for',
    type: 'textarea',
  }
];

export default config;