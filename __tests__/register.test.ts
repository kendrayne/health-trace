import { describe, it, expect, vi } from 'vitest'
import { register } from '@/app/lib/actions/register'
import { prisma } from '@/app/lib/db'

vi.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}))

describe('register action', () => {
  it('creates a new user', async () => {
    ;(prisma.user.findUnique as any).mockResolvedValue(null)
    ;(prisma.user.create as any).mockResolvedValue({
      name: 'user',
      id: 'user_1',
      email: 'new@example.com',
      password: 'password'
    })

    const result = await register('new@example.com')

    expect(result.success).toBe('Account created!')
  })

  it('throws if user already exists', async () => {
    ;(prisma.user.findUnique as any).mockResolvedValue({
      id: 'existing',
      email: 'new@example.com',
    })

    await expect(
      register('new@example.com')
    ).rejects.toThrow('User already exists')
  })
})
