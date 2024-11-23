import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from '../components/AppLayout';
import {Home} from '../pages/Home';
import {Community} from '../pages/Community';
import {Recipe} from '../pages/Recipe';
import {My} from '../pages/MyPage';
import {Search} from '../pages/RecipeSearch';
import {RecipeSearchResult} from '../pages/RecipeSearchResult';
import {RecipeDetails} from '../pages/RecipeDetails';
import {RecipePost} from '../pages/RecipePost';

/*
    < 중첩 라우터 관리 >
    router 객체 선언부
    path 부분의 경로로 들어오면
    element에 있는 페이지로 렌더링
*/
const router = createBrowserRouter( [
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/community',
                element: <Community />
            },
            {
                path: '/recipe',
                element: <Recipe />
            },
            {
                path: '/my',
                element: <My />
            },
            {
                path: '/recipe/search',
                element: <Search />
            },
            {
                path: '/recipe/search/result',
                element: <RecipeSearchResult />
            },
            {
                path: '/recipe/:id',
                element: <RecipeDetails />
            },
            {
                path: '/recipe/post',
                element: <RecipePost />
            }
        ],
    },
]);

// router 객체를 컴포넌트로 제공해주기 위한 provider
// 객체로 만들어둔 라이터 설정을 파라미터로 받아서 적용시킴
export const RootRouter = () => {
    return <RouterProvider router={router} />;
};

export default RootRouter;