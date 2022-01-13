import { BaseService } from "medusa-interfaces";

class MyService extends BaseService {
  constructor({ productService }) {
    super();

    this.productService_ = productService
  }

  async getProductMessage() {
    const [product] = await this.productService_.list({}, { take: 1 })

    return `Welcome to ${product.title}!`
  }
}

export default MyService;