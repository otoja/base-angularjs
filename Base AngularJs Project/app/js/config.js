var columns = [
    {field: 'patientId', visible: false},
    {field: 'phone', visible: false},
    {field: 'zipcode', visible: false},
    {field: 'fullName', displayName: 'Patient Name'},
    {field: 'dateOfBirth', displayName: 'Date of Birth', cellTemplate: 'templates/dateCellTemplate.html'},
    {field: 'gender', displayName: 'Gender'},
    {field: 'ssn', displayName: 'SSN', cellTemplate: 'templates/ssnCellTemplate.html'}
];
var pagingOptions = {
    currentPage: 1,
    pageSizes: [7],
    pageSize: 7
};
var filterOptions = {
    filterText: "",
    filterColumn: "fullName",
    useExternalFilter: true
};