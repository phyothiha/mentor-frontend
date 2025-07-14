<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
        <Input id="username" type="text" required />
      </div>
      <div class="grid gap-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" required />
      </div>
    </CardContent>
    <CardFooter>
      <Button class="w-full">
        Sign in
      </Button>
    </CardFooter>
  </Card>
</template>
