class Customer{
    constructor(name, company, id){
        this.name = name;
        this.company = company;
        this.id = id;
    }
}

const Customer_list = []

const Create_customer =(name_, company_, id_) =>{
    var Curr_person=  new Customer(name_, company_, id_)
    if(name_ != undefined){
    Customer_list.push(Curr_person)
    }
    return Customer_list;
}

const Index_customer = (name_, company_, index) =>{
    for (var i = 0; i < Customer_list.length; i++){
        if (Customer_list[i]['id'] == index){
            Customer_list[i]['name'] = name_;
            Customer_list[i]['company'] = company_
        }
    }
}

const Delete_customer = (index) =>{
    for (var i = 0; i < Customer_list.length; i++){
        if (Customer_list[i]['id'] == index){
            Customer_list.splice(i, 1)
        }
    }
}

const Filter_customer = (name_, company_, index, offset_, limit_) =>{
    curr_list = []

    for (var i = 0; i < Customer_list.length; i++){
        if (Customer_list[i]['name'] == name_ || Customer_list[i]['company'] == company_ || Customer_list[i]['id'] == index){
            curr_list.push({"name": Customer_list[i]['name'], "company": Customer_list[i]['company'], "id": Customer_list[i]['id']})
        }
        else if (limit_ != undefined && offset_ != undefined && name_ == undefined && company_ == undefined && index == undefined){
            var slice_array = Customer_list.slice(offset_, limit_)
            curr_list = slice_array;
        } 
        else if (limit_ == undefined && offset_ == undefined && name_ == undefined && company_ == undefined && index == undefined){
            var slice_array = Customer_list.slice(0, 50)
            curr_list = slice_array;
        }
    }
    return curr_list;
}

const All_customer = () =>{
    return Customer_list;
}
exports.Create_customer = Create_customer;

exports.Index_customer = Index_customer;

exports.All_customer = All_customer;

exports.Filter_customer = Filter_customer;

exports.Delete_customer = Delete_customer;