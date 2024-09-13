import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditTenant from './EditTenant';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { MemoryRouter, Route } from 'react-router-dom';

jest.mock('axios');

const tenant = {
  tenantID: 1,
  name: 'Test Tenant',
  description: 'Test Description',
};

describe('EditTenant', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: tenant });
  });

  test('renders form fields with existing data', async () => {
    render(
      <MemoryRouter initialEntries={['/edit-tenant/1']}>
        <Route path="/edit-tenant/:id">
          <I18nextProvider i18n={i18n}>
            <EditTenant />
            <ToastContainer />
          </I18nextProvider>
        </Route>
      </MemoryRouter>
    );

    expect(await screen.findByDisplayValue('Test Tenant')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
  });

  test('form validation', async () => {
    render(
      <MemoryRouter initialEntries={['/edit-tenant/1']}>
        <Route path="/edit-tenant/:id">
          <I18nextProvider i18n={i18n}>
            <EditTenant />
            <ToastContainer />
          </I18nextProvider>
        </Route>
      </MemoryRouter>
    );

    fireEvent.change(await screen.findByDisplayValue('Test Tenant'), { target: { value: '' } });
    fireEvent.click(screen.getByText(/Update Tenant/i));

    expect(await screen.findByText(/This field is required/i)).toBeInTheDocument();
  });

  test('successful form submission', async () => {
    axios.put.mockResolvedValue({});
    render(
      <MemoryRouter initialEntries={['/edit-tenant/1']}>
        <Route path="/edit-tenant/:id">
          <I18nextProvider i18n={i18n}>
            <EditTenant />
            <ToastContainer />
          </I18nextProvider>
        </Route>
      </MemoryRouter>
    );

    fireEvent.change(await screen.findByDisplayValue('Test Tenant'), { target: { value: 'Updated Tenant' } });
    fireEvent.click(screen.getByText(/Update Tenant/i));

    expect(await screen.findByText(/Tenant updated successfully/i)).toBeInTheDocument();
  });

  test('failed form submission', async () => {
    axios.put.mockRejectedValue({});
    render(
      <MemoryRouter initialEntries={['/edit-tenant/1']}>
        <Route path="/edit-tenant/:id">
          <I18nextProvider i18n={i18n}>
            <EditTenant />
            <ToastContainer />
          </I18nextProvider>
        </Route>
      </MemoryRouter>
    );

    fireEvent.change(await screen.findByDisplayValue('Test Tenant'), { target: { value: 'Updated Tenant' } });
    fireEvent.click(screen.getByText(/Update Tenant/i));

    expect(await screen.findByText(/Error updating tenant/i)).toBeInTheDocument();
  });
});