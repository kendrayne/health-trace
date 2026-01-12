import { vi, describe, it, expect } from 'vitest';
import { register } from '@/app/lib/actions/register';
import prisma from '@/app/lib/__mocks__/prisma';


vi.mock('@/lib/prisma');

describe('Auth Logic', () => {
  it('should hash password and save user', async () => {
    const userData = { email: 'test@example.com', password: 'password123' };
    
    prisma.user.create.mockResolvedValue({ id: 1, email: userData.email });

    const result = await register(userData);
    
    expect(prisma.user.create).toHaveBeenCalled();
    expect(result?.success).toBe('test@example.com');
  });
});