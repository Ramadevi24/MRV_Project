import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import OrganizationGridPage from '../components/organization/OrganizationGridPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

jest.mock('axios');

describe('OrganizationGridPage', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Org 1',
          tenantName: 'Tenant 1',
          establishedDate: '2021-01-01',
          categories: ['Category 1', 'Category 2']
        }
      ]
    });
  });

  test('renders loading spinner', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Router>
          <OrganizationGridPage />
        </Router>
      </I18nextProvider>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('renders organization data', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Router>
          <OrganizationGridPage />
        </Router>
      </I18nextProvider>
    );
    await waitFor(() => expect(screen.getByText('Org 1')).toBeInTheDocument());
  });

  test('handles delete action', async () => {
    axios.delete.mockResolvedValue({});
    render(
      <I18nextProvider i18n={i18n}>
        <Router>
          <OrganizationGridPage />
        </Router>
      </I18nextProvider>
    );
    await waitFor(() => expect(screen.getByText('Org 1')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    fireEvent.click(screen.getByText(/confirm/i));
    await waitFor(() => expect(screen.queryByText('Org 1')).not.toBeInTheDocument());
  });
});