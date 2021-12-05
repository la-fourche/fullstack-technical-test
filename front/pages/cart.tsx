import Link from 'next/link'
import { useAppSelector } from "hooks";
import styles from "../styles/Home.module.css";

const Cart: React.FC<{}> = () => {
  const items = useAppSelector(state => state.cart.items);
  const totalPrice = items.reduce((acc, item) => acc += item.price, 0)

  return (
    <main className={styles.main}>
      <Link href="/">
        <a><button>Catalogue</button></a>
      </Link>
      <h1>Panier</h1>
      <h1>Produts:</h1>
      <ul>
        {items.map(item => {
          return <li key={item.objectID}><p>{item.name} - {item.price}</p></li>
        })}
      </ul>

      <h2>total: {totalPrice}</h2>
    </main>
  );
}

export default Cart;