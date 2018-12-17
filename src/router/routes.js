
const Login = () => import('@/views/login/index.vue');
const Welcome = () => import('@/views/welcome/index.vue');
const Register = () => import('@/views/register/index.vue');
const RegisterSuccess = () => import('@/views/register/success.vue');

const UserLayout = () => import('@/views/user/layout.vue');
const UserMessageBox = () => import('@/views/user/children/msg_box.vue');
const UserAppBox = () => import('@/views/user/children/app_box.vue');
const UserMineBox = () => import('@/views/user/children/mine_box.vue');


const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/register/success',
    name: 'register-success',
    component: RegisterSuccess,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/user',
    component: UserLayout,
    meta: {
      requireAuth: true,
    },
    redirect: '/user/msg_box',
    children: [
      {
        path: 'msg_box',
        name: 'msg-box',
        component: UserMessageBox,
      },
      {
        path: 'app_box',
        name: 'app-box',
        component: UserAppBox,
      },
      {
        path: 'mine_box',
        name: 'mine-box',
        component: UserMineBox,
      }
    ]
  }
];

export default routes;