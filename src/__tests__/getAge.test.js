import { expect, test } from 'vitest'
import { getAge } from '@/utils/getAge'

test('getAge', async () => {
    expect( await getAge('2002-04-18')).toBe(21)
})
