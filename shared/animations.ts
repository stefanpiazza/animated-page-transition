const easing = [0.6, -0.05, 0.01, 0.99];

export const fadeOut = {
  hide: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const fadeInUp = {
  hide: {
    y: 60,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const fadeInRight = {
  hide: {
    x: -60,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const stagger = {
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const fadeInViewProps = {
  initial: "hide",
  whileInView: "show",
  viewport: { once: true, amount: 0.25 },
};

export const fadeInProps = {
  initial: "hide",
  animate: "show",
};
