import ProfileCard from '../components/ProfileCard';

const About = () => (
  <section className="max-w-3xl mx-auto">
    <h1 className="text-3xl font-mono text-green-400 mb-6">
      About Me
    </h1>

    <ProfileCard />

    <p className="text-gray-300 mt-6">
      I focus on Blue Team operations, IDS/IPS,
      and building real-world security labs.
    </p>
  </section>
);

export default About;