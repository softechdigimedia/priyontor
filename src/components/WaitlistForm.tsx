import {AlertCircle, ArrowRight, CheckCircle2} from 'lucide-react';
import {FormEvent, RefObject, useEffect, useState} from 'react';

const STORAGE_KEY = 'priyontor_waitlist_email';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface WaitlistFormProps {
  inputRef?: RefObject<HTMLInputElement | null>;
}

export function WaitlistForm({inputRef}: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && EMAIL_PATTERN.test(saved)) {
        setSubmittedEmail(saved);
      }
    } catch {
      // Ignore storage access errors in restricted browsing contexts
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setError('Please enter your email address to join the launch list.');
      return;
    }

    if (!EMAIL_PATTERN.test(trimmed)) {
      setError('Please enter a valid email address (for example, name@domain.com).');
      return;
    }

    setError(null);
    setSubmittedEmail(trimmed);
    setEmail('');

    try {
      window.localStorage.setItem(STORAGE_KEY, trimmed);
    } catch {
      // Ignore storage write errors
    }
  }

  function handleReset() {
    setSubmittedEmail(null);
    setError(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage remove errors
    }
  }

  if (submittedEmail) {
    return (
      <div
        className="border border-[#2C1610]/15 bg-[#F4EAD7]/80 px-5 py-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#7A5525] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-[#2C1610]">
              You are on the early access list
            </p>
            <p className="text-xs text-[#5C4033] mt-0.5">
              We will send your inaugural invitation to{' '}
              <span className="font-medium text-[#2C1610]">{submittedEmail}</span> on December 10, 2026.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="self-start sm:self-center text-xs font-medium text-[#5C4033] hover:text-[#2C1610] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1610]"
        >
          Use another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-lg">
      <label htmlFor="waitlist-email" className="block text-xs font-medium text-[#5C4033] mb-2">
        Receive an invitation when doors open
      </label>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <input
          ref={inputRef}
          id="waitlist-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Enter your email address"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'waitlist-error' : undefined}
          className={`min-h-[44px] flex-1 bg-[#FFFDF8] border px-4 py-2.5 text-sm text-[#2C1610] placeholder:text-[#8E7361] rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A612B] ${
            error ? 'border-[#9B2C2C]' : 'border-[#2C1610]/20 hover:border-[#2C1610]/40'
          }`}
        />
        <button
          type="submit"
          className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#2C1610] hover:bg-[#3F2118] text-[#FAF3E6] text-sm font-medium rounded-sm whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C1610]"
        >
          <span>Notify Me</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
      {error && (
        <div
          id="waitlist-error"
          role="alert"
          className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-[#9B2C2C]"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </form>
  );
}
