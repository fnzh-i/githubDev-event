import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const inspirationRepositories = [
    { name: 'saleor/storefront', url: 'https://github.com/saleor/storefront' },
    { name: 'basir/react-shopping-cart', url: 'https://github.com/basir/react-shopping-cart' },
    { name: 'Cezerin2/Server', url: 'https://github.com/Cezerin2/Server' },
    { name: 'slowfound/next-prisma-tailwind-ecommerce', url: 'https://github.com/slowfound/next-prisma-tailwind-ecommerce' },
    { name: 'jp-quintana/react-shopping-cart', url: 'https://github.com/jp-quintana/react-shopping-cart' }
];

const issueIdeas = [
    'Add product filtering/sorting (price, category, rating) to speed up discovery.',
    'Add richer product reviews with star ratings, media uploads, and helpful votes.',
    'Add persistent cart features like save-for-later and undo remove.',
    'Add personalized recommendations (related products and frequently bought together).',
    'Improve checkout trust with delivery estimates, payment badges, and order tracking updates.'
];

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [issue, setIssue] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
        setName('');
        setEmail('');
        setIssue('');
    };

    const handleUseIssueIdeas = () => {
        const issueTemplate = issueIdeas.map((idea, index) => `${index + 1}. ${idea}`).join('\n');
        setIssue(`Website improvement inspiration:\n${issueTemplate}`);
        setSubmitted(false);
    };

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <div className="contact-card">
                    <h2>Contact Us</h2>
                    <p>We would love to hear from you. Share your questions, feedback, or issues below.</p>
                    <section className="issue-inspiration">
                        <h3>Issue inspiration from similar GitHub projects</h3>
                        <p>Repositories with similar shopping/cart functionality:</p>
                        <ul>
                            {inspirationRepositories.map((repo) => (
                                <li key={repo.name}>
                                    <a href={repo.url} target="_blank" rel="noreferrer">
                                        {repo.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <p>Top 5 website improvement ideas:</p>
                        <ol>
                            {issueIdeas.map((idea) => (
                                <li key={idea}>{idea}</li>
                            ))}
                        </ol>
                        <button type="button" className="contact-submit inspiration-button" onClick={handleUseIssueIdeas}>
                            Use these ideas in my issue
                        </button>
                    </section>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label htmlFor="contact-name">Name</label>
                        <input
                            id="contact-name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <label htmlFor="contact-email">Email address</label>
                        <input
                            id="contact-email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="contact-issue">Issue</label>
                        <textarea
                            id="contact-issue"
                            name="issue"
                            placeholder="Tell us about the issue"
                            value={issue}
                            onChange={(e) => setIssue(e.target.value)}
                            rows={4}
                            required
                        />

                        <button type="submit" className="contact-submit">
                            Submit
                        </button>

                        {submitted && (
                            <p className="contact-success">
                                Thanks for reaching out! We will get back to you soon.
                            </p>
                        )}
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;
