dropdownSelect = function(link) {
    switch (link) {
        case 'Name':
            document.getElementById('search').innerHTML = 'Name <span class=\'caret\'></span>';
            filterOptions.filterColumn = 'fullName';
            break;
        case 'DOB':
            document.getElementById('search').innerHTML = 'DOB <span class=\'caret\'></span>';
            filterOptions.filterColumn = 'dateOfBirth';
            break;
        case 'SSN':
            document.getElementById('search').innerHTML = 'SSN <span class=\'caret\'></span>';
            filterOptions.filterColumn = 'ssn';
            break;
        case 'ID':
            document.getElementById('search').innerHTML = 'ID <span class=\'caret\'></span>';
            filterOptions.filterColumn = 'patientID';
            break;
        case 'Phone':
            document.getElementById('search').innerHTML = 'Phone <span class=\'caret\'></span>';
            filterOptions.filterColumn = 'phone';
            break;
        case 'Zipcode':
            document.getElementById('search').innerHTML = 'Zipcode <span class=\'caret\'></span>';
            filterOptions.filterColumn = 'zipcode';
            break;
    }
};

function sortData(field, direction, data) {
    if (!data)
        return;
    data.sort(function(a, b) {
        if (direction === "asc") {
            return a[field] > b[field] ? 1 : -1;
        } else {
            return a[field] > b[field] ? -1 : 1;
        }
    });
    return data;
};