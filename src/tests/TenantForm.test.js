import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TenantForm from './TenantForm';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

jest.mock('axios');

describe('TenantForm', () => {
  test('renders form fields', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <TenantForm />
        <ToastContainer />
      </I18nextProvider>
    );

    expect(screen.getByLabelText(/Tenant Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });

  test('form validation', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <TenantForm />
        <ToastContainer />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText(/Create Tenant/i));

    expect(await screen.findByText(/This field is required/i)).toBeInTheDocument();
  });

  test('successful form submission', async () => {
    axios.post.mockResolvedValue({});
    render(
      <I18nextProvider i18n={i18n}>
        <TenantForm />
        <ToastContainer />
      </I18nextProvider>
    );

    fireEvent.change(screen.getByLabelText(/Tenant Name/i), { target: { value: 'Test Tenant' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByText(/Create Tenant/i));

    expect(await screen.findByText(/Tenant created successfully/i)).toBeInTheDocument();
  });

  test('failed form submission', async () => {
    axios.post.mockRejectedValue({});
    render(
      <I18nextProvider i18n={i18n}>
        <TenantForm />
        <ToastContainer />
      </I18nextProvider>
    );

    fireEvent.change(screen.getByLabelText(/Tenant Name/i), { target: { value: 'Test Tenant' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByText(/Create Tenant/i));

    expect(await screen.findByText(/Error creating tenant/i)).toBeInTheDocument();
  });
});