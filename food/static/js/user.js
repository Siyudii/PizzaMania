

orders=[];

// item = {};

 
            function plus(index,pizzaID) {
                console.log(pizzaID);
                    // orders = [];
                    order = {};
                    var pizza = pizzaID;
                    
                    var count = document.querySelector('#count'+index).getAttribute('data-counter');
                    count++;
                    // console.log(count); 
                    document.querySelector('#count'+index).innerHTML = count;
                    document.querySelector('#count'+index).setAttribute('data-counter',count);
                    var limit = 2;
                    if(count<limit)
                    {
                        $('#SAP').attr('disabled','disabled');
                    }
                    else{
                        $('#SAP').removeAttr('disabled');
                    }
                    
                    $('#myModal').modal('show');
                // var limit = 2;
                // console.log("hello");
                $('input[type=checkbox]').on('change', function (e) {
                    if ($('input[type=checkbox]:checked').length > limit) {
                        $(this).prop('checked', false);
                        alert("allowed only "+limit);
                        console.log("ji");
                    }
                });
                
                
          
                function getToppings()
                {   
                    toppings = [];
                    // console.log("hrll");
                    
                   $('input:checkbox:checked').each(function(){
                      
                      item = this.value;
                      console.log(item);
                      toppings.push(item);
                      this.checked = false;
                      $('#myModal').modal('hide');
                     return toppings;
              
                   });
                    //var toppings = [];
                    order["pizza"] = pizzaID;
                    order ["toppings"] = toppings;
                    orders.push(order);
                    console.log(order);
                }
                plus.getToppings = getToppings;

                function toppingsSamePrev(){
                   let len = orders.length;
                   let i;
                   console.log(len);
                   
                   for(i=len-1;i>=0;i--)
                   {
                    // console.log(orders[i].pizza);
                       if(orders[i].pizza == pizzaID )
                       {
                           orders.push(orders[i]);
                           break;
                       }
                   }
                   $('#myModal').modal('hide');
                //    toppingsSamePrev()
                    
                }
                plus.toppingsSamePrev = toppingsSamePrev;
                function cancel(){
                    order["pizza"]=pizzaID;
                    order["toppings"]="Nil";
                    orders.push(order);
                    console.log(order);
                    $('#myModal').modal('hide');
                }
                plus.cancel = cancel;
             
            };




            function minus(index,pizzaID) {
                var count = document.querySelector('#count'+index).getAttribute('data-counter');
                console.log("iio");
                console.log(pizzaID);
                if(count>1)
                {
                   
                    console.log("hatt");
                    let len=orders.length;
                    console.log(orders[0].toppings);
                let i;
                    for(i=0;i<len;i++)
                    {
                        console.log(orders[i].pizza);
                        // var topp = {{ toppings }};
                        console.log(topp);
                        if(orders[i].pizza == pizzaID)
                        {
                            console.log(orders[i].toppings);
                            console.log("mai pagal");
                           var table = document.querySelector('#unminuslist');
                           var row = table.insertRow(i);
                           
                           var cell = row.insertCell(1);
                           var newText = document.createTextNode(orders[i].toppings);
                           cell.appendChild(newText);
                        }
                    }
                    $('#Minusorders').modal('show');
                }
                if(count > 0)
                count--;
                document.querySelector('#count'+index).innerHTML = count;
                document.querySelector('#count'+index).setAttribute('data-counter',count);
                
              
                
                
              

            };

            function toppings(){
                console.log("Pahunch gaye");
                plus.getToppings();
                
            };
