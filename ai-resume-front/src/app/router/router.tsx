import { createBrowserRouter, Outlet } from "react-router";
import {App} from "../ui/App/App";
import { MainPage } from "../../pages/MainPage";
import { useEffect } from "react";

function RootElement() {
  useEffect(() => {
    document.title = 'Ai Resume';
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null
    if (link) {
      link.href = '/CodeEditor.svg'
    }
  },[])
  return (
    <App>
      <Outlet />
    </App>
  );
}

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <RootElement />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
    ]
  },
]);

export {
  routerConfig
}
