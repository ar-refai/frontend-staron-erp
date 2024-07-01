export const fakeData = [
    {
      clientName: 'Client A',
      location: 'Location A',
      description: 'This is a description for Client A',
      type:"package",
      status: 'in progress',
      qsData: {
        qcdata: 'Some QC data for Client A',
        qc: [
          {
            name: 'QC 1',
            totalcost: 500,
            application: [
              {
                stockid: '1001',
                price: '50',
                quantity: '10',
                description: 'Application 1 for QC 1',
              },
              {
                stockid: '1002',
                price: '100',
                quantity: '2',
                description: 'Application 2 for QC 1',
              },
            ],
          },
          {
            name: 'QC 2',
            totalcost: 300,
            application: [
              {
                stockid: '2001',
                price: '150',
                quantity: '2',
                description: 'Application 1 for QC 2',
              },
            ],
          },
        ],
      },
    },
    {
      clientName: 'Client B',
      location: 'Location B',
      type:"package",

      description: 'This is a description for Client B',
      status: 'completed',
      qsData: {
        qcdata: 'Some QC data for Client B',
        qc: [
          {
            name: 'QC 3',
            totalcost: 700,
            application: [
              {
                stockid: '3001',
                price: '70',
                quantity: '5',
                description: 'Application 1 for QC 3',
              },
              {
                stockid: '3002',
                price: '140',
                quantity: '2',
                description: 'Application 2 for QC 3',
              },
            ],
          },
        ],
      },
    },
    {
      clientName: 'Client C',
      location: 'Location C',
      type:"quotation",

      description: 'This is a description for Client C',
      status: 'in progress',
      qsData: {
        qcdata: 'Some QC data for Client C',
        qc: [
          {
            name: 'QC 4',
            totalcost: 450,
            application: [
              {
                stockid: '4001',
                price: '45',
                quantity: '5',
                description: 'Application 1 for QC 4',
              },
              {
                stockid: '4002',
                price: '90',
                quantity: '3',
                description: 'Application 2 for QC 4',
              },
            ],
          },
        ],
      },
    },
    {
      clientName: 'Client D',
      location: 'Location D',
      type:"quotation",

      description: 'This is a description for Client C',
      status: 'completed',
      qsData: {
        qcdata: 'Some QC data for Client C',
        qc: [
          {
            name: 'QC 4',
            totalcost: 450,
            application: [
              {
                stockid: '7001',
                price: '45',
                quantity: '5',
                description: 'Application 1 for QC 4',
              },
              {
                stockid: '4002',
                price: '90',
                quantity: '3',
                description: 'Application 2 for QC 4',
              },
            ],
          },
        ],
      },
    },
  ];
  