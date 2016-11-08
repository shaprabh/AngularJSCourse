(function(){
'use strict';
angular.module('ShoppingListCheckOff',[])
      .controller('ToBuyController',ToBuyController)
      .controller('AlreadyBoughtController',AlreadyBoughtController)
      .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject=['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var ToBuyCtl=this;
  ToBuyCtl.ToBuyItems=ShoppingListCheckOffService.ToBuyItems;
  ToBuyCtl.Buy=ShoppingListCheckOffService.Buy;

}


AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var BoughtCtl=this;
  BoughtCtl.BoughtItems=ShoppingListCheckOffService.BoughtItems;
}

function ShoppingListCheckOffService()
{
  var service=this;
  service.ToBuyItems=[
    {itemName:"Cookies",Quantity:10},
    {itemName:"Pastries",Quantity:3},
    {itemName:"Books",Quantity:5},
    {itemName:"Vegetables",Quantity:8},
    {itemName:"Fruits",Quantity:6},
    {itemName:"Eggs",Quantity:20},
    {itemName:"Juice Cans",Quantity:5},
    {itemName:"Snacks",Quantity:2}
  ];

  service.BoughtItems=[];

  service.Buy=function(arrIndex){

    service.BoughtItems.push(service.ToBuyItems[arrIndex]);
    service.ToBuyItems.splice(arrIndex,1);

  };
}

})();
