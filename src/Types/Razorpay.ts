export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
export interface OrderItemsRzp {
  userId:string,
  id: string;        
  amount: number;    
  receipt: string;
}