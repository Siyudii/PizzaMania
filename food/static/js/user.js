

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
                var Pizzaname;
                var toparrlen;
                var toparr;
                var string;

                if(count>1)
                {
                   
                    console.log("hatt");
                    let len=orders.length;
                    //console.log(orders[0].toppings);

                    fetch('http://127.0.0.1:8000/ajaxMenu',{
                        method: 'POST',
                        credentials: 'same-origin',
                        headers: {
                            // 'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                            'X-CSRFToken': csrftoken
                        },
                        body: JSON.stringify({'post_data': pizzaID})
                    })
                    .then(response => {
                        if (!response.ok) {
                            // error processing
                            throw 'Error';
                        }
                        return response.json()
                    })
                    .then(data =>{
                        console.log("aagaya");
                        console.log(data["pizza"][0]["pizza"]);
                        // console.log(type(data));
                        Pizzaname = data["pizza"][0]["pizza"];



                        let i;
                        for(i=0;i<len;i++)
                        {
                            indexNum=i;
                            console.log(orders[i].pizza);
                            var topp = '{{ toppings }}';
                            console.log(topp);
                            if(orders[i].pizza == pizzaID)
                            {
                                indexNum=i;
                                
                                console.log(orders[i].toppings);
                                let top = orders[i].toppings;
                                fetch('http://127.0.0.1:8000/ajaxTopping',{
                                    method : 'POST',
                                    credentials : 'same-origin',
                                    headers : {
                                        'X-Requested-With': 'XMLHttpRequest',
                                        'X-CSRFToken': csrftoken
                                    },
                                    body : JSON.stringify({'post-data': top})
                                })
                                .then(response=> {
                                    if (!response.ok) {
                                        // error processing
                                        throw 'Error';
                                    }
                                    return response.json()
                                })
                                .then(data=> {
                                    console.log(data['toppings'])
                                    console.log(data['toppings'].length)
                                     toparr = data['toppings']
                                     toparrlen = data['toppings'].length
                                     console.log(toparr[0][0]['topping'])
                                     string = Pizzaname + " with : "
                                     for(j=0;j<toparrlen;j++)
                                     {
                                        //  for(k=0;k<)
                                         string = string + toparr[j][0]['topping'] + " , ";
                                     }
                                     console.log(indexNum);
                                     console.log(string);
                                     var table = document.querySelector('#unminuslist');
                               var row = table.insertRow(0);
                         
                               var cell = row.insertCell(0);
                               var cell_one = row.insertCell(1);
                               var newText = document.createTextNode(string);
                               var nextText = document.createElement("BUTTON");
                               nextText.innerHTML = " - ";
                               cell.appendChild(newText);
                               cell_one.appendChild(nextText);
                                     
                                })
                               
    
                               // console.log("mai pagal");
                              
                         
                                     
                            }
                        }


                    })

                    

                   
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

            function getCookie(name) {
                let cookieValue = null;
                if (document.cookie && document.cookie !== '') {
                    const cookies = document.cookie.split(';');
                    for (let i = 0; i < cookies.length; i++) {
                        const cookie = cookies[i].trim();
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) === (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
            const csrftoken = getCookie('csrftoken');
