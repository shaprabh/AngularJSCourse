(function(){
'use strict';
  angular.module('NarrowItDownApp',[])
         .controller('NarrowItDownController',NarrowItDownController)
         .service('MenuSearchService',MenuSearchService)
         .directive('foundItems',foundItemsDirective);

         NarrowItDownController.$inject=['MenuSearchService'];

         function NarrowItDownController(MenuSearchService){
          var menulist=this;
          menulist.searchTerm="";
         menulist.searchMenuItems=function(searchTerm){
           if(searchTerm.trim().length==0){
                menulist.message="No Item Found";
                menulist.found=[];
               return;
           }
          else {
            menulist.message="";
          }
            var promise=MenuSearchService.getMatchedMenuItems(searchTerm);
            promise.then(function(response){
            menulist.found=  response;
            if (menulist.found.length==0)
            {
                menulist.message="No Item Found";
            }
            else {
                menulist.message="";
            }
          } ).catch(function(error){
            console.log("something went wrong");
          });

          menulist.RemoveItem=function(index){
            menulist.found.splice(index,1);
          }

       }
}

function foundItemsDirective(){
  var ddo={
    templateUrl:'/templates/foundItems.html',
    scope:{
      foundItem:'<',
      onRemove:'&',
      searchText:'<'
    },
    transclude:true,
    restrict:"E",
    controller:foundItemsDirectiveController,
    controllerAs:"list",
    bindToController:true

  };
  return ddo;
}


function foundItemsDirectiveController()
{

}


         MenuSearchService.$inject=(['$http']);
         function MenuSearchService(http) {
          var search=this;
          search.getMatchedMenuItems=function (searchTerm) {
           return http.get('https://davids-restaurant.herokuapp.com/menu_items.json')
              .then(function(result){
              var all_menu_items=result.data.menu_items;
              //var all_menu_items=data["menu_items"];
              var key="description";
              var value;
              var found=[];
              console.log(all_menu_items);
              searchTerm=searchTerm.toLowerCase();
              for(var menuItem in all_menu_items)
              {
                value=(all_menu_items[menuItem][key]).toLowerCase();
                if(value.indexOf(searchTerm)!=-1)
                {
                  found.push({
                    'short_name':all_menu_items[menuItem]["short_name"],
                    'name':all_menu_items[menuItem]["name"],
                    'description':all_menu_items[menuItem]["description"]
                  });
                }
              }
console.log(found);
                return (found);
               //alert(menulist.items);
             })
           .catch(function(error){
             console.log("something went wrong");
           });

                  };
                };


}
)();
