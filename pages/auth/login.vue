<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { LoginResponse } from '~/types'

const username = ref('admin')
const password = ref('password')

async function handleLogin() {
  const authStore = useAuthStore()
  
  try {
    const res = await $fetch<LoginResponse>('http://127.0.0.1:8000/api/v1/login', {
      method: 'POST',
      body: {
        name: username.value,
        password: password.value,
      },
    });
    
    authStore.setUser(res.data);
    
    await navigateTo('/dashboard');
  } catch (err) {
    console.error('Login failed:', err);
  }
}
</script>

<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl">
        Login
      </CardTitle>
    </CardHeader>
    
    <CardContent class="grid gap-4">
      <div class="grid gap-2">
        <Label for="username">Username</Label>
        <Input id="username" type="text" required v-model="username" />
      </div>
      <div class="grid gap-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" required v-model="password" />
      </div>
    </CardContent>
    
    <CardFooter>
      <Button class="w-full" @click="handleLogin">
        Sign in
      </Button>
    </CardFooter>
  </Card>
</template>
