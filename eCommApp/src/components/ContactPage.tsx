import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

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

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <div className="contact-card">
                    <h2>Contact Us</h2>
                    <p>We would love to hear from you. Share your questions, feedback, or issues below.</p>
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
