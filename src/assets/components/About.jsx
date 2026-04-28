import styles from "./About.module.css";

const motivation = [
    {
        id: 1,
        title: "Our Passion",
        description: "We are dedicated to providing exceptional hair care services that exceed expectations.",
        spam1: "Quality",
        spam2: "Care",
        spam3: "Excellence"
    },
    {
        id: 2,
        title: "Our Mission",
        description: "To empower individuals through transformative hair care experiences that boost confidence and celebrate uniqueness.",
        spam1: "Empowerment",
        spam2: "Confidence",
        spam3: "Uniqueness"
    },
    {
        id: 3,
        title: "Our Values",
        description: "We are committed to creating a welcoming environment where diversity is celebrated and every client feels valued.",
        spam1: "Inclusivity",
        spam2: "Respect",
        spam3: "Diversity"
    },
    {
        id: 4,
        title: "Our Commitment",
        description: "We are committed to continuous learning and growth, ensuring that we stay at the forefront of the industry.",
        spam1: "Innovation",
        spam2: "Growth",
        spam3: "Excellence"
    },
    {
        id: 5,
        title: "Our Vision",
        description: "To be the leading destination for innovative hair care solutions that inspire confidence and empower individuals.",
        spam1: "Leadership",
        spam2: "Innovation",
        spam3: "Empowerment"
    },
    {
        id: 6,
        title: "Our Promise",
        description: "We promise to deliver outstanding hair care services that exceed your expectations and leave you feeling beautiful.",
        spam1: "Excellence",
        spam2: "Satisfaction",
        spam3: "Beauty"
    },
    {
        id: 7,
        title: "Our Core Values",
        description: "Integrity, professionalism, and a passion for excellence drive everything we do.",
        spam1: "Integrity",
        spam2: "Professionalism",
        spam3: "Excellence"
    },
    {
        id: 8,
        title: "Our Culture",
        description: "We foster a collaborative and supportive environment where creativity thrives and everyone feels valued.",
        spam1: "Collaboration",
        spam2: "Support",
        spam3: "Creativity"
    },
    {
        id: 9,
        title: "Our Community",
        description: "We are committed to giving back to the community and making a positive impact wherever we go.",
        spam1: "Community",
        spam2: "Impact",
        spam3: "Service"
    }
];

export default function About({ darkMode }) {
    return (
        <div className={`${styles.wrapper} ${darkMode ? styles.dark : styles.light}`}>
            <h1 className={styles.heading}>About Us</h1>
            <p className={styles.intro}>
                At the heart of our craft is a deep love for beauty, confidence, and self-expression. We believe that every strand of hair tells a story, and our mission is to help you wear yours with pride. With a gentle touch and an eye for detail, we transform everyday looks into timeless styles that reflect your personality and elevate your confidence.
            </p>
            <div className={styles.section}>
                {motivation.map((motive) => (
                    <div key={motive.id} className={styles["little-section"]}>
                        <div className={styles.icon}>✦</div>
                        <h3 className={styles.cardTitle}>{motive.title}</h3>
                        <p className={styles.cardDesc}>{motive.description}</p>
                        <div className={styles["span-section"]}>
                            <span>{motive.spam1}</span>
                            <span>{motive.spam2}</span>
                            <span>{motive.spam3}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}