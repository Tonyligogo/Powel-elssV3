export const customerColumn = [
    {
      field: 'name',
      headerName: 'Name',
      width: 120,
    },
    {
      field: 'email',
      headerName: 'Email Address',
      width: 180,
    },
    {
      field: 'phone',
      headerName: 'Phone_no',
      type: 'number',
      width: 150,
    },
    {
      field: 'contact_person',
      headerName: 'Contact_Person',
      width: 200,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 200,
    }
  ];
export const staffColumn = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      valueGetter: (value, row) => `${row.first_name || ''} ${row.surname || ''}`,
    },
    {
      field: 'phone_no',
      headerName: 'Phone_no',
      type: 'number',
      width: 110,
    },
    {
      field: 'id_no',
      headerName: 'ID_no',
      width: 110,
    },
    {
      field: 'job_title',
      headerName: 'Job title',
      width: 200,
    },
    {
      field: 'P_no',
      headerName: 'P_no',
      type: 'number',
      width: 80,
    }
  ];
 
export const allInvoicesColumn = [
  {
    field: 'invoice',
    headerName: 'Invoice No',
    width: 150,
  },
  {
    field: 'issueDate',
    headerName: 'Issue Date',
    width: 100,
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    width: 100,
  },
  {
    field: 'status',
    headerName: 'Status',
    editable: true,
    type: "singleSelect",
    valueOptions: ["Pending", "Paid", "Cancelled"],
    width: 100,
  },
  {
    field: 'dueAmount',
    headerName: 'Due Amount',
    width: 100,
  },
  {
    field: 'payment',
    headerName: 'Payment',
    width: 100,
  },
  {
    field: 'balance',
    headerName: 'Balance',
    width: 90,
  },
];

export const invoiceColumns = [
  {
    field: 'email',
    headerName: 'Email Address',
    width: 200,
  },
  {
    field: 'dueAmount',
    headerName: 'Amount',
    width: 110,
  },
  {
    field: 'status',
    headerName: 'Status',
    editable: true,
    type: "singleSelect",
  valueOptions: ["Pending", "Paid", "Cancelled"],
    width: 100,
  }
];

export const servicesColumn = [
  {
    field: 'client_name',
    headerName: 'Client Name',
    headerClassName:'header',
    width: 200,
  },
  {
    field: 'work_location',
    headerName: 'Work Location',
    headerClassName:'header',
    width: 200,
  },
  {
    field: 'scope',
    headerName: 'Scope',
    headerClassName:'header',
    width: 200,
  },
  {
    field: 'employee_details',
    headerName: 'Employee details',
    headerClassName:'header',
    width: 200,
  },
  {
    field: 'work_duration',
    headerName: 'Work duration',
    headerClassName:'header',
    width: 120,
  },
  {
    field: 'date',
    headerName: 'Date',
    headerClassName:'header',
    width: 100,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    headerClassName:'header',
    width: 100,
  },
  {
    field: 'invoice_code',
    headerName: 'Invoice code',
    headerClassName:'header',
    width: 120,
  }
];

export const productColumn = [
  {
    field: 'name',
    headerName: 'Product name',
    width: 200,
  },
  {
    field: 'desc',
    headerName: 'Description',
    type: 'text',
    width: 250,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 100,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 80,
  }
];

export const allQuotationsColumn=[
  {
    field: 'quotation_no',
    headerName: 'Quotation no.',
    width: 150,
  },
  {
    field: 'client_name',
    headerName: 'Client Name',
    width: 200,
  },
  {
    field: 'client_email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'client_contact_number',
    headerName: 'Phone no.',
    width: 100,
  },
  {
    field: 'client_address',
    headerName: 'Location',
    width: 200,
  },
  {
    field: 'quotation_date',
    headerName: 'Date',
    width: 100,
  },
  {
    field: 'quotation_due_date',
    headerName: 'Due Date',
    width: 100,
  },
  {
    field: 'terms',
    headerName: 'Terms',
    width: 100,
  },
]
