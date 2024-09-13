import { render, screen, fireEvent } from '@testing-library/react';
import RoleGrid from './RoleGrid';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

jest.mock('axios');

describe('RoleGrid', () => {
  test('renders loading spinner', () => {
    render(<RoleGrid />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('fetches and displays roles', async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1, roleName: 'Admin', description: 'Admin role', createdDate: '2021-01-01' }] });
    render(<RoleGrid />);
    expect(await screen.findByText('Admin')).toBeInTheDocument();
  });

  test('handles delete role', async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1, roleName: 'Admin', description: 'Admin role', createdDate: '2021-01-01' }] });
    axios.delete.mockResolvedValue({});
    render(<RoleGrid />);
    fireEvent.click(await screen.findByText('Admin'));
    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByText('Confirm'));
    expect(await screen.findByText('Role deleted successfully')).toBeInTheDocument();
  });
});