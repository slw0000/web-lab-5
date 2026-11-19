import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware(async (to) => {
    if (import.meta.server && useError().value) {
        return;
    }
    const userStore = useUserStore();
    const { $restoreSession } = useNuxtApp();

    await $restoreSession();

    if (!userStore.isAuthenticated) {
        return navigateTo('/login', { replace: true });
    }

    if (to.meta.adminOnly && !userStore.isAdmin) {
        return navigateTo('/students', { replace: true });
    }
});
