<script setup lang="ts">
import { Lazily } from "../../../src";

const action = () =>
  new Promise((res) => setTimeout(() => res({ test: "Hello World" }), 2000));

const observed = () => console.log("observed");

const resolved = (data: any) => console.log("resolved", data);
</script>

<template>
  <div style="padding-top: 800px">
    <Lazily :action="action" @observed="observed" @resolved="resolved">
      <template #pending="{ observed }">
        <div>pending {{ observed }}</div>
      </template>
      <template #default="{ data }">
        <div style="height: 100px; border: 2px solid red">
          data here {{ data }}
        </div>
      </template>
    </Lazily>
  </div>
</template>
