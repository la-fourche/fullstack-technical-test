import Link from 'next/link'
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Configure, Pagination } from 'react-instantsearch-dom';
import { useAppDispatch, useAppSelector } from "hooks";
import { addItem, removeItem } from "reducer/cartSlice";
import styles from "../styles/Home.module.css";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

const Hit: React.FC<{ hit: any}> = ({ hit }) => {
  const dispatch = useAppDispatch();
  const cartID = useAppSelector(state => state.cart.id);
  const items = useAppSelector(state => state.cart.items);
  const isProductInCart = items.some(item => item.objectID === hit.objectID)

  console.log(hit)

  return(
    <div className={styles.card}>
      <img src={hit.image} alt={hit.name} width={80} height={80} />
      <h3>{hit.name}</h3>
      <p>{hit.shortDescription}</p>
      <p>{hit.salePrice} $</p>
      {isProductInCart ?
        <button onClick={() => dispatch(removeItem({ cartID, data: {
          objectIDs: [hit.objectID]}
        }))}>Supprimer</button>
        :
        <button onClick={() => dispatch(addItem({ cartID, data: {
          items: [
            {
              name: hit.name,
              price: hit.salePrice,
              objectID: hit.objectID
            }
          ]}
        }))}>Ajouter</button>
      }
    </div>
  )
}

export default function Home() {

  return (
    <main>
      <div className={styles.container}> 
        <InstantSearch indexName="bestbuy" searchClient={searchClient}>
        <div className={styles.header}>
          <SearchBox  />
          <Link href="/cart">
            <a style={{ marginBottom: "10px" }}><button>Panier</button></a>
          </Link>
        </div>

        <div className={styles.grid}>
          <Hits hitComponent={Hit} />
        </div>
        <div className={styles.pagination}>
          <Configure hitsPerPage={8} />
          <Pagination />
        </div>
        </InstantSearch>
      </div>
    </main>
  );
}