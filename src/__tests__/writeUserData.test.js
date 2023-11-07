import { expect, test } from 'vitest';
import { writeUserData } from '@/utils/firestore';
import { generateUniqueId } from '@/utils/uid';
import { nanoid } from 'nanoid';

const testUser = {
    userId: generateUniqueId(),
    firstname: 'John',
    middlename: 'Dough',
    lastname: 'Doe',
    gender: 'Male',
    birthday: { startDate: '2002-06-15' },
    isVolunteer: false,
    email: 'test@example.com',
    interests: ['Programming', 'Travel'],
};

test('writeUserData', async () => {
    
    const result = await writeUserData(nanoid(), testUser);
    expect(result).toBe(true)
})
