import { motion } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
// import { getPlaiceholder } from "plaiceholder";
import { fadeInUp, fadeOut, stagger } from "../shared/animations";
import { Product, Products } from "../shared/types";

type HomeProps = {
  products: Products;
};

const Home: NextPage<HomeProps> = ({ products }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeOut}
    >
      <div className="container">
        <div className="products">
          {products && products.length && (
            <motion.ul variants={stagger} className="products__list">
              {products.map((product) => {
                const {
                  id,
                  image: { src, alt, width, height },
                  // image: { src, alt, width, height, blurDataURL },
                } = product;

                console.log({ product });

                return (
                  <motion.li
                    className="products__list-item"
                    key={`product-${id}`}
                    variants={fadeInUp}
                  >
                    <motion.div
                      className="image__wrapper"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        // blurDataURL={blurDataURL}
                        // placeholder="blur"
                      />
                      <Link href={`/product/${id}`} passHref>
                        <a className="list-item__link"></a>
                      </Link>
                    </motion.div>
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export async function getServerSideProps() {
  const data = require("../data.json");

  const { products }: { products: Products } = data;

  // await Promise.all(
  //   products.map(async (product: Product) => {
  //     const { base64 } = await getPlaiceholder(product.image.src);

  //     product.image.blurDataURL = base64;

  //     return product;
  //   })
  // );

  return {
    props: {
      products,
    },
  };
}

export default Home;
