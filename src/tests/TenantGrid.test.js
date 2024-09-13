import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TenantGrid from './TenantGrid';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

jest.mock('axios');

const tenants = [
  { id: 1, name: 'Tenant 1', description: 'Description 1', createdDate: '2021-01-01' },
  { id: 2, name: 'Tenant 2', description: 'Description 2', createdDate: '2021-02-01' },
];

describe('TenantGrid', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: tenants });
  });

  test('renders tenants', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <TenantGrid />
        <ToastContainer />
      </I18nextProvider>
    );

    expect(await screen.findByText('Tenant 1')).toBeInTheDocument();
    expect(screen.getByText('Tenant 2')).toBeInTheDocument();
  });

  test('search functionality', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <TenantGrid />
        <ToastContainer />
      </I18nextProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'Tenant 1' } });
    expect(await screen.findByText('Tenant 1')).toBeInTheDocument();
    expect(screen.queryByText('Tenant 2')).not.toBeInTheDocument();
  });

  test('delete tenant', async () => {
    axios.delete.mockResolvedValue({});
    render(
      <I18nextProvider i18n={i18n}>
        <TenantGrid />
        <ToastContainer />
      </I18nextProvider>
    );

    fireEvent.click(await screen.findByText('Tenant 1').closest('tr').querySelector('.delete-btn'));
    fireEvent.click(screen.getByText('OK'));

    expect(await screen.findByText('Tenant deleted successfully')).toBeInTheDocument();
    expect(screen.queryByText('Tenant 1')).not.toBeInTheDocument();
  });
});