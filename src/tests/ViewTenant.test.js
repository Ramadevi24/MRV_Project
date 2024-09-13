import React from 'react';
import { render, screen } from '@testing-library/react';
import ViewTenant from './ViewTenant';
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
  createdDate: '2021-01-01',
};

describe('ViewTenant', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: tenant });
  });

  test('renders tenant details', async () => {
    render(
      <MemoryRouter initialEntries={['/view-tenant/1']}>
        <Route path="/view-tenant/:id">
          <I18nextProvider i18n={i18n}>
            <ViewTenant />
            <ToastContainer />
          </I18nextProvider>
        </Route>
      </MemoryRouter>
    );

    expect(await screen.findByText('Test Tenant')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('2021-01-01')).toBeInTheDocument();
  });

  test('handles API error', async () => {
    axios.get.mockRejectedValue({});
    render(
      <MemoryRouter initialEntries={['/view-tenant/1']}>
        <Route path="/view-tenant/:id">
          <I18nextProvider i18n={i18n}>
            <ViewTenant />
            <ToastContainer />
          </I18nextProvider>
        </Route>
      </MemoryRouter>
    );

    expect(await screen.findByText(/Error fetching tenant details/i)).toBeInTheDocument();
  });
});