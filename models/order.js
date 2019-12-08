import moment from 'moment';

class Order {
  constructor(id, items, totalAmt, date) {
    Object.assign(this, { id, items, totalAmt, date });
  }
  get readableDate(){
/*     return this.date.toLocaleDateString('en-EN', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute:'2-digit' 
    }); */
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}

export default Order;
