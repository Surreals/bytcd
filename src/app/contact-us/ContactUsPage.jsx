'use client';

import React, { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { initializeApp } from 'firebase/app';
import Link from 'next/link';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let _app, _fns, _fn;
const getSubmitFn = () => {
  if (!_fn) {
    _app = initializeApp(firebaseConfig, 'contact');
    _fns = getFunctions(_app);
    _fn = httpsCallable(_fns, 'submitContactForm');
  }
  return _fn;
};

const field = {
  width: '100%', padding: '12px 14px', border: '1px solid var(--line)',
  background: 'var(--paper)', color: 'var(--ink)', fontFamily: 'var(--mono)',
  fontSize: 13, outline: 'none', resize: 'none', display: 'block',
};

const ContactUsPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true); setErr('');
    try {
      await getSubmitFn()(form);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setErr(error.message || 'Failed to send. Try bytcdco@gmail.com directly.');
    } finally { setSending(false); }
  };

  return (
    <>
      {/* hero */}
      <header className="hero" style={{ minHeight: '40vh', paddingTop: 120 }}>
        <div className="meta-row" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
          <div><b>PAGE</b>contact</div>
          <div><b>RESPONSE</b>within 24h</div>
          <div><b>LOCATION</b>Uzhhorod, Ukraine</div>
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(54px,10vw,160px)' }}>
          let's <em>talk</em>.
        </h1>
      </header>

      {/* info + form grid */}
      <div className="bk-grid">
        {/* email */}
        <div className="blk span-4" style={{ minHeight: 200 }}>
          <div className="blk-hd"><span className="num">[01]</span><span>email</span></div>
          <p className="blk-ti" style={{ fontSize: 14, fontWeight: 400, marginTop: 'auto' }}>
            <a href="mailto:bytcdco@gmail.com" style={{ borderBottom: '1px solid currentColor' }}>
              bytcdco@gmail.com
            </a>
          </p>
          <p className="blk-tag">we reply within a day</p>
        </div>

        {/* phone */}
        <div className="blk span-4" style={{ minHeight: 200 }}>
          <div className="blk-hd"><span className="num">[02]</span><span>phone</span></div>
          <p className="blk-ti" style={{ fontSize: 14, fontWeight: 400, marginTop: 'auto' }}>
            <a href="tel:+380508489815" style={{ borderBottom: '1px solid currentColor' }}>
              +380 50 848 98 15
            </a>
          </p>
          <p className="blk-tag">Mon – Fri · 10:00 – 19:00 EET</p>
        </div>

        {/* location */}
        <div className="blk span-4" style={{ minHeight: 200 }}>
          <div className="blk-hd"><span className="num">[03]</span><span>location</span></div>
          <p className="blk-ti" style={{ fontSize: 14, fontWeight: 400, marginTop: 'auto' }}>
            Uzhhorod, Ukraine
          </p>
          <p className="blk-tag">remote-first · work globally</p>
        </div>

        {/* form */}
        <div className="blk span-8" style={{ minHeight: 480 }}>
          <div className="blk-hd"><span className="num">[04]</span><span>start a project</span></div>
          <h2 className="blk-ti" style={{ fontSize: 28, marginBottom: 24 }}>
            Tell us about your project.
          </h2>

          {sent ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-.02em' }}>
                Message sent ✦
              </p>
              <p style={{ fontSize: 13, color: 'var(--mute)', marginTop: 8 }}>
                We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSent(false)}
                style={{ marginTop: 24, width: 'fit-content', background: 'none', border: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: 11, padding: '6px 14px', cursor: 'pointer', color: 'var(--ink)', letterSpacing: '.06em', textTransform: 'uppercase' }}
              >
                send another →
              </button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--mute)', display: 'block', marginBottom: 6 }}>Name *</label>
                  <input name="name" type="text" required value={form.name} onChange={set} disabled={sending} style={field} placeholder="your name" />
                </div>
                <div>
                  <label style={{ fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--mute)', display: 'block', marginBottom: 6 }}>Email *</label>
                  <input name="email" type="email" required value={form.email} onChange={set} disabled={sending} style={field} placeholder="your@email.com" />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--mute)', display: 'block', marginBottom: 6 }}>Message *</label>
                <textarea name="message" required rows={8} value={form.message} onChange={set} disabled={sending} style={{ ...field, height: '100%', minHeight: 160 }} placeholder="tell us about the project..." />
              </div>
              {err && <p style={{ fontSize: 12, color: 'var(--accent)', margin: 0 }}>{err}</p>}
              <button
                type="submit"
                disabled={sending}
                style={{ alignSelf: 'flex-start', fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', padding: '12px 24px', background: 'var(--ink)', color: 'var(--paper)', border: '1px solid var(--ink)', cursor: sending ? 'wait' : 'pointer', opacity: sending ? 0.5 : 1 }}
              >
                {sending ? 'sending...' : 'send message →'}
              </button>
            </form>
          )}
        </div>

        {/* cta side */}
        <div className="blk span-4" style={{ minHeight: 480, background: 'var(--ink)', color: 'var(--paper)', justifyContent: 'space-between' }}>
          <div className="blk-hd" style={{ color: 'rgba(246,245,241,.4)' }}><span className="num" style={{ color: 'var(--paper)' }}>[05]</span><span>quick links</span></div>
          <div>
            <p style={{ fontSize: 13, color: 'rgba(246,245,241,.55)', lineHeight: 1.6, marginBottom: 32 }}>
              Not ready to write? Browse our work first or check out our process.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 32 }}>
              {[['→ view selected work', '/#work'], ['→ our services', '/#services'], ['→ how we work', '/#process'], ['→ about the team', '/#about']].map(([label, href]) => (
                <Link key={href} href={href} style={{ fontSize: 13, padding: '10px 0', borderBottom: '1px solid rgba(246,245,241,.12)', color: 'var(--paper)', display: 'block' }}>
                  {label}
                </Link>
              ))}
            </div>
            <p style={{ fontSize: 11, color: 'rgba(246,245,241,.35)', letterSpacing: '.06em', textTransform: 'uppercase' }}>
              BYTCD · est. 2024<br />Uzhhorod, Ukraine
            </p>
          </div>
        </div>
      </div>

      {/* footer links */}
      <div style={{ borderTop: '1px solid var(--line)', padding: '36px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: 'var(--mute)', flexWrap: 'wrap', gap: 14 }}>
        <Link href="/" style={{ fontWeight: 700, color: 'var(--ink)', letterSpacing: '.02em', fontSize: 14 }}>
          BYTCD<span style={{ display: 'inline-block', width: 6, height: 6, background: 'var(--accent)', marginLeft: 5, verticalAlign: 'middle' }} />
        </Link>
        <span>© {new Date().getFullYear()} · bytcdco@gmail.com</span>
      </div>
    </>
  );
};

export default ContactUsPage;
