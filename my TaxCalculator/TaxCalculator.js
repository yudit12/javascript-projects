
function checkMonth() {
    var answerCheckbox = document.getElementById("myCheck").checked;
    
    if(!answerCheckbox){
         $(".month").fadeIn("2000");
    }    
    else{
        $(".month").fadeOut("2000");
    }
        
}
function clickBtton(){
    var answerCheckbox = document.getElementById("myCheck").checked;
    if(!answerCheckbox)//month
        calcMonth();
    else
        calcYear();

}
function calcYear(){
    
    var TextboxYear = $("#textBoxSumYear").val();
    var year=checkInput(TextboxYear);
    year=year*12;
    calc(year);

}
function calcMonth(){
  
    var numOfMonth =12;
    var sum=0,input;

    var arrTextboxSumMonth = $(".textBoxSumMonth");
    var arrSum = new Array(numOfMonth);
    for(var i=0 ; i<numOfMonth;i++){
        input=arrTextboxSumMonth[i].value;
        arrSum[i]=checkInput(input);      
    }
    for(var i=0 ; i<numOfMonth;i++){
        sum+=arrSum[i];
    }
    calc(sum);
}

function checkInput(input){//check input and parse string to number
    if(input==="")
        input="0";
    if(isNaN(input)){
        alert("error input, please enter a real numbers");
        return;
    }
    return parseFloat(input);//parse string to number
}

function calc(sum){
    
    //1. check input
    var TextBonus = $("#Bonus").val();
    var bonus;

    bonus=checkInput(TextBonus);
    
    //2. calc
   var tax=auxiliaryCalc(sum);
   tax=Credit_points(tax,bonus);
   tax=tax/12;
    //3. print result
   output.innerHTML="Total Tax is: "+tax;
  
}

var loadPage = function() {
   
    $("#myCheck").click(checkMonth);

    $("#cmdOK").click(clickBtton)  
};

  $("document").ready(loadPage);


function auxiliaryCalc(num){
    var newNum =num;
    var sum=0;
    var i;
    var income=[0,6220,8920,14320,19900,41410,53333];
    var percent=[0.1,0.14,0.2,0.31,0.35,0.47,0.5];
    
    for(i=0;i<7;i++)
        income[i]*=12; 

    i=0;
    while(newNum>0 && i<6){
        if(num>income[i+1]){
            sum+=(income[i+1]-income[i])*percent[i];
        }
        else{
            sum+=newNum*percent[i];
        }
        newNum=newNum-(income[i+1]-income[i]);
         i++;
    }
    if(newNum>0)
        sum+=newNum*percent[i];//i=6
    
   
    return sum;
}

function Credit_points(tax,num_Credit_points){
	//var credit_point_month=215;
	var credit_point_year=2580;
	var discount =num_Credit_points*credit_point_year;
	var new_tax= tax-discount;
	
	if(new_tax<=0){
		new_tax=0;
		
    }
    return new_tax;
	
}	
