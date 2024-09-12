import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import OrganizationGrid from './OrganizationGrid';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

jest.mock('axios');

describe('OrganizationGrid', () => {
  test('renders loading spinner', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <OrganizationGrid />
      </I18nextProvider>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('fetches and displays organizations', async () => {
    const organizations = [
      { id: 1, name: 'Org1', tenantName: 'Tenant1', establishedDate: '2021-01-01', categories: ['Cat1', 'Cat2'] },
      { id: 2, name: 'Org2', tenantName: 'Tenant2', establishedDate: '2021-02-01', categories: ['Cat3'] },
    ];
    axios.get.mockResolvedValue({ data: organizations });

    render(
      <I18nextProvider i18n={i18n}>
        <OrganizationGrid />
      </I18nextProvider>
    );

    expect(await screen.findByText('Org1')).toBeInTheDocument();
    expect(screen.getByText('Org2')).toBeInTheDocument();
  });

  test('handles delete organization', async () => {
    const organizations = [
      { id: 1, name: 'Org1', tenantName: 'Tenant1', establishedDate: '2021-01-01', categories: ['Cat1', 'Cat2'] },
    ];
    axios.get.mockResolvedValue({ data: organizations });
    axios.delete.mockResolvedValue({});

    render(
      <I18nextProvider i18n={i18n}>
        <OrganizationGrid />
      </I18nextProvider>
    );

    fireEvent.click(await screen.findByRole('button', { name: /trash/i }));
    expect(axios.delete).toHaveBeenCalledWith('/api/organizations/1');
  });
});