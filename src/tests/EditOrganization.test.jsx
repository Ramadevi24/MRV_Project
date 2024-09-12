import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import EditOrganization from './EditOrganization';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('axios');

describe('EditOrganization', () => {
  test('renders form fields', async () => {
    axios.get.mockResolvedValue({ data: { tenantId: 1, name: 'Test Org', description: 'Test Description', establishedDate: '2021-01-01', contactEmail: 'test@example.com', contactPhone: '1234567890', address: 'Test Address', categoryIds: [], latitude: '12.34', longitude: '56.78', locationAddress: 'Test Location Address' } });

    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/edit-organization/1']}>
          <Routes>
            <Route path="/edit-organization/:id" element={<EditOrganization />} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    );

    expect(await screen.findByLabelText(/organization name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/established date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category ids/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/latitude/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/longitude/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location address/i)).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    axios.get.mockResolvedValue({ data: { tenantId: 1, name: 'Test Org', description: 'Test Description', establishedDate: '2021-01-01', contactEmail: 'test@example.com', contactPhone: '1234567890', address: 'Test Address', categoryIds: [], latitude: '12.34', longitude: '56.78', locationAddress: 'Test Location Address' } });
    axios.put.mockResolvedValue({});

    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/edit-organization/1']}>
          <Routes>
            <Route path="/edit-organization/:id" element={<EditOrganization />} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    );

    fireEvent.change(await screen.findByLabelText(/organization name/i), { target: { value: 'Updated Org' } });
    fireEvent.click(screen.getByText(/submit/i));

    expect(axios.put).toHaveBeenCalledWith('/api/organizations/1', expect.any(Object));
  });
});