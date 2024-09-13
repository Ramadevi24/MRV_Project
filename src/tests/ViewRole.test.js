import { render, screen } from '@testing-library/react';
import ViewRole from './ViewRole';
import axios from 'axios';

jest.mock('axios');

describe('ViewRole', () => {
  test('renders loading spinner', () => {
    render(<ViewRole />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('fetches and displays role details', async () => {
    axios.get.mockResolvedValue({ data: { id: 1, roleName: 'Admin', description: 'Admin role', permissions: ['read', 'write'], createdDate: '2021-01-01' } });
    render(<ViewRole />);
    expect(await screen.findByText('Admin')).toBeInTheDocument();
  });

  test('handles API error', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching role'));
    render(<ViewRole />);
    expect(await screen.findByText('Error fetching role')).toBeInTheDocument();
  });
});