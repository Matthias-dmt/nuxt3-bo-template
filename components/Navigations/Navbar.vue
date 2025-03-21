<script setup lang="ts">
import { ref, Transition } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/vue/24/outline'

const isOpen = ref(false)

interface NavLink {
  name: string
  href: string
}

const navigation: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' }
]
</script>

<template>
  <Disclosure as="nav" class="bg-white shadow-md w-full fixed z-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink to="/" class="text-xl font-bold text-green-600 hover:text-green-700 transition">MyLogo</NuxtLink>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex md:items-center md:space-x-6">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-gray-600 hover:text-green-600 transition font-medium"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- Profile Menu -->
        <div class="flex items-center">
          <Menu as="div" class="relative">
            <MenuButton class="inline-flex items-center text-gray-700 hover:text-green-600 transition focus:outline-none">
              <UserCircleIcon class="w-7 h-7" />
            </MenuButton>
            <Transition
              enter="transition ease-out duration-100"
              enter-from="transform opacity-0 scale-95"
              enter-to="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leave-from="transform opacity-100 scale-100"
              leave-to="transform opacity-0 scale-95"
            >
              <MenuItems class="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <MenuItem v-slot="{ active }">
                  <NuxtLink to="/login" class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">login</NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <NuxtLink to="/logout" class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">logout</NuxtLink>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>

        <!-- Mobile menu button -->
        <div class="-mr-2 flex md:hidden items-center">
          <DisclosureButton class="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 transition focus:outline-none">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="block h-6 w-6" v-if="!isOpen" aria-hidden="true" />
            <XMarkIcon class="block h-6 w-6" v-else aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 px-4 pt-2 pb-3">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600 transition"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>
/* Optional: smooth mobile menu toggle */
</style>