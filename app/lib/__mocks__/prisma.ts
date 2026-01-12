import { PrismaClient } from '@prisma/client'
import { beforeEach, vi } from 'vitest'
import { mockDeep, mockReset, DeepMockProxy } from 'vitest-mock-extended'

export const prismaMock = mockDeep<PrismaClient>()

vi.mock('../prisma', () => ({
  __esModule: true,
  default: prismaMock,
}))

beforeEach(() => {
  mockReset(prismaMock)
})