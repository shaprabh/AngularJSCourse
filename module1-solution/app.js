(function(){
'use strict';
angular.module('lunchChecker',[])
.controller('lunchCheckerController',lunchCheckerController);

lunchCheckerController.$inject=['$scope'];

function lunchCheckerController ($scope){

$scope.foodCount=0;
$scope.foodItems='';


$scope.CheckFoodCount=function () {
//foodArr is the array which stores individual food items

var foodArr=$scope.foodItems.split(',');
var emptyItems=0;
//check if any of the food items is empty
for( var itm=0;itm<foodArr.length;itm++)
{
  if(foodArr[itm].trim()=='')
    emptyItems++;
}
//subtract the empty food item count from total CheckFoodCount
$scope.foodCount=foodArr.length-emptyItems;
if($scope.foodItems.trim()=='' || $scope.foodCount<=0)
{
  $scope.msg='Please enter data first';
    $scope.fcolor='red';
  return;
}
else if($scope.foodCount <=3)
{
  $scope.msg='Enjoy!';
  $scope.fcolor='green';
  return;
}
else {
  $scope.msg='Too much!';
    $scope.fcolor='green';
}
}


}

})();
