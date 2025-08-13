import { motion } from "framer-motion";
import Hero from "../components/Hero";

function About() {
  return (
    <motion.div initial={{ y: 250, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <title>About | InfiNote</title>
      <Hero title="About InfiNote" description="Create customized notes to boost your learning and studying!" />
      <p className="paragraph">
        InfiNote is a simple and straighforward web app designed for studying and learning effectively without any distractions.
        Create your own topics, write your own notes, manage them for easy reviewing and sharing, and customize this digital
        notebook that's yours however you like. There's also a bunch of features like "Mark as Review", "Add to Favorites",
        "Recent Notes", helpful videos or tools related to the topic, and convenient navigation with a powerful search bar. And of
        course there's a toggle for dark and light mode with a button next to it that resets all your data. If you enjoy using
        this site, please check out my{" "}
        <a href="https://github.com/tonymac129" target="_blank">
          GitHub
        </a>{" "}
        or{" "}
        <a href="https://tonymac129.github.io" target="_blank">
          portfolio
        </a>{" "}
        to see my other work!
      </p>
    </motion.div>
  );
}

export default About;
