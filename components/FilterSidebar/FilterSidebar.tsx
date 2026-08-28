'use client';

import { useState } from 'react';
import { FiMapPin, FiX } from 'react-icons/fi';
import {
  CamperFilterParams,
  CamperForm,
  CamperEngine,
  CamperTransmission,
} from '@/types/types';
import styles from './FilterSidebar.module.css';

interface FilterSidebarProps {
  initialFilters: CamperFilterParams;
  onSearch: (filters: CamperFilterParams) => void;
  onClear: () => void;
}

export default function FilterSidebar({
  initialFilters,
  onSearch,
  onClear,
}: FilterSidebarProps) {
  const [location, setLocation] = useState(initialFilters.location || '');
  const [form, setForm] = useState<CamperForm | undefined>(
    initialFilters.form as CamperForm | undefined
  );
  const [engine, setEngine] = useState<CamperEngine | undefined>(
    initialFilters.engine as CamperEngine | undefined
  );
  const [transmission, setTransmission] = useState<
    CamperTransmission | undefined
  >(initialFilters.transmission as CamperTransmission | undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location: location.trim() || undefined,
      form,
      engine,
      transmission,
    });
  };

  const handleClear = () => {
    setLocation('');
    setForm(undefined);
    setEngine(undefined);
    setTransmission(undefined);
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.sidebar}>
      <div className={styles.section}>
        <label className={styles.label}>Location</label>
        <div className={styles.inputWrapper}>
          <FiMapPin className={styles.inputIcon} size={18} />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Kyiv"
            className={styles.input}
          />
        </div>
      </div>

      <h3 className={styles.filterTitle}>Filters</h3>

      <div className={styles.section}>
        <span className={styles.subLabel}>Camper form</span>
        <div className={styles.radioGroup}>
          {[
            { id: 'alcove', label: 'Alcove' },
            { id: 'panel_van', label: 'Panel Van' },
            { id: 'integrated', label: 'Integrated' },
            { id: 'semi_integrated', label: 'Semi Integrated' },
          ].map((item) => (
            <label key={item.id} className={styles.radioOption}>
              <input
                type="radio"
                name="form"
                checked={form === item.id}
                onChange={() => setForm(item.id as CamperForm)}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.subLabel}>Engine</span>
        <div className={styles.radioGroup}>
          {[
            { id: 'diesel', label: 'Diesel' },
            { id: 'petrol', label: 'Petrol' },
            { id: 'hybrid', label: 'Hybrid' },
            { id: 'electric', label: 'Electric' },
          ].map((item) => (
            <label key={item.id} className={styles.radioOption}>
              <input
                type="radio"
                name="engine"
                checked={engine === item.id}
                onChange={() => setEngine(item.id as CamperEngine)}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.subLabel}>Transmission</span>
        <div className={styles.radioGroup}>
          {[
            { id: 'automatic', label: 'Automatic' },
            { id: 'manual', label: 'Manual' },
          ].map((item) => (
            <label key={item.id} className={styles.radioOption}>
              <input
                type="radio"
                name="transmission"
                checked={transmission === item.id}
                onChange={() => setTransmission(item.id as CamperTransmission)}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.searchBtn}>
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className={styles.clearBtn}
        >
          <FiX size={18} />
          <span>Clear filters</span>
        </button>
      </div>
    </form>
  );
}