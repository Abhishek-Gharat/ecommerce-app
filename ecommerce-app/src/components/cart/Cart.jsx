import { Button, Table } from 'react-bootstrap'
import { useCart } from '../../hooks/useCart'

function Cart() {
  const { cartItems, removeCartItem } = useCart()

  return (
    <section className="cart-section">
      <Table responsive hover className="align-middle cart-table mb-0">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.title}>
              <td>
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="cart-image"
                  />
                  <span className="fw-semibold">{item.title}</span>
                </div>
              </td>
              <td>Rs {item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeCartItem(item.title)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  )
}

export default Cart
