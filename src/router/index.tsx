import React, { Children, useCallback, useEffect, useState } from "react";
import {
  HashRouter,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {
  changeWorkSpaceAction,
  openNavbarAction,
} from "@/redux/actions/ScreenAction";
import { addCardListAction } from "@/redux/actions/CardAction";
import { getOrganizationsAction } from "@/redux/actions/OrganizationAction";
import Login from "@/pages/Login";
import {
  signInAction,
  loginAction,
  loginGoogleJwtAction,
  loginJwtAction,
} from "@/redux/actions/AuthAction";
import Home from "@/pages/Home";
import ErrorPage from "@/pages/ErrorPage";
import { Layout } from "antd";
import { Header } from "@/components/User/Header";
import { Navbar } from "@/components/User/Navbar";
import WorkSpace from "@/pages/WorkSpace";
import Billboard from "@/pages/Billboard";
import NewWorkSpace from "@/pages/WorkSpace/NewWorkSpace";
import { MainLayoutCss } from "@/pages/Billboard/style";
import SpinPage from "@/pages/SpinPage";

const AppRouter: React.FC<any> = (props) => {
  const {
    openNav,
    showNavbar,
    card,
    login,
    loginAction,
    loginGoogle,
    loginJwt,
    signInAction,
    showWorkSpace,
    changeWorkSpace,
    organization,
    getOrganization,
  } = props;
  const [load, setLoad] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      (async () => {
        await loginJwt();
        await getOrganization();
        setLoad(false);
      })();
    } else {
      setLoad(false);
    }
  }, [localStorage.getItem("token"), login]);

  const LoginLayout = React.memo(({ children }: any) => (
    <Layout>
      <Navbar
        showNavbar={showNavbar}
        openNav={openNav}
        workSpace={showWorkSpace}
        setWrokSpace={changeWorkSpace}
        getOrganization={getOrganization}
      />
      <Layout>
        <Header workSpace={showWorkSpace} />
        <MainLayoutCss workspace={showWorkSpace.toString()}>
          {children}
        </MainLayoutCss>
      </Layout>
    </Layout>
  ));

  return (
    <BrowserRouter>
      <Routes>
        {load && <Route path="*" element={<SpinPage />} />}
        {!load && (
          <>
            {!login && <Route path="/" element={<Home />}></Route>}
            <Route
              path="/login"
              element={
                <Login
                  signInAction={signInAction}
                  loginAction={loginAction}
                  loginGoogle={loginGoogle}
                  login={login}
                  signIn={false}
                  getOrganization={getOrganization}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Login
                  signInAction={signInAction}
                  loginAction={loginAction}
                  loginGoogle={loginGoogle}
                  login={login}
                  signIn={true}
                  getOrganization={getOrganization}
                />
              }
            />
            <Route path="*" element={<ErrorPage />} />
            {login && (
              <>
                {console.log("in route")}

                {organization?.length ? (
                  <Route
                    path={"/"}
                    element={
                      <Navigate to={`/workspace/${organization[0]._id}/home`} />
                    }
                  />
                ) : (
                  <Route
                    path={"/"}
                    element={<Navigate to={"/workspace/new"} />}
                  />
                )}
                <Route
                  path={"/workspace/new"}
                  element={<NewWorkSpace getOrganization={getOrganization} />}
                />
                <Route
                  index
                  path={`/workspace/:workSpaceId/home`}
                  element={
                    <LoginLayout
                      children={<WorkSpace setWrokSpace={changeWorkSpace} />}
                    />
                  }
                />
                <Route
                  path="/board/:boardId"
                  element={
                    <LoginLayout
                      children={
                        <Billboard
                          data={card}
                          // showNavbar={showNavbar}
                          workSpace={showWorkSpace}
                          setWrokSpace={changeWorkSpace}
                        />
                      }
                    />
                  }
                />
              </>
            )}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
const mapStateToProps = (state: any) => ({
  showNavbar: state.screen.showNavbar,
  showWorkSpace: state.screen.showWorkSpace,
  card: state.card.cardList,
  login: state.auth.login,
  organization: state.user.organization,
});
export default connect(mapStateToProps, {
  openNav: openNavbarAction,
  changeWorkSpace: changeWorkSpaceAction,
  addCardList: addCardListAction,
  signInAction,
  loginAction,
  loginGoogle: loginGoogleJwtAction,
  loginJwt: loginJwtAction,
  getOrganization: getOrganizationsAction,
})(React.memo(AppRouter));