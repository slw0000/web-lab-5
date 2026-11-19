<script setup lang="ts">
import { useUserStore } from '~/stores/user';

definePageMeta({
    middleware: ['auth'],
});

const userStore = useUserStore();
</script>

<template>
    <section>
        <h1>Мой профиль</h1>

        <div v-if="userStore.user" class="student-card">
            <dl>
                <div class="info-row">
                    <dt>Имя пользователя</dt>
                    <dd>{{ userStore.user.username }}</dd>
                </div>

                <div class="info-row">
                    <dt>Email</dt>
                    <dd>{{ userStore.user.email }}</dd>
                </div>

                <div class="info-row">
                    <dt>Роль</dt>
                    <dd>
                        {{ userStore.user.role === 'ADMIN' ? 'Администратор' : 'Пользователь' }}
                    </dd>
                </div>
            </dl>
        </div>

        <div class="buttons-container">
            <NuxtLink to="/students" class="buttons"> К списку студентов </NuxtLink>
        </div>
    </section>
</template>

<style scoped>
dd {
    overflow-wrap: anywhere;
}
</style>
