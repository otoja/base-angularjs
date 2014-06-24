'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngGrid'])
        .controller('GridCtrlr', ['$scope', '$http', function($scope, $http) {
                $scope.filterOptions = filterOptions;
                $scope.sortInfo = {fields: ['fullName'], directions: ['asc']};
                $scope.pagingOptions = {
                    currentPage: 1,
                    pageSize: 7
                };
                //simple function to bind to show all button
                $scope.clearFilters = function() {
                    $scope.filterOptions.filterText = '';
                    document.getElementById('search').innerHTML = 'Name <span class=\'caret\'></span>';
                    filterOptions.filterColumn = 'fullName';
                };
                
                //onRowClick event
                $scope.openDetails = function(patientId){
                    console.log("Patient ID ready to send to new tab: "+patientId);
                };

                //pagination functions
                $scope.setPagingData = function(data, page, pageSize) {
                    var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
                    $scope.myData = pagedData;
                    $scope.totalServerItems = data.length;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }

                $scope.getPagedDataAsync = function(pageSize, page, searchColumn, searchText) {
                    var data;

                    if (searchText && searchColumn) {
                        var ft = searchText.toLowerCase();
                        $http.get('http://nutrient.io/api/api/patients').success(function(allData) {
                            data = allData.filter(function(item) {
                                return JSON.stringify(item[searchColumn]).toLowerCase().indexOf(ft) != -1;
                            });
                            if ($scope.sortInfo.fields && $scope.sortInfo.directions)data = sortData($scope.sortInfo.fields[0], $scope.sortInfo.directions[0], data);
                            $scope.setPagingData(data, page, pageSize);
                        });
                    } else {
                        $http.get('http://nutrient.io/api/api/patients').success(function(allData) {
                            if ($scope.sortInfo.fields && $scope.sortInfo.directions)allData = sortData($scope.sortInfo.fields[0], $scope.sortInfo.directions[0], allData);
                            $scope.setPagingData(allData, page, pageSize);
                        });
                    }
                };
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

                $scope.rowsInGrid = function() {
                    var rows = 7;
                    if ($scope.pagingOptions.pageSize >= $scope.totalServerItems)
                        return $scope.totalServerItems;
                    if ($scope.pagingOptions.currentPage > 1)
                        rows = $scope.totalServerItems - (($scope.pagingOptions.currentPage - 1) * $scope.pagingOptions.pageSize);
                    if (rows >= 7)
                        return 7;
                    else
                        return rows + ($scope.pagingOptions.currentPage * $scope.pagingOptions.pageSize - 7);
                };
                // end of pagination functions 


                //watch functions
                $scope.$watch('filterOptions', function(newVal, oldVal) {
                    if (newVal !== oldVal) {
                        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterColumn, $scope.filterOptions.filterText);
                    }
                }, true);

                $scope.$watch('pagingOptions', function(newVal, oldVal) {
                    if (newVal !== oldVal) {
                        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterColumn, $scope.filterOptions.filterText);
                    }
                }, true);
                $scope.$watch('sortInfo', function(newVal, oldVal) {
                    if (newVal.fields[0] != oldVal.fields[0] || newVal.directions[0] != oldVal.directions[0]) {
                        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterColumn, $scope.filterOptions.filterText);
                    }
                }, true);
                //end of watch functions

                //grid main config
                $scope.gridOptions = {
                    data: 'myData',
                    filterOptions: $scope.filterOptions,
                    sortInfo: $scope.sortInfo,
                    columnDefs: columns,
                    primaryKey: 'patientId',
                    //selection
                    multiSelect: false,
                    enableRowSelection: true,
                    //look
                    rowHeight: 50,
                    headerRowHeight: 50,
                    footerRowHeight: 50,
                    rowTemplate: 'templates/rowTemplate.html',
                    footerTemplate: 'templates/footerTemplate.html',
                    //pagination
                    enablePaging: true,
                    pagingOptions: $scope.pagingOptions,
                    totalServerItems: 'totalServerItems',
                    showFooter: true,
                    //dynamic height of grid
                    plugins: [new ngGridFlexibleHeightPlugin()]
                };
            }]);
