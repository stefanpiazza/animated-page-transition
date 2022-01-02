import { motion } from "framer-motion";
import type { GetStaticPropsContext, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import { useState } from "react";
import {
  fadeOut,
  fadeInRight,
  stagger,
  fadeInUp,
} from "../../shared/animations";
import { Product, Products } from "../../shared/types";

type ProductProps = { product: Product };

const Product: NextPage<ProductProps> = ({ product }) => {
  const {
    image: { src, alt, width, height, blurDataURL },
    category,
    title,
    description,
    tags,
    price,
  } = product;

  const [productQuantity, setProductQuantity] = useState(1);

  const decreaseProductQuantity = () =>
    setProductQuantity((i) => Math.max(1, (i -= 1)));

  const increaseProductQuantity = () =>
    setProductQuantity((i) => Math.min((i += 1), 10));

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeOut}
    >
      <div className="container">
        <div className="product">
          <div className="product__image">
            <motion.div variants={fadeInRight} className="image__wrapper">
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                blurDataURL={blurDataURL}
                placeholder="blur"
              />
            </motion.div>
          </div>
          <div className="product__details">
            <motion.div variants={stagger} className="details__wrapper">
              <Link href="/" passHref>
                <motion.a variants={fadeInUp} className="product__link">
                  Back to products
                </motion.a>
              </Link>
              <motion.div variants={fadeInUp} className="product__category">
                {category}
              </motion.div>
              <motion.h1 variants={fadeInUp} className="product__title">
                {title}
              </motion.h1>
              <motion.p variants={fadeInUp} className="product__description">
                {description}
              </motion.p>
              {tags && tags.length && (
                <motion.ul variants={stagger} className="product__tags">
                  {tags.map((tag) => {
                    const { id, title } = tag;

                    return (
                      <motion.li
                        variants={fadeInUp}
                        className="product__tag"
                        key={`tag-${id}`}
                      >
                        {title}
                      </motion.li>
                    );
                  })}
                </motion.ul>
              )}
              <motion.div
                variants={fadeInUp}
                className="product__quantity-price"
              >
                <div className="product__quantity">
                  <button
                    className="button button--tertiary quantity__minus"
                    onClick={decreaseProductQuantity}
                  >
                    -
                  </button>
                  <div className="quantity__amount">{productQuantity}</div>
                  <button
                    className="button button--tertiary quantity__plus"
                    onClick={increaseProductQuantity}
                  >
                    +
                  </button>
                </div>
                <p className="product__price">{price}</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="product__buttons">
                <button className="button button--primary">Add to cart</button>
                <button className="button button--secondary">Subscribe</button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const { params } = ctx;
  const { id } = params || {};

  const data = require("../../data.json");

  const { products }: { products: Products } = data;

  const product = products.find((product: Product) => product.id == id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  const { base64 } = await getPlaiceholder(product.image.src);

  product.image.blurDataURL = base64;

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
    ],
    fallback: false,
  };
}

export default Product;
