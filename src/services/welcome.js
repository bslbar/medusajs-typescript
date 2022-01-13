import { BaseService } from "medusa-interfaces";

class WelcomeService extends BaseService {
    
  constructor({  cartService, orderService }) {
    super();
    
    this.cartService_ = cartService
    this.orderService_ = orderService
  }

  async registerOptin(cartId, optin) {
    if (typeof optin !== "boolean") {    
        throw new Error("optin must be a boolean value.")  
    }
    
    return await this.cartService_.update(cartId, {    
        metadata: { welcome_optin: optin }  
    });
  }

  async sendWelcome(orderId) {  
    const order = await this.orderService_.retrieve(orderId, {    select: ["email", "customer_id", "metadata"]  })
    const prevOrders = await this.orderService_.list({    customer_id: order.customer_id  }, {    select: ["id"]  })
    if (prevOrders.length > 1) 
        return;
    if (order.metadata && order.metadata.welcome_optin)  
        return await someEmailSender.send({ to: order.email, subject: "Welcome to our Medusa Store!",body: `We are so happy to have you!`});  
    }
}
export default WelcomeService;
