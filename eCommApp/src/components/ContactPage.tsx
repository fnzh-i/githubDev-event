import { FormEvent } from 'react';
import Header from './Header';
import Footer from './Footer';

const ContactPage = () => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="contact-name">Name</label>
                        <input id="contact-name" name="name" type="text" />
                    </div>
                    <div>
                        <label htmlFor="contact-email">Email Address</label>
                        <input id="contact-email" name="email" type="email" />
                    </div>
                    <div>
                        <label htmlFor="contact-issue">Issue</label>
                        <textarea id="contact-issue" name="issue" rows={4} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;
