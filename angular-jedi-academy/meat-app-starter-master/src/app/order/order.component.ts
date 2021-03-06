import { CartItem } from './../../../../meat-app-final-master/src/app/restaurant-detail/shopping-cart/cart-item.model';
import { OrderService } from './order.service';
import { RadioOption } from '../shared/radio/radio-option.model';
import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from 'app/order/order.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery: number = 8;

  paymentOptions: RadioOption[] = [
    {label:"Dinheiro", value:"MON"},
    {label:"Cartão de Débito", value:"DEB"},
    {label:"Cartão Refeição", value:"REF"}
  ]

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  itemsValue(): number{
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[]{
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem){
    return this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem){
    return this.orderService.decreaseQty(item);
  }

  remove(item: CartItem){
    this.orderService.remove(item);
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems().map((item: CartItem)=> new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order).subscribe( (orderId: string) => {
      console.log(`Compra concluída: ${orderId}`);
      this.orderService.clear();
    });
  }
}
