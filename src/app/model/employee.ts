export class employeemodel {

    empid: number;
    name: string;
    city: string;
    state: string;
    contact: string;
    address: string;
    email: string;
    pincode: string;

    constructor()
    {
        this.address = '';
        this.city = '';
        this.contact = '';
        this.email = '';
        this.state = '';
        this.name = '';
        this.empid = 1;
        this.pincode = '';
    }
}