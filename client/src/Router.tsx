import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import SavedImages from "./pages/SavedImages";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            { path: '/', element: <Home />, index: true },
            { path: '/saved', element: <SavedImages />}
        ]}
])