'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function setTheme(theme: string) {
  (await cookies()).set('theme', theme)
  revalidatePath('/')
}