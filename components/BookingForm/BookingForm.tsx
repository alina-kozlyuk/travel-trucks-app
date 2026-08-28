'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { sendBookingRequest } from '@/lib/api/clientApi';
import styles from './BookingForm.module.css';

interface BookingFormProps {
  camperId: string;
}

export default function BookingForm({ camperId }: BookingFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (!/^[a-zA-Zа-яА-ЯіІїЇєЄ\s]+$/.test(name)) {
      newErrors.name = 'Please enter a valid name.';
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await sendBookingRequest(camperId, {
        name: name.trim(),
        email: email.trim(),
      });
      
      toast.success(response.message || 'Booking request sent successfully!');
      
      setName('');
      setEmail('');
      setErrors({});
    } catch {
      toast.error('Failed to send booking request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>Stay connected! We are always ready to help you.</p>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.fieldGroup}>
          <div className={`${styles.inputWrapper} ${errors.name ? styles.inputError : ''}`}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name*"
              aria-label="Name"
              className={styles.input}
            />
            {errors.name && <span className={styles.errorIcon}>!</span>}
          </div>
          {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
        </div>

        <div className={styles.fieldGroup}>
          <div className={`${styles.inputWrapper} ${errors.email ? styles.inputError : ''}`}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email*"
              aria-label="Email"
              className={styles.input}
            />
            {errors.email && <span className={styles.errorIcon}>!</span>}
          </div>
          {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}