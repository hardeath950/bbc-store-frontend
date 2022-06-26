export interface Product {
  id: number
  attributes: {
    createdAt: string
    name: string
    description: string
    sale_price: number
    images: any[]
  }
}
