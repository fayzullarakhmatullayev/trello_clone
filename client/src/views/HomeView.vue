<template>
  <div class="mx-auto my-6 grid grid-cols-2 gap-6 container">
    <Table class="max-w-[400px] w-full">
      <draggable :list="names" item-key="name" :tag="'tbody'">
        <template #item="{ element }">
          <TableRow class="w-full block">
            <TableCell class="font-medium">{{ element.id }}</TableCell>
            <TableCell class="font-medium">{{ element.name }}</TableCell>
          </TableRow>
        </template>
      </draggable>
    </Table>
    <pre>{{ names }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import draggable from 'vuedraggable'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

const names = ref([
  {
    name: 'John',
    id: 0
  },
  {
    name: 'Joao',
    id: 1
  },
  {
    name: 'Jean',
    id: 2
  }
])
</script>
