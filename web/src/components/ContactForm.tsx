import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Check, Send } from 'lucide-react';

const endpoint = 'https://formspree.io/f/mzedlggg';

export default function ContactForm() {
  const [draft, setDraft] = useState(() => {
    try {
      return localStorage.getItem('portfolio-draft') || '';
    } catch {
      return '';
    }
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const inFlight = useRef(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = draft.trim();
    if (!name || !message) {
      setError('Please enter your name and a message.');
      setStatus('error');
      return;
    }
    inFlight.current = true;
    setStatus('sending');
    setError('');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) {
        setError(
          response.status === 429
            ? 'The contact service is at its sending limit. Please try again later. Your draft is kept.'
            : 'The contact service could not accept your message. Please try again later. Your draft is kept.',
        );
        setStatus('error');
        return;
      }
      setDraft('');
      form.reset();
      try {
        localStorage.removeItem('portfolio-draft');
      } catch {}
      setStatus('success');
    } catch {
      setError(
        'Could not confirm submission. Your draft is kept. Check your connection before trying again.',
      );
      setStatus('error');
    } finally {
      inFlight.current = false;
    }
  };

  return (
    <form
      className="game-contact-draft"
      aria-label="Contact Kashmitha"
      action={endpoint}
      method="POST"
      onSubmit={submit}
      onChange={() => {
        if (!inFlight.current) setStatus('idle');
      }}
    >
      <div className="game-draft-top">
        <span>COMPOSE_MESSAGE.txt</span>
        <span>EMAIL CONTACT</span>
      </div>
      <div className="game-draft-body">
        <h3>Start the conversation.</h3>
        <p>Have a project in mind? Send me a message and an email address I can reply to.</p>
        <fieldset disabled={status === 'sending'}>
          <legend className="ftp-sr">Your contact details and message</legend>
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" autoComplete="name" required maxLength={100} />
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Hi Kashmitha, I’d like to talk about…"
            required
            maxLength={5000}
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              try {
                localStorage.setItem('portfolio-draft', event.target.value);
              } catch {}
            }}
            aria-describedby="contact-privacy contact-status"
          />
          <div className="game-draft-actions">
            <button type="submit">
              {status === 'success' ? <Check size={16} /> : <Send size={16} />}
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </div>
        </fieldset>
        <small id="contact-privacy">
          Your message draft stays on this device until sent. Sending shares your name, email and
          message with Formspree to forward to my inbox.
        </small>
        <small id="contact-status" role="status" aria-live="polite" aria-atomic="true">
          {status === 'success'
            ? 'Thank you! Your message was submitted successfully.'
            : status === 'sending'
              ? 'Sending your message…'
              : status === 'error'
                ? error
                : 'Ready when you are.'}
        </small>
      </div>
    </form>
  );
}
