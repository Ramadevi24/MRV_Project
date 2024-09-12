import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import ViewOrganization from './ViewOrganization';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('axios');

describe('ViewOrganization', () => {
  test('renders organization details', async () => {
    axios.get.mockResolvedValue({ data: { name: 'Test Org', description: 'Test Description', establishedDate: '2021-01-01', contactEmail: 'test@example.com', contactPhone: '1234567890', address: 'Test Address', categoryIds: ['Cat1', 'Cat2'], latitude: '12.34', longitude: '56.78', locationAddress: 'Test Location Address' } });

    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/view-organization/1']}>
          <Routes>
            <Route path="/view-organization/:id" element={<ViewOrganization />} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    );

    expect(await screen.findByText('Test Org')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('2021-01-01')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('Test Address')).toBeInTheDocument();
    expect(screen.getByText('Cat1, Cat2')).toBeInTheDocument();
    expect(screen.getByText('12.34')).toBeInTheDocument();
    expect(screen.getByText('56.78')).toBeInTheDocument();
    expect(screen.getByText('Test Location Address')).toBeInTheDocument();
  });

  test('handles API error', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching data'));

    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/view-organization/1']}>
          <Routes>
            <Route path="/view-organization/:id" element={<ViewOrganization />} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    );

    expect(await screen.findByText('Error fetching data')).toBeInTheDocument();
  });
});