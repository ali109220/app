"use client";

import { useState } from "react";

export function useAccessibleFormValidation() {
  const [errors, setErrors] = useState({});

  const onInvalid = (event) => {
    event.preventDefault();
    const field = event.target;
    if (!field?.name) return;
    setErrors((current) => ({ ...current, [field.name]: field.validationMessage || "Please check this field." }));
  };

  const onInput = (event) => {
    const field = event.target;
    if (!field?.name) return;
    if (field.checkValidity()) {
      setErrors((current) => {
        if (!current[field.name]) return current;
        const next = { ...current };
        delete next[field.name];
        return next;
      });
    }
  };

  const validate = (form) => {
    if (form.checkValidity()) return true;
    const invalid = [...form.elements].filter((field) => field?.name && typeof field.checkValidity === "function" && !field.checkValidity());
    const next = {};
    invalid.forEach((field) => { next[field.name] = field.validationMessage || "Please check this field."; });
    setErrors(next);
    requestAnimationFrame(() => invalid[0]?.focus());
    return false;
  };

  const clearErrors = () => setErrors({});
  return { errors, onInvalid, onInput, validate, clearErrors };
}

export function FieldError({ id, message }) {
  if (!message) return null;
  return <p id={id} className="mt-1.5 text-xs leading-relaxed text-red-700" role="alert">{message}</p>;
}

export function FormErrorSummary({ errors }) {
  const count = Object.keys(errors).length;
  if (!count) return null;
  return (
    <div role="alert" className="rounded-md border border-red-700/40 bg-red-700/5 px-4 py-3 text-sm text-red-800 sm:col-span-2">
      Please correct {count === 1 ? "the highlighted field" : `the ${count} highlighted fields`} and try again.
    </div>
  );
}
